import type { FComponentOptions, FRigidBodyOptions, FScene } from '@fibbojs/3d'
import Ground from './Ground'

export default class BlockMoving extends Ground {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'block-moving',
      scale: { x: 8, y: 8, z: 8 },
      ...options,
    })
  }

  initRigidBody(options?: FRigidBodyOptions) {
    super.initRigidBody({
      position: { x: 0, y: 0.75, z: 0 },
      scale: { x: 0.5, y: this.scaleY / 64, z: 0.5 },
      ...options,
    })
  }
}
