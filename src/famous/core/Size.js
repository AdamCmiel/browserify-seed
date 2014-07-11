var Engine = require('./Engine');

function Size(options) {
    this._size       = new Float32Array([0, 0]);
    this._id         = Engine.register(this);
    this.invalidated = 3;

    this._type = 'pixel', 'proportion', 'differential'

    this._size = [-10, 80]

    this.getters = [
        null,
        null
    ];

    this.setOptions(options);
}

Size.DEPENDENTS = [2, 1];

Size.prototype.update = function update() {
    var update;
    var dirty = false;

    if (this.getters[0]) {
        update = this.getters[0]();
        if (update !== this._size[0]) {
            dirty = true;
            this._size[0] = update;
            this.invalidated |= 2;
        }
    }

    if (this.getters[1]) {
        update = this.getters[1]();
        if (update !== this._size[1]) {
            dirty = true;
            this._size[1] = update;
            this.invalidated |= 1;
        }
    }

    if (dirty) this.css = this.getCSS();
};

Size.prototype.validate = function validate() {
    if (!this.invalidated) return 0;
    var invalidated  = this.invalidated;
    this.invalidated = 0;
    return invalidated;
};

Size.prototype.widthFrom = function(width) {
    if (width) this.setOptions({width: width});
};

Size.prototype.heightFrom = function(height) {
    if (height) this.setOptions({height: height});
};

Size.prototype.setOptions = function setOptions(opts) {
    var provider;
    var key;
    var index;
    for (key in opts) {
        provider = opts[key];
        switch (key) {
            case 'width': index = 0; break;
            case 'height': index = 1; break;
            default : return;
        }
        if (provider instanceof Function) this.getters[index] = provider;
        else if (provider instanceof Object && provider.get instanceof Function) this.getters[index] = provider.get.bind(provider);
        else {
            this.getters[index] = null;
            this._size[index] = provider;
            this.invalidated |= Size.DEPENDENTS[index];
        }
    }
    this.update();
}

Size.prototype.getCSS = function getCSS() {
    return "width: '" + 
        this._size[0] +
        "px' height: '" +
        this._size[1] +
        "px '";
};

Size.prototype.cleanup = function cleanup() {
    SizeTree.deregister(this._id);
    this._id = null;
};

Size.prototype.reregister = function reregister() {
    if (this._id == null) this._id = SizeTree.registerNewSize(this);
};

module.exports = Size;

