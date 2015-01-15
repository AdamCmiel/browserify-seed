// load css
import './styles'

// Load polyfills
import 'famous-polyfills'

// import dependencies
import SpinView from './spin_view'
import Engine from 'famous/core/Engine'
import Surface from 'famous/core/Surface'
import Modifier from 'famous/core/Modifier'

// create the main context
function start() {
    Engine.setOptions({appMode: false});

    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');

    window.addEventListener('touchmove', e => {
      let classes = e.target.classList
      let hasClassIWant = Array.prototype.indexOf.call(classes, 'suckit')
      if (hasClassIWant === -1) e.preventDefault()
    })
    let mainContext = Engine.createContext()

    let surface = new Surface({
        size: [200, 200],
        classes: ['no-overflow'],
        content: 
       '<div id="suckit" class="touch-scroll">'
      +'    <div class="scroll-container suckit">'
      +'            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      +'    </div>'
      +'</div>'
    });

    let modifier = new Modifier({
        origin: [.5, .5],
        align: [.5, .5],
        size: [200, 200]
    })

    surface.on('click', _ => alert(_))

    mainContext
        .add(modifier)
        .add(surface)
}

document.addEventListener('DOMContentLoaded', start, false);
//let spinner = new SpinView()

//mainContext.add(spinner)

