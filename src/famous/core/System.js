'use strict';

var instances  = [];

module.exports.register = function register(instance) {
    if (instance) return instances.push(instance) - 1;
};

module.exports.update = function update() {
    for (var i = 0 ; i < instances.length ; i++) instances[i].update();
};

module.exports.validate = function validate() {
    for (var i = 0 ; i < instances.length ; i++) instances[i].validate();
};

module.exports.deregister = function deregister(id) {
    instances.splice(id, 1);
};
