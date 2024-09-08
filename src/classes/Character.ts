import { FFBX } from '@fibbojs/3d'
import type { FRigidBodyOptions, FScene } from '@fibbojs/3d'
import { CharacterController } from './CharacterController'
import Coin from './Coin'
import CoinCounter from '../ui/coinCounter'
import DoorRotateLarge from './DoorRotateLarge'

export default class Character extends FFBX {
  controller: CharacterController
  constructor(scene: FScene) {
    super(scene, {
      name: 'character-female-e',
      position: { x: 0, y: 10, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
    })

    // Initialize the character controller
    this.controller = new CharacterController(scene, {
      component: this,
    })

    // Init coin counter
    const coinCounter = new CoinCounter()

    // Collisions
    this.onCollisionWith(Coin, ({ component }) => {
      const coin = component as Coin
      // Remove the coin from the scene
      this.scene.removeComponent(coin)
      // Add 1 to the coin counter
      coinCounter.update(coinCounter.coinCount + 1)
    })
    this.onCollisionWith(DoorRotateLarge, () => {
      this.controller.inputs.forward = false
      this.controller.inputs.backward = false
      this.controller.inputs.left = false
      this.controller.inputs.right = false
      if (coinCounter.coinCount >= 5) {
        alert('You opened the door!')
      } else {
        alert('You need 5 coins to open the door!')
      }
    })
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: 0.25, z: 0 },
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      ...options,
    })
  }

  initSensor(options?: FRigidBodyOptions) {
    super.initSensor({
      ...options,
      position: { x: 0, y: 0.25, z: 0 },
      scale: { x: 0.5, y: 0.5, z: 0.5 },
    })
  }
}
