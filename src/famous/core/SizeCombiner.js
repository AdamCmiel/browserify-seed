
function Sizer(parent, child) {
    this._size        = new Float32Array([0, 0]);
    this.type         = 'SizeCombiner';
    this.invalidated  = 0;
    this.parent       = null;
    this.child        = null;

    if (parent) this.addParent(parent);
    if (child) this.addChild(child);
}

SizeCombiner.prototype.validate = function() {

};

SizeCombiner.prototype.addParent = function(parent) {
    if (parent == null) return;
    this.parent       = parent;
    this.invalidated  = 3;
    this.validate();
};

SizeCombiner.prototype.addChild = function(child) {
    if (child == null) return;
    this.child       = child;
    this.invalidated = 3;
    this.validate();
};
