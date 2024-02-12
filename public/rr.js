
// // Define profiles with specific attributes to simulate different devices
// const profiles = {
//     profile1: {
//         screen: { width: 1920, height: 1080 },
//         platform: 'Win32',
//         userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
//         languages: ['en-US', 'en'],
//         hardwareConcurrency: 4,
//         name: "Windows Desktop",
//     },
//     profile2: {
//         screen: { width: 1440, height: 900 },
//         platform: 'MacIntel',
//         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
//         languages: ['en-US', 'en'],
//         hardwareConcurrency: 2,
//         name: "MacBook Air",
//     },
//     profile3: {
//         screen: { width: 375, height: 812 },
//         platform: 'iPhone',
//         userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
//         languages: ['en-US', 'en'],
//         hardwareConcurrency: 1,
//         name: "iPhone X",
//     }
// };

// function applyRandomProfile(profiles) {
//     // Select a random profile
//     const profileKeys = Object.keys(profiles);
//     const randomProfileKey = profileKeys[Math.floor(Math.random() * profileKeys.length)];
//     const selectedProfile = profiles[randomProfileKey];

//     // Apply properties from the selected profile
//     Object.defineProperty(screen, 'width', { get: () => selectedProfile.screen.width });
//     Object.defineProperty(screen, 'height', { get: () => selectedProfile.screen.height });
//     Object.defineProperty(navigator, 'platform', { get: () => selectedProfile.platform });
//     Object.defineProperty(navigator, 'userAgent', { get: () => selectedProfile.userAgent });
//     Object.defineProperty(navigator, 'languages', { get: () => selectedProfile.languages });
//     Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => selectedProfile.hardwareConcurrency });

//     // This approach simulates the rest of the navigator properties
//     // It's a simplistic representation and for demonstration purposes
//     console.log(`Applied profile: ${selectedProfile.name}`);
// }

// applyRandomProfile(profiles);


Object.defineProperty(navigator, "platform", {
	get: () => "MacIntel",
});

Object.defineProperty(navigator, "plugins", {
	get: () => {
		return {
			length: 0,
			item: () => null,
			namedItem: () => null,
			refresh: () => {},
		};
	},
});

Object.defineProperty(navigator, "userAgent", {
	get: () =>
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
});

Object.defineProperty(navigator, "userAgentData", {
	get: () => undefined,
});

Object.defineProperty(navigator, "languages", {
	get: () => ["en-US", "en"],
});

Object.defineProperty(navigator, "deviceMemory", {
	get: () => undefined,
});

Object.defineProperty(navigator, "getBattery", {
	get: () => () => undefined,
});

Object.defineProperty(navigator, "connection", {
	get: () => undefined,
});

Object.defineProperty(navigator.keyboard, "getLayoutMap", {
	get: () => () => undefined,
});

Object.defineProperty(navigator, "mediaDevices", {
	get: () => undefined,
});

Object.defineProperty(navigator, "mimeTypes", {
	get: () => [],
});

Object.defineProperty(navigator, "hardwareConcurrency", {
	get: () => 2,
});

Object.defineProperty(screen, "width", {
	get: () => 1498,
});

Object.defineProperty(screen, "height", {
	get: () => 699,
});

Object.defineProperty(screen, "availWidth", {
	get: () => 1498,
});

Object.defineProperty(screen, "availHeight", {
	get: () => 699,
});

Object.defineProperty(Date.prototype, "getTimezoneOffset", {
	get: () => () => 0,
});

Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
	get: () => () => {
		return {
			locale: "en-US",
			calendar: "gregory",
			numberingSystem: "latn",
			timeZone: "UTC",
			year: "numeric",
			month: "numeric",
			day: "numeric",
		};
	},
});