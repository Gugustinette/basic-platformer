import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Ground from './Ground'

export default class BlockGrassLowLarge extends Ground {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'block-grass-low-large',
      ...options,
    })
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: this.scaleY / 8, z: 0 },
      scale: { x: 1, y: 0.25, z: 1 },
      ...options,
    })
  }
}
