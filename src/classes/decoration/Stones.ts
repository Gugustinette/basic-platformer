import { type FComponentOptions, type FScene } from '@fibbojs/3d'
import Decoration from './Decoration'

export default class Stones extends Decoration {
  constructor(scene: FScene, options?: FComponentOptions) {
    super(scene, {
      name: 'stones',
      ...options,
    })
  }
}
