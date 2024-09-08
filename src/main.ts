import * as THREE from 'three'
import { FComponentEmpty, FGameCamera, FScene } from '@fibbojs/3d'
import { FKeyboard } from '@fibbojs/event'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import Character from './classes/Character'
import { loadLevel } from './level'

(async () => {
  // Initialize the scene
  const scene = new FScene()
  scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  // Add ambient light
  const light = new THREE.AmbientLight(0xFFFFFF)
  scene.scene.add(light)

  // Create a death zone
  const deathZone = new FComponentEmpty(scene, {
    position: { x: 0, y: -20, z: 0 },
    scale: { x: 100, y: 1, z: 100 },
  })
  deathZone.initCollider()
  scene.addComponent(deathZone)

  // Init level
  loadLevel(scene)

  // Create a character
  const character = new Character(scene)
  scene.addComponent(character)

  // Attach a camera to the character
  scene.camera = new FGameCamera({ target: character })

  // Add collision events
  character.onCollisionWith(deathZone, () => {
    console.log('Character fell into the death zone!')
    character.setPosition({ x: 0, y: 10, z: 0 })
  })

  // Create keyboard
  const keyboard = new FKeyboard(scene)
  keyboard.onKeyDown('p', () => {
    character.setPosition({ x: 0, y: 5, z: 0 })
  })
})()
