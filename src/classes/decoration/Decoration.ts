import RAPIER from '@dimforge/rapier3d'
import { FFBX } from '@fibbojs/3d'
import type { FModelOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'

export default class Decoration extends FFBX {
  constructor(scene: FScene, options: FModelOptions) {
    super(scene, {
      position: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 2, z: 2 },
      ...options,
    })
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      rigidBodyType: RAPIER.RigidBodyType.Fixed,
      ...options,
    })
  }
}
