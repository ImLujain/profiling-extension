Object.defineProperty(navigator, "platform", {
	get: () => "Linux",
});

Object.defineProperty(navigator, "plugins", {
get: () => {
return {
length: 0,
item: () => null,
namedItem: () => null,
// eslint-disable-next-line @typescript-eslint/no-empty-function
refresh: () => {},
		};
	},
});

Object.defineProperty(navigator, "userAgent", {
	get: () =>
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
});

// Object.defineProperty(navigator, "userAgentData", {
// 	get: () => undefined,
// });

Object.defineProperty(navigator, "vendor", {
    get: () => {
        const vendors = [ // we can add more values if we want to randomize it on each visit

            "Google Inc.",
        ];

        const randomIndex = Math.floor(Math.random() * vendors.length);
        return vendors[randomIndex];
    },
});

const languageOptions = [
    ['en-US', 'en'],
    ['fr-FR', 'fr'],
    ['es-ES', 'es'],
    ['de-DE', 'de'],
    ['it-IT', 'it'],

];

Object.defineProperty(navigator, "languages", {
    get: () => languageOptions[Math.floor(Math.random() * languageOptions.length)],
});

Object.defineProperty(navigator, "hardwareConcurrency", {
    get: () => {
        const min = 2; // The minimum of the adjusted range (2*2 = 4)
        const max = 8; // The maximum of the adjusted range (8*2 = 16)
        // Generate a random even number between 4 and 16
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 2;
    },
});

Object.defineProperty(navigator, "deviceMemory", {
	get: () => undefined,
});

Object.defineProperty(navigator, "getBattery", {
	get: () => () => 0.7,
});

Object.defineProperty(navigator, "connection", {
	get: () => undefined,
});

// Object.defineProperty(navigator.keyboard, "getLayoutMap", {
// 	get: () => () => undefined,
// });

Object.defineProperty(navigator, "mediaDevices", {
	get: () => undefined,
});

Object.defineProperty(navigator, "mimeTypes", {
	get: () => [],
});




Object.defineProperty(screen, "width", {
	get: () => 1920,
});

Object.defineProperty(screen, "height", {
	get: () => 1080,
});

Object.defineProperty(screen, "availWidth", {
	get: () => 1920,
});

Object.defineProperty(screen, "availHeight", {
	get: () => 1080,
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
