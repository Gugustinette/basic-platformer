import { FScene } from "@fibbojs/3d";
import BlockGrassLowLarge from "./classes/ground/BlockGrassLowLarge";
import BlockGrass from "./classes/ground/BlockGrass";
import BlockMoving from "./classes/ground/BlockMoving";
import Crate from "./classes/decoration/Crate";
import FenceStraight from "./classes/decoration/FenceStraight.ts";
import Rocks from "./classes/decoration/Rocks";
import Stones from "./classes/decoration/Stones";
import Tree from "./classes/decoration/Tree";
import Coin from "./classes/Coin.ts";
import DoorRotateLarge from "./classes/DoorRotateLarge.ts";

export function loadLevel(scene: FScene) {
  // Initialize ground
  scene.addComponent(new BlockGrassLowLarge(scene))
  scene.addComponent(new BlockGrassLowLarge(scene, {
    position: { x: 4, y: 1, z: -8 },
    rotationDegree: { x: 0, y: 45, z: 0 },
  }))
  scene.addComponent(new BlockGrass(scene, {
    position: { x: -8, y: 1, z: -12 },
    rotationDegree: { x: 0, y: 0, z: 0 },
  }))
  scene.addComponent(new BlockMoving(scene, {
    position: { x: 1, y: 3.5, z: -14 },
    rotationDegree: { x: 0, y: 0, z: 0 },
  }))
  scene.addComponent(new BlockMoving(scene, {
    position: { x: -1, y: 5, z: -18 },
    rotationDegree: { x: 0, y: 20, z: 0 },
  }))
  scene.addComponent(new BlockMoving(scene, {
    position: { x: -6, y: 6, z: -19 },
    rotationDegree: { x: 0, y: 60, z: 0 },
  }))
  scene.addComponent(new BlockMoving(scene, {
    position: { x: 0, y: -4, z: 0 },
    rotationDegree: { x: 0, y: 60, z: 0 },
  }))

  // Add decoration
  scene.addComponent(new Crate(scene, {
    position: { x: -2, y: 2, z: -2 },
    rotationDegree: { x: 0, y: 45, z: 0 },
  }))
  scene.addComponent(new Rocks(scene, {
    position: { x: 2, y: 2, z: -3 },
    rotationDegree: { x: 0, y: 45, z: 0 },
  }))
  scene.addComponent(new Stones(scene, {
    position: { x: 0, y: 2, z: 1 },
    rotationDegree: { x: 0, y: 20, z: 0 },
  }))
  scene.addComponent(new Stones(scene, {
    position: { x: -3, y: 2, z: -2 },
    rotationDegree: { x: 0, y: 50, z: 0 },
  }))
  scene.addComponent(new Stones(scene, {
    position: { x: 3, y: 2, z: -0.5 },
    rotationDegree: { x: 0, y: 60, z: 0 },
  }))
  scene.addComponent(new FenceStraight(scene, {
    position: { x: 3, y: 2, z: 2 },
    rotationDegree: { x: 0, y: 30, z: 0 },
  }))

  // Add trees
  scene.addComponent(new Tree(scene, {
    position: { x: -3, y: 2, z: 0 },
    rotationDegree: { x: 0, y: 0, z: 0 },
  }))
  scene.addComponent(new Tree(scene, {
    position: { x: -1.5, y: 2, z: 3 },
    rotationDegree: { x: 0, y: 0, z: 0 },
  }))

  // Add coin
  scene.addComponent(new Coin(scene, {
    position: { x: 4, y: 3, z: -8 },
  }))
  scene.addComponent(new Coin(scene, {
    position: { x: 2.5, y: 2, z: 0 },
  }))
  scene.addComponent(new Coin(scene, {
    position: { x: -1.5, y: 5, z: 3 },
  }))
  scene.addComponent(new Coin(scene, {
    position: { x: -1, y: 6.5, z: -18 },
  }))
  scene.addComponent(new Coin(scene, {
    position: { x: 0, y: -2.5, z: 0 },
  }))

  // Add door
  scene.addComponent(new DoorRotateLarge(scene, {
    position: { x: -8, y: 9, z: -10 },
    rotationDegree: { x: 0, y: 0, z: 0 },
  }))
}
