
function RenderNode() {
    this._components = {
        'transform': new Transform(),
        'size': new Size(),
        'opacity': new Opacity()
    };
    this._parent = null;
    this._children = [];
}

RenderNode.prototype.registerComponent = function registerComponent(type, constructor) {
    var component = new constructor(this);
    this.components[type] = component;
    return component;
};
RenderNode.prototype.addComponent = RenderNode.prototype.registerComponent;

RenderNode.prototype.deregisterComponent = function deregisterComponent(type, constructor) {
    this.components[type].cleanup();
    this.components[type] = null;
};
RenderNode.prototype.removeComponent = RenderNode.prototype.removeComponent;

RenderNode.prototype.getComponent = function getComponent(type) {
    return this.components[type];
};

RenderNode.prototype.setParent = function setParent(parent) {
    this.parent = parent;
};

RenderNode.prototype.add = function add(node) {
    if (this._children === null) this._children = [];
    this._children.push(node);
    node._components.transform.setGlobal(this._components.transform);
    node._components.size.setGlobal(this._components.size);
    node._components.opacity.setGlobal(this._components.opacity);
    node.setParent(this);
};

RenderNode.prototype.cleanup = function cleanup() {
    this._components = null;
    this._children = null;
    this._parent = null;
};

