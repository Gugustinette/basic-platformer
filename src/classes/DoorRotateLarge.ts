import { FFBX } from '@fibbojs/3d'
import type { FColliderOptions, FComponentOptions, FScene } from '@fibbojs/3d'

export default class DoorRotateLarge extends FFBX {
  constructor(scene: FScene, options: FComponentOptions) {
    super(scene, {
      name: 'door-rotate-large',
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
      ...options,
    })

    this.initSensor()
  }

  initSensor(options?: FColliderOptions): void {
    super.initSensor({
      position: { x: 0, y: 0.5, z: 0 },
      scale: { x: 0.5, y: 0.5, z: 0.25 },
      ...options,
    })
  }
}
