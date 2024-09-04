import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Decoration from './Decoration'

export default class Crate extends Decoration {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'crate',
      ...options,
    })

    this.initRigidBody()
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: 0.25, z: 0 },
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      ...options,
    })
  }
}
