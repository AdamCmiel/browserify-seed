'use strict';

var Engine = require('./Engine');

// Calculation memory

var left0, left1, left2, left3, left4, left5, left6, left7, left8, left9, left10, left11, left12, left13, left14, left15;
var right0, right1, right2, right3, right4, right5, right6, right7, right8, right9, right10, right11, right12, right13, right14, right15;

// Class
function Multiplication(left, right) {
    this._matrix      = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.type         = 'Multiplication';
    this.invalidated  = 0;
    this.left         = null;
    this.right        = null;

    if (left)  this.addLeft(left);
    if (right) this.addRight(right);
}

Multiplication.DEPENDENTS = {
    left  : [4369, 8738, 17476, 34952, 4369, 8738, 17476, 34952, 4369, 8738, 17476, 34952, 4369, 8738, 17476, 34952],
    right : [15, 15, 15, 15, 240, 240, 240, 240, 3840, 3840, 3840, 3840, 61440, 61440, 61440, 61440]
};

function _handleLeftInvalidation(invalidated) {
    var counter = 0;
    while (invalidated) {
        if (invalidated & 1) this.invalidated |= Multiplication.DEPENDENTS.left[counter];
        counter++;
        invalidated >>>= 1;
    }

};

function _handleRightInvalidation(invalidated) {
    var counter = 0;
    while (invalidated) {
        if (invalidated & 1) this.invalidated |= Multiplication.DEPENDENTS.right[counter];
        counter++;
        invalidated >>>= 1;
    }
};

Multiplication.prototype.getCSS = function getCSS() {
    if (!this.left || !this.right) return '';
    return (this.left.type[0]  == 'M' ? this.left.getCSS() : this.left.css) + ' ' + (this.right.type[0] == 'M' ? this.right.getCSS() : this.right.css);
}

Multiplication.prototype.validate = function validate() {
    if (this.left == null || this.right == null) return 0;

    _handleRightInvalidation.call(this, this.right.validate());
    _handleLeftInvalidation.call(this, this.left.validate());
    if (!this.invalidated) return 0;

    left0           = this.left._matrix[0];
    left1           = this.left._matrix[1];
    left2           = this.left._matrix[2];
    left3           = this.left._matrix[3];
    left4           = this.left._matrix[4];
    left5           = this.left._matrix[5];
    left6           = this.left._matrix[6];
    left7           = this.left._matrix[7];
    left8           = this.left._matrix[8];
    left9           = this.left._matrix[9];
    left10          = this.left._matrix[10];
    left11          = this.left._matrix[11];
    left12          = this.left._matrix[12];
    left13          = this.left._matrix[13];
    left14          = this.left._matrix[14];
    left15          = this.left._matrix[15];
    right0          = this.right._matrix[0];
    right1          = this.right._matrix[1];
    right2          = this.right._matrix[2];
    right3          = this.right._matrix[3];
    right4          = this.right._matrix[4];
    right5          = this.right._matrix[5];
    right6          = this.right._matrix[6];
    right7          = this.right._matrix[7];
    right8          = this.right._matrix[8];
    right9          = this.right._matrix[9];
    right10         = this.right._matrix[10];
    right11         = this.right._matrix[11];
    right12         = this.right._matrix[12];
    right13         = this.right._matrix[13];
    right14         = this.right._matrix[14];
    right15         = this.right._matrix[15];
    var invalidated = this.invalidated;
    var counter     = 0;

    while (this.invalidated) {
        if (this.invalidated & 1) {
            switch (counter) {
                case 0  : this._matrix[counter] = left0 * right0  + left4 * right1  + left8  * right2  + left12 * right3;  break;
                case 1  : this._matrix[counter] = left1 * right0  + left5 * right1  + left9  * right2  + left13 * right3;  break;
                case 2  : this._matrix[counter] = left2 * right0  + left6 * right1  + left10 * right2  + left14 * right3;  break;
                case 3  : this._matrix[counter] = left3 * right0  + left7 * right1  + left11 * right2  + left15 * right3;  break;
                case 4  : this._matrix[counter] = left0 * right4  + left4 * right5  + left8  * right6  + left12 * right7;  break;
                case 5  : this._matrix[counter] = left1 * right4  + left5 * right5  + left9  * right6  + left13 * right7;  break;
                case 6  : this._matrix[counter] = left2 * right4  + left6 * right5  + left10 * right6  + left14 * right7;  break;
                case 7  : this._matrix[counter] = left3 * right4  + left7 * right5  + left11 * right6  + left15 * right7;  break;
                case 8  : this._matrix[counter] = left0 * right8  + left4 * right9  + left8  * right10 + left12 * right11; break;
                case 9  : this._matrix[counter] = left1 * right8  + left5 * right9  + left9  * right10 + left13 * right11; break;
                case 10 : this._matrix[counter] = left2 * right8  + left6 * right9  + left10 * right10 + left14 * right11; break;
                case 11 : this._matrix[counter] = left3 * right8  + left7 * right9  + left11 * right10 + left15 * right11; break;
                case 12 : this._matrix[counter] = left0 * right12 + left4 * right13 + left8  * right14 + left12 * right15; break;
                case 13 : this._matrix[counter] = left1 * right12 + left5 * right13 + left9  * right14 + left13 * right15; break;
                case 14 : this._matrix[counter] = left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15; break;
                case 15 : this._matrix[counter] = left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15; break;
            }
        }
        counter++;
        this.invalidated >>>= 1;
    }
    return invalidated;
};

Multiplication.prototype.addLeft = function addLeft(transform) {
    if (transform == null) return;
    this.left         = transform;
    this.invalidated  = (1 << 16) - 1;
    this.validate();
};

Multiplication.prototype.addRight = function addRight(transform) {
    if (transform == null) return;
    this.right        = transform;
    this.invalidated  = (1 << 16) - 1;
    this.validate();
};

module.exports = Multiplication;
