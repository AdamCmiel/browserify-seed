import View from 'famous/core/View'
import Modifier from 'famous/core/Modifier'
import Transform from 'famous/core/Transform'
import ImageSurface from 'famous/surfaces/ImageSurface'

class SpinView extends View {
    constructor() {
        super()

        const logo = new ImageSurface({
            size: [200, 200],
            content: 'images/famous_logo.png',
            classes: ['backfaceVisibility']
        })

        const centerSpinModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: () => Transform.rotateY(.002 * Date.now())
        })

        this.add(centerSpinModifier).add(logo)
    }

    stopTheWorld() {
        setTimeout(() => { debugger }, 2000)
    }
}

export default SpinView

