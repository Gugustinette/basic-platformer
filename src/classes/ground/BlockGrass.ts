import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Ground from './Ground'

export default class BlockGrass extends Ground {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'block-grass',
      scale: { x: 16, y: 16, z: 16 },
      ...options,
    })
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: this.scaleY / 4, z: 0 },
      scale: { x: 0.5, y: 0.5, z: 0.5 },
      ...options,
    })
  }
}
