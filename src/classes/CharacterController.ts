import { FKeyboard } from '@fibbojs/event'
import RAPIER from '@dimforge/rapier3d'
import * as THREE from 'three'
import type { FControllerOptions, FScene } from '@fibbojs/3d'
import { FController, FShapes } from '@fibbojs/3d'

export interface FCharacterControllerOptions extends FControllerOptions {
  /**
   * The speed of the character.
   */
  speed?: number
}

/**
 * @description Character controller that will be used to move the character.
 * @category Controller
 */
export class CharacterController extends FController {
  /**
   * The inputs that will be used to move the character.
   */
  inputs: {
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
  }

  /**
   * The scene where the character is.
   */
  scene: FScene

  /**
   * The speed of the character.
   */
  speed: number

  /**
   * The y velocity of the character. Used to apply gravity.
   */
  yVelocity: number

  /**
   * The character controller that will be used to move the character.
   */
  characterController: RAPIER.KinematicCharacterController

  constructor(scene: FScene, options: FCharacterControllerOptions) {
    super(options)

    // Define default values
    const DEFAULT_OPTIONS = {
      speed: 1,
    }
    // Apply default options
    options = { ...DEFAULT_OPTIONS, ...options }
    // Validate options
    if (!options.speed)
      throw new Error('FibboError: FCharacter requires speed option')

    // Store options
    this.scene = scene
    this.speed = options.speed

    // Set the default yVelocity
    this.yVelocity = scene.world.gravity.y

    // Map of the movements (will be updated by the keyboard)
    this.inputs = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    }

    // Create a keyboard instance
    const fKeyboard = new FKeyboard(scene)

    // Key down
    fKeyboard.onKeyDown('w', () => {
      this.inputs.forward = true
    })
    fKeyboard.onKeyDown('s', () => {
      this.inputs.backward = true
    })
    fKeyboard.onKeyDown('a', () => {
      this.inputs.left = true
    })
    fKeyboard.onKeyDown('d', () => {
      this.inputs.right = true
    })
    // For AZERTY keyboards
    fKeyboard.onKeyDown('z', () => {
      this.inputs.forward = true
    })
    fKeyboard.onKeyDown('q', () => {
      this.inputs.left = true
    })

    // Key up
    fKeyboard.onKeyUp('w', () => {
      this.inputs.forward = false
    })
    fKeyboard.onKeyUp('s', () => {
      this.inputs.backward = false
    })
    fKeyboard.onKeyUp('a', () => {
      this.inputs.left = false
    })
    fKeyboard.onKeyUp('d', () => {
      this.inputs.right = false
    })
    // For AZERTY keyboards
    fKeyboard.onKeyUp('z', () => {
      this.inputs.forward = false
    })
    fKeyboard.onKeyUp('q', () => {
      this.inputs.left = false
    })

    // Jump
    fKeyboard.onKeyDown(' ', () => {
      this.yVelocity = 14
    })

    // The gap the controller will leave between the character and its environment
    const offset = 0.01
    // Create the character controller
    this.characterController = scene.world.createCharacterController(offset)
    // Configure autostep
    this.characterController.enableAutostep(0.5, 0.1, true)

    // Initialize a sensor
    this.component.initSensor({
      shape: FShapes.CAPSULE,
      scale: { x: 1.1, y: 1.1, z: 1.1 },
    })

    // Initialize the rigid body
    this.component.initRigidBody({
      rigidBodyType: RAPIER.RigidBodyType.KinematicPositionBased,
      ...options,
    })
  }

  /**
   * Return the corrected movements for the current frame.
   */
  getCorrectedMovements(): { x: number, y: number, z: number } {
    let worldDirection = new THREE.Vector3(0, 0, 0)
    // Compute the movement direction
    worldDirection.x = this.inputs.left ? 1 : this.inputs.right ? -1 : 0
    worldDirection.z = this.inputs.forward ? 1 : this.inputs.backward ? -1 : 0
    // Normalize the movement direction
    worldDirection = worldDirection.normalize()
    // Apply the camera direction to the movement direction
    const cameraDirection = this.scene.camera.getCameraDirection()
    worldDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.atan2(cameraDirection.x, cameraDirection.z))

    // Create movement vector
    const desiredMovement = {
      x: worldDirection.x * 8 * 0.01,
      y: this.yVelocity * 0.01,
      z: worldDirection.z * 8 * 0.01,
    }
    // Compute the desired movement
    this.characterController.computeColliderMovement(
      this.component.collider?.collider as RAPIER.Collider,
      desiredMovement,
      RAPIER.QueryFilterFlags.EXCLUDE_SENSORS,
    )

    // If yVelocity is not 0, apply gravity
    if (this.yVelocity > this.scene.world.gravity.y) {
      this.yVelocity += this.scene.world.gravity.y * 0.00981 * 4
    }
    else {
      this.yVelocity = this.scene.world.gravity.y
    }

    // Return the corrected movement
    return this.characterController.computedMovement()
  }

  /**
   * Return the corrected rotation for the current frame.
   * Uses the camera so the character nevers faces the camera.
   */
  getCorrectedRotation(): RAPIER.Quaternion {
    // Get the camera direction
    const cameraDirection = this.scene.camera.getCameraDirection()
    // Get the angle between the camera direction and the character direction
    const angle = Math.atan2(cameraDirection.x, cameraDirection.z)
    // Create a THREE quaternion from the corrected rotation
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0))
    // Return the corrected rotation as a RAPIER quaternion
    return new RAPIER.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
  }

  onFrame(delta: number): void {
    /**
     * Get the corrected movements for the current frame
     */
    const correctedMovement = this.getCorrectedMovements()

    // Apply the movement to the rigid body
    this.component.rigidBody?.rigidBody.setNextKinematicTranslation({
      x: this.component.rigidBody.rigidBody.translation().x + correctedMovement.x * delta * this.speed * 64,
      y: this.component.rigidBody.rigidBody.translation().y + correctedMovement.y * delta * this.speed * 64,
      z: this.component.rigidBody.rigidBody.translation().z + correctedMovement.z * delta * this.speed * 64,
    })

    // If one of the inputs is true, apply the corrected rotation
    if (this.inputs.forward || this.inputs.backward || this.inputs.left || this.inputs.right) {
      // Apply the rotation to the rigid body
      this.component.rigidBody?.rigidBody.setNextKinematicRotation(this.getCorrectedRotation())
    }
  }
}
