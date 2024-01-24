console.log("testtt");

if (navigator.getBattery) {
    const randomBatteryLevel = Math.random();
    const originalGetBattery = navigator.getBattery.bind(navigator);

    navigator.getBattery = function() {
        return originalGetBattery().then(battery => {
            const newBattery = Object.create(battery);
            Object.defineProperty(newBattery, 'level', {
                get: function() {
                    return randomBatteryLevel;
                },
                enumerable: true,
                configurable: true
            });
            return newBattery;
        });
    };

    console.log("Battery level randomized", randomBatteryLevel);
}


//randomize screen resolution

const randomWidth = Math.floor(Math.random() * 500) + 1024; // random width between 1024 and 1523
const randomHeight = Math.floor(Math.random() * 300) + 768; // random height between 768 and 1067

Object.defineProperty(window.screen, 'width', {
    get: function() {
        return randomWidth;
    },
    configurable: true
});

Object.defineProperty(window.screen, 'height', {
    get: function() {
        return randomHeight;
    },
    configurable: true
});

console.log(`Screen dimensions randomized to: ${randomWidth}x${randomHeight}`);
