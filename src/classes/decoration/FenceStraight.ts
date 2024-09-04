import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Decoration from './Decoration'

export default class FenceStraight extends Decoration {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'fence-straight',
      scale: { x: 3, y: 3, z: 3 },
      ...options,
    })

    this.initRigidBody()
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: 0.25, z: 0.6 },
      scale: { x: 0.5, y: 0.25, z: 0.1 },
      ...options,
    })
  }
}
