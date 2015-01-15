import View from 'famous/core/View'
import Modifier from 'famous/core/Modifier'
import Transform from 'famous/core/Transform'
import ImageSurface from 'famous/surfaces/ImageSurface'
import Surface from 'famous/core/Surface'

function loremIpsum() {
    return '<div class="scroll-container">' + 
        '<p class="scroll-text">' + 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" +
        "</p></div>"
}

class SpinView extends View {
    constructor() {
        super()

        const modifier = new Modifier({
            size: [300, 300],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
        })

        const surface = new Surface({
            content: loremIpsum(),
            classes: ['touch-scroll']
        })

        this.add(modifier).add(surface)
    }
}

export default SpinView

