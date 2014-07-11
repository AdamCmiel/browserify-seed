var Engine = require('./Engine');

function Scale(options) {

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

    this.setOptions(options);

}

Scale.DEPENDENTS = [
    0,
    1 << 5,
    1 << 10
];

Scale.prototype.update = function update() {
    var update;
    var i     = 3;
    var index = 0;
    var dirty = false;
    while (i--) {
        if (this.getters[i]) {
            update = this.getters[i]();
            switch (i) {
                case 0  : index = 0;  break;
                case 1  : index = 5;  break;
                case 2  : index = 10; break;
                default : return;
            }
            if (update !== this._matrix[index]) {
                dirty               = dirty || true;
                this._matrix[index] = update;
                this.invalidated   |= Scale.DEPENDENTS[i];
            }
        }
    }
    if (dirty) this.css = this.getCSS();
};

Scale.prototype.setOptions = function setOptions(opts) {
    var provider;
    var key;
    var index;
    var position;
    for (key in opts) {
        provider = opts[key];
        switch (key) {
            case 'x': index = 0; position = 0;  break;
            case 'y': index = 1; position = 5;  break;
            case 'z': index = 2; position = 10; break;
            default : return;
        }
        if (provider instanceof Function) this.getters[index] = provider;
        else if (provider instanceof Object && provider.get instanceof Function) this.getters[index] = provider.get.bind(provider);
        else {
            this.getters[index]     = null;
            this._matrix[position]  = provider;
            this.invalidated       |= Scale.DEPENDENTS[index];
        }
    }
    this.update();
};

Scale.prototype.validate = function validate() {
    if (!this.invalidated) return 0;
    var invalidated  = this.invalidated;
    this.invalidated = 0;
    return invalidated;
};

Scale.prototype.xFrom = function xFrom(x) {
    if (x) this.setOptions({x: x});
};

Scale.prototype.yFrom = function yFrom(y) {
    if (y) this.setOptions({y: y});
};

Scale.prototype.zFrom = function zFrom(z) {
    if (z) this.setOptions({z: z});
};

Scale.prototype.getCSS = function getCSS() {
    return 'scale3d('
        + this._matrix[0]
        + ','
        + this._matrix[5]
        + ','
        + this._matrix[10]
        + ')';
};

Scale.prototype.cleanup = function cleanup() {
    TransformTree.deregister(this._id);
    this._id = null;
};

Scale.prototype.reregister = function reregister() {
    if (this._id == null) this._id = TransformTree.registerNewTransform(this);
};

module.exports = Scale;
