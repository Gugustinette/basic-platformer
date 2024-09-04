import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Decoration from './Decoration'

export default class Tree extends Decoration {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'tree',
      scale: { x: 3, y: 3, z: 3 },
      ...options,
    })

    this.initRigidBody()
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: 1.5, z: 0 },
      scale: { x: 0.25, y: 1, z: 0.25 },
      ...options,
    })
  }
}
