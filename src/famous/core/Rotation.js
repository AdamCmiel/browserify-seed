'use strict';

var Engine = require('./Engine');

function Rotation(options) {

    this._matrix     = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.type        = 'Rotation';
    this.memory      = new Float32Array([1,0,1,0,1,0,0]);
    this.invalidated = 0|0;
    this._id         = Engine.register(this);

    this.getters = [
        null,
        null,
        null
    ];

    this.state = [
        0,
        0,
        0
    ];

    if (options) {
        if (options.phi)   this.phiFrom(options.phi);
        if (options.theta) this.thetaFrom(options.theta);
        if (options.psi)   this.psiFrom(options.psi);
    }

}


Rotation.DEPENDENTS = [
    1553|0,
    358|0,
    1126|0,
    614|0,
    103|0,
    118|0
];

Rotation.VALIDATORS = [
    function() {
        return this.memory[0] * this.memory[4];
    },
    function() {
        return this.memory[2] * this.memory[5] + this.memory[3] * this.memory[1] * this.memory[4];
    },
    function() {
        return this.memory[3] * this.memory[5] - this.memory[2] * this.memory[1] * this.memory[4];
    },
    0,
    function() {
        return -this.memory[0] * this.memory[5];
    },
    function() {
        return this.memory[2] * this.memory[4] - this.memory[3] * this.memory[1] * this.memory[5];
    },
    function() {
        return this.memory[3] * this.memory[4] + this.memory[2] * this.memory[1] * this.memory[5];
    },
    0,
    function() {
        return this.memory[1];
    },
    function() {
        return -this.memory[3] * this.memory[0];
    },
    function() {
        return this.memory[2] * this.memory[0];
    },
    0,
    0,
    0,
    0,
    1
];

Rotation.prototype.update = function update() {
    var getter = this.getters[0];
    var deps   = Rotation.DEPENDENTS;
    var mem    = this.memory;
    var state  = this.state
    var update;
    var dirty = false;
    if (getter) {
        update = mem[6] = getter();
        if (update !== state[0]) {
            dirty             = dirty || true;
            state[0]          = update;
            mem[0]            = Math.cos(update);
            mem[1]            = Math.sin(update);
            this.invalidated |= deps[0] | deps[1];
        }
    }
    getter = this.getters[1];
    if (getter) {
        update = mem[6] = getter();
        if (update !== state[1]) {
            dirty             = dirty || true;
            state[1]          = update;
            mem[2]            = Math.cos(update);
            mem[3]            = Math.sin(update);
            this.invalidated |= deps[2] | deps[3];
        }
    }
    getter = this.getters[2];
    if (getter) {
        update = mem[6] = getter();
        if (update !== state[2]) {
            dirty             = dirty || true;
            state[2]          = update;
            mem[4]            = Math.cos(update);
            mem[5]            = Math.sin(update);
            this.invalidated |= deps[4] | deps[5];
        }
    }
    if (dirty) this.css = this.getCSS();
};

Rotation.prototype.validate = function validate() {
    var invalidated = this.invalidated;
    var counter     = 0;
    while (this.invalidated) {
        if (this.invalidated & 1) 
            if (Rotation.VALIDATORS[counter] instanceof Function) this._matrix[counter] = Rotation.VALIDATORS[counter].call(this);
            else this._matrix[counter] = Rotation.VALIDATORS[counter];
        counter++;
        this.invalidated >>>= 1;
    }
    return invalidated;
}

Rotation.prototype.setOptions = function setOptions(opts) {
    var provider;
    var index;
    var deps = Rotation.DEPENDENTS;
    for (var key in opts) {
        provider = opts[key];
        switch (key) {
            case 'phi'  : index = 0; break;
            case 'theta': index = 1; break;
            case 'psi'  : index = 2; break;
            default : return;
        }
        if (provider instanceof Function) this.getters[index] = provider;
        else if (provider instanceof Object && provider.get instanceof Function) this.getters[index] = provider.get.bind(provider);
        else {
            this.getters[index]        = null;
            this.state[index]          = provider;
            this.memory[index * 2]     = Math.cos(provider);
            this.memory[index * 2 + 1] = Math.sin(provider);
            this.invalidated          |= deps[index * 2] | deps[index * 2 + 1];
        }
    }
    this.update();
    this.validate();
};

Rotation.prototype.phiFrom = function phiFrom(provider) {
    if (provider) this.setOptions({ phi: provider });
};

Rotation.prototype.thetaFrom = function thetaFrom(provider) {
    if (provider) this.setOptions({ theta: provider });
};

Rotation.prototype.psiFrom = function psiFrom(provider) {
    if (provider) this.setOptions({ psi: provider });
};

Rotation.prototype.getCSS = function getCSS() {
    var state = this.state;
    return 'rotateX('
        + state[0]
        + 'rad) '
        + 'rotateY('
        + state[1]
        + 'rad) '
        + 'rotateZ('
        + state[2]
        + 'rad) ';
};

Rotation.prototype.cleanup = function cleanup() {
    TransformTree.deregister(this._id);
    this._id = null;
};

Rotation.prototype.reregister = function reregister() {
    if (this._id == null) this._id = TransformTree.registerNewTransform(this);
}

module.exports = Rotation;
