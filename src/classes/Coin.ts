import { FController, FFBX } from '@fibbojs/3d'
import type { FColliderOptions, FComponentOptions, FControllerOptions, FScene } from '@fibbojs/3d'

class CoinController extends FController {
  constructor(options: FControllerOptions) {
    super(options)
  }

  onFrame(delta: number) {
    // Rotate the coin
    this.component.rotationDegreeY += 100 * delta
  }
}

export default class Coin extends FFBX {
  constructor(scene: FScene, options: FComponentOptions) {
    super(scene, {
      name: 'coin-gold',
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
      ...options,
    })

    this.controller = new CoinController({
      component: this,
    })

    this.initSensor()
  }

  initSensor(options?: FColliderOptions): void {
    super.initSensor({
      position: { x: 0, y: 0.25, z: 0 },
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      ...options,
    })
  }
}
