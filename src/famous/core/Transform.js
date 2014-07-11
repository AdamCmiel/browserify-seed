var Translation    = require('./Translation');
var Rotation       = require('./Rotation');
var Scale          = require('./Scale');
var Multiplication = require('./Multiplication');

function Transform() {
    this._translation = new Translation();
    this._rotation    = new Rotation();
    this._scale       = new Scale();
    Multiplication.call(this, new Multiplication(this._scale, this._rotation), this._translation);
}

Transform.prototype             = Object.create(Multiplication.prototype);
Transform.prototype.constructor = Transform;

Transform.prototype.translate = function(x, y, z) {
	this._translation.xFrom(x);
	this._translation.yFrom(y);
	this._translation.zFrom(z);
	this.validate();
};

Transform.prototype.rotate = function(phi, theta, psi) {
	this._rotation.phiFrom(phi);
	this._rotation.thetaFrom(theta);
	this._rotation.psiFrom(psi);
	this.validate();
};

Transform.prototype.scale = function(x, y, z) {
	this._scale.xFrom(x);
	this._scale.yFrom(y);
	this._scale.zFrom(z);
	this.validate();
};

module.exports = Transform;
