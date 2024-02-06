console.log("testtt");

function toggleRandomization(enable) {
    if (enable) {
        console.log("Randomization enabled");
        // Place your randomization enabling code here
        randomizeBatteryLevel();
        randomizeScreenResolution();
    } else {
        console.log("Randomization disabled");
        // If needed, code to disable randomization or revert any changes
    }
}

// Check the selected profile to determine if randomization should be enabled
chrome.storage.local.get('selectedProfile', function(data) {
    const isRandomizationEnabled = data.selectedProfile !== 'allProfiles';
    console.log('profile :', data.selectedProfile)
    toggleRandomization(isRandomizationEnabled);
});

// Randomize battery level
function randomizeBatteryLevel() {
    if (navigator.getBattery && isRandomizationEnabled) {
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
}

// Randomize screen resolution
function randomizeScreenResolution() {
    if (isRandomizationEnabled) {
        const randomWidth = Math.floor(Math.random() * 500) + 1024; // Random width between 1024 and 1523
        const randomHeight = Math.floor(Math.random() * 300) + 768; // Random height between 768 and 1067

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
    }
}
