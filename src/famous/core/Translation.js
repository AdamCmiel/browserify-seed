var Engine = require('./Engine');

function Translation(options) {

    this._matrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.type    = 'Translation';
    this.css     = '';
    this._id     = Engine.register(this);

    this.getters = [
        null,
        null,
        null
    ];

    this.setOptions(options);

};

Translation.DEPENDENTS = [
    4096,
    8192,
    16384
];

Translation.prototype.update = function update() {
    var update;
    var i = 3;
    var dirty = false;
    while (i--) {
        if (this.getters[i]) {
            update = this.getters[i]();
            if (update !== this._matrix[i + 12]) {
				dirty                 = dirty || true;
				this._matrix[i + 12]  = update;
				this.invalidated     |= Translation.DEPENDENTS[i];
            }
        }
    }
    if (dirty) this.css = this.getCSS();
}

Translation.prototype.setOptions = function setOptions(opts) {
    var provider;
    var key;
    var index;
    for (key in opts) {
        provider = opts[key];
        switch (key) {
            case 'x': index = 0; break;
            case 'y': index = 1; break;
            case 'z': index = 2; break;
            default : return;
        }
        if (provider instanceof Function) this.getters[index] = provider;
        else if (provider instanceof Object && provider.get instanceof Function) this.getters[index] = provider.get.bind(provider);
        else {
            this.getters[index]      = null;
            this._matrix[index + 12] = provider;
            this.invalidated        |= Translation.DEPENDENTS[index];
        }
    }
    this.update();
};

Translation.prototype.validate = function validate() {
    if (!this.invalidated) return 0;
    var invalidated  = this.invalidated;
    this.invalidated = 0;
    return invalidated;
};

Translation.prototype.xFrom = function xFrom(x) {
    if (x) this.setOptions({x: x});
};

Translation.prototype.yFrom = function yFrom(y) {
    if (y) this.setOptions({y: y});
};

Translation.prototype.zFrom = function zFrom(z) {
    if (z) this.setOptions({z: z});
};

Translation.prototype.getCSS = function getCSS() {
    return 'translate3d('
        + this._matrix[12]
        + 'px,'
        + this._matrix[13]
        + 'px,'
        + this._matrix[14]
        + 'px)';
};

Translation.prototype.cleanup = function cleanup() {
    TransformTree.deregister(this._id);
    this._id = null;
};

Translation.prototype.reregister = function reregister() {
    if (this._id == null) this._id = TransformTree.registerNewTransform(this);
};

module.exports = Translation;
