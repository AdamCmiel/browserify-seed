var Transitionable = require('famous/transitions/Transitionable');
var Translation    = require('./Translation');
var Rotation       = require('./Rotation');
var Scale          = require('./Scale');
var Skew           = require('./Skew');

function TransitionableTransform() {
	this._matrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	this.type    = 'Transitionable';
	this.css     = '';
	this._id     = TransformTree.registerNewTransform(this);
	this.getters = {
		rotation    : new Transitionable([0, 0, 0]);
		translation : new Transitionable([0, 0, 0]);
		scale       : new Transitionable([1, 1, 1]);
		skew        : new Transitionable([0, 0, 0]);
	};
	this.state = {
		rotation    : new Float32Array([0, 0, 0]);
		translation : new Float32Array([0, 0, 0]);
		scale       : new Float32Array([1, 1, 1]);
		skew        : new Float32Array([0, 0, 0]);
	};
}
