// Define profiles with specific attributes to simulate different devices
const profiles = {
    profile1: {
        screen: { width: 1920, height: 1080 },
        platform: 'Win32',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
        languages: ['en-US', 'en'],
        hardwareConcurrency: 4,
		availHeight: 1080,
		availWidth:1920,
        name: "Windows Desktop",
    },
    profile2: {
        screen: { width: 1440, height: 900 },
        platform: 'MacIntel',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        languages: ['es-ES', 'es'],
        hardwareConcurrency: 2,
		availHeight: 900,
		availWidth:1440,
        name: "MacBook Air",
    },
    profile3: {
        screen: { width: 375, height: 812 },
        platform: 'iPhone',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        languages: ['fr-FR', 'fr'],
        hardwareConcurrency: 1,
		availHeight:812,
		availWidth:375,
        name: "iPhone X",
    }
};

function applyProfileAttributes(profileData) {
    // Apply user agent, screen dimensions, and battery level based on the profile
    console.log(`Applying settings for: ${profileData}`);
    
    // Assuming these functions are adjusted to use profile-specific data
	applyRandomProfile(profiles);
    //randomizeScreenResolution(profileData.screen.width, profileData.screen.height);
}

// This function now receives the profile data instead of a boolean
function toggleRandomization(isRandomizationEnabled, profile) {
    console.log('profile inside toggle :', profile)
    if (isRandomizationEnabled) {
        console.log(`${profile} randomization enabled`);
        applyProfileAttributes(profiles[profile]);
    } else {
        console.log("Randomization disabled");
    }
}

function applyRandomProfile(profiles) {
    // Select a random profile
    const profileKeys = Object.keys(profiles);
    const randomProfileKey = profileKeys[Math.floor(Math.random() * profileKeys.length)];
    const selectedProfile = profiles[randomProfileKey];

    // Apply properties from the selected profile
    Object.defineProperty(screen, 'width', { get: () => selectedProfile.screen.width });
    Object.defineProperty(screen, 'height', { get: () => selectedProfile.screen.height });
    Object.defineProperty(navigator, 'platform', { get: () => selectedProfile.platform });
    Object.defineProperty(navigator, 'userAgent', { get: () => selectedProfile.userAgent });
    Object.defineProperty(navigator, 'languages', { get: () => selectedProfile.languages });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => selectedProfile.hardwareConcurrency });
	Object.defineProperty(navigator, "deviceMemory", {
		get: () => undefined,
	});
	Object.defineProperty(navigator, "userAgentData", {
		get: () => undefined,
	});
	Object.defineProperty(screen, "availWidth", {
		get: () => selectedProfile.availWidth,
	});
	
	Object.defineProperty(screen, "availHeight", {
		get: () =>selectedProfile.availHeight,
	});
	Object.defineProperty(Date.prototype, "getTimezoneOffset", {
		get: () => () => 0,
	});

    // This approach simulates the rest of the navigator properties
    // It's a simplistic representation and for demonstration purposes
    console.log(`Applied profile: ${selectedProfile.name}`);
}

// Check the selected profile to determine if randomization should be enabled
chrome.storage.local.get('selectedProfile', function(data) {
    const isRandomizationEnabled = data.selectedProfile !== 'allProfiles';
    console.log('profile :', data.selectedProfile)
    toggleRandomization(isRandomizationEnabled, data.selectedProfile);
});

// applyRandomProfile(profiles);
// // Object.defineProperty(navigator, "platform", {
// // 	get: () => "MacIntel",
// // });

// // Object.defineProperty(navigator, "plugins", {
// // 	get: () => {
// // 		return {
// // 			length: 0,
// // 			item: () => null,
// // 			namedItem: () => null,
// // 			refresh: () => {},
// // 		};
// // 	},
// // });

// // Object.defineProperty(navigator, "userAgent", {
// // 	get: () =>
// // 		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
// // });

// // Object.defineProperty(navigator, "languages", {
// // 	get: () => ["en-US", "en"],
// // });

// // Object.defineProperty(navigator, "deviceMemory", {
// // 	get: () => undefined,
// // });

// // Object.defineProperty(navigator, "getBattery", {
// // 	get: () => () => undefined,
// // });

// Object.defineProperty(navigator, "connection", {
// 	get: () => undefined,
// });

// Object.defineProperty(navigator.keyboard, "getLayoutMap", {
// 	get: () => () => undefined,
// });

// Object.defineProperty(navigator, "mediaDevices", {
// 	get: () => undefined,
// });

// Object.defineProperty(navigator, "mimeTypes", {
// 	get: () => [],
// });

// // Object.defineProperty(navigator, "hardwareConcurrency", {
// // 	get: () => 2,
// // });

// Object.defineProperty(screen, "width", {
// 	get: () => 1498,
// });

// Object.defineProperty(screen, "height", {
// 	get: () => 699,
// });

// // Object.defineProperty(screen, "availWidth", {
// // 	get: () => 1498,
// // });

// // Object.defineProperty(screen, "availHeight", {
// // 	get: () => 699,
// // });

// // Object.defineProperty(Date.prototype, "getTimezoneOffset", {
// // 	get: () => () => 0,
// // });

// Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
// 	get: () => () => {
// 		return {
// 			locale: "en-US",
// 			calendar: "gregory",
// 			numberingSystem: "latn",
// 			timeZone: "UTC",
// 			year: "numeric",
// 			month: "numeric",
// 			day: "numeric",
// 		};
// 	},
// });