var CoreSystem = require('')

var Engine = {
    _systems: [CoreSystem],
    value: 0,
    startTime: performance.now(),
    previousTime: performance.now(),
    step: function step() {
        var i = Engine._systems.length;
        while (i--) Engine._systems[i].update();
    },
    loop: function loop() {
        Engine.previousTime = performance.now();
        Engine.step();
        requestAnimationFrame(loop);
    },
    addSystem: function addSystem(system) {
        Engine._systems.push(system);
    }
};

Engine.loop();

module.exports = Engine;
