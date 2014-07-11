var Engine = require('./Engine');

// Felix doesn't believe in skew... I might not either

function Skew() {

    this._matrix     = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.type        = 'Skew';
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

    if (options) this.setOptions(options);

}

Skew.DEPENDENTS = [
    1 << 4,
    1 << 8,
    1 << 9
];

Skew.VALIDATORS = [1,
    0,
    0,
    0,
    function() {
        return Math.tan(this.state[2]);
    },
    1,
    0,
    0,
    function() {
        return Math.tan(this.state[1]);
    },
    function() {
        return Math.tan(this.state[0]);
    },
    1,
    0,
    0,
    0,
    0,
    1
];

Skew.prototype.update = function update() {
    var update;
    var getter = this.getters[0];
    var dirty  = false;
    var state  = this.state;
    var deps   = Skew.DEPENDENTS;
    if (getter) {
        update = getter();
        if (update !== state[0]) {
            dirty    = dirty || true;
            state[0] = update;
            this.invalidated |= deps[0];
        }
    }
    getter = this.getters[1];
    if (getter) {
        update = getter();
        if (update !== state[1]) {
            dirty    = dirty || true;
            state[1] = update;
            this.invalidated |= deps[1];
        }
    }
    getter = this.getters[2];
    if (getter) {
        update = getter();
        if (update !== state[2]) {
            dirty    = dirty || true;
            state[2] = update;
            this.invalidated |= deps[2];
        }
    }
    if (dirty) this.css = this.getCSS();
};

Skew.prototype.validate = function validate() {
    var invalidated = this.invalidated;
    var counter     = 0;
    while (this.invalidated) {
        if (this.invalidated & 1)
            if (Skew.VALIDATORS[counter] instanceof Function) this._matrix[counter] = Skew.VALIDATORS[counter].call(this);
            else this._matrix[counter] = Skew.VALIDATORS[counter];
        counter++;
        this.invalidated >>>= 1;
    }
    return invalidated;
};

Skew.prototype.setOptions = function setOptions(opts) {
    var provider;
    var index;
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
            this.invalidated   |= Skew.DEPENDENTS[index];
            this.getters[index] = null;
            this.state[index]   = provider;
        }
    }
    this.update();
    this.validate();
};

Skew.prototype.phiFrom = function phiFrom(provider) {
    this.setOptions({ phi: provider });
};

Skew.prototype.thetaFrom = function thetaFrom(provider) {
    this.setOptions({ theta: provider });
};

Skew.prototype.psiFrom = function psiFrom(provider) {
    this.setOptions({ psi: provider });
};

//Vectorized skew in 3dimensions might not be supported...
Skew.prototype.getCSS = function getCSS() {
    var state = this.state;
    return 'skew(' + state[0] + ',' + state[1] + ')';
};

Skew.prototype.cleanup = function cleanup() {
    TransformTree.deregister(this._id);
    this._id = null;
};

Skew.prototype.reregister = function reregister() {
    if (this._id == null) this._id = TransformTree.registerNewTransform(this);
};

module.exports = Skew;
