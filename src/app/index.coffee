Engine = require "famous/core/Engine"
Surface = require "famous/core/Surface"
Modifier = require "famous/core/Modifier"
Transform = require "famous/core/Transform"
ImageSurface = require "famous/surfaces/ImageSurface"
floatingLabelContent = require "../templates/floatingLabel.jade"

# create the main context
mainContext = Engine.createContext()

# your app here
initialTime = Date.now()
logo = new ImageSurface
  content: "images/famous_logo.png"
  classes: ["backfaceVisibility"]

centerSpinModifier = new Modifier
  size: [200, 200]
  origin: [0.5, 0.5]
  transform: ->
    Transform.rotateY .002 * (Date.now() - initialTime)

floatingLabel = new Surface
  classes: ["floating-label"]
  content: floatingLabelContent()
floatingLabelModifier = new Modifier
  size: [300, 76]
  origin: [0.5, 0.5]
  transform: Transform.translate 0, 200, 0

mainContext.add centerSpinModifier
           .add logo

mainContext.add floatingLabelModifier
           .add floatingLabel