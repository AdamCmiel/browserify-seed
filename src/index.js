// load css
import './styles'

// Load polyfills
import 'famous-polyfills'

// import dependencies
import SpinView from './spin_view'
import Engine from 'famous/core/Engine'

// create the main context
let mainContext = Engine.createContext()
let spinner = new SpinView()

spinner.stopTheWorld()
mainContext.add(spinner)

