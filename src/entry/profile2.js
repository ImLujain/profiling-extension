console.log("inside randomizing for profile2")
Object.defineProperty(navigator, "platform", {
	get: () => "MacIntel",
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

// Object.defineProperty(navigator, "userAgent", {
// 	get: () =>
// 		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
// });

Object.defineProperty(navigator, "userAgent", {
	get: () =>
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15",
});

Object.defineProperty(navigator, "userAgentData", {
	get: () => undefined,
});

Object.defineProperty(navigator, "vendor", {
    get: () => {
        const vendors = [ // we can add more values if we want to randomize it on each visit

            "Apple Computer, Inc.",
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


// Original getContext method
const originalGetContext = HTMLCanvasElement.prototype.getContext;

// Override getContext
HTMLCanvasElement.prototype.getContext = function(type, attributes) {
    // Call the original getContext method
    const context = originalGetContext.call(this, type, attributes);

    if (type.match(/webgl/i)) {
        const vendors = 'Apple Inc';
        // Override the WEBGL_debug_renderer_info if it's available
        if (context.getExtension('WEBGL_debug_renderer_info')) {
            const debugInfo = context.getExtension('WEBGL_debug_renderer_info');
            Object.defineProperty(context, 'getParameter', {
                value: function(parameter) {
                    if (parameter === debugInfo.UNMASKED_VENDOR_WEBGL) {
                        return vendors;
                    }
                    return context.getParameter(parameter);
                }
            });
        }
    }
    return context;
};

Object.defineProperty(navigator, "deviceMemory", {
	get: () => undefined,
});

Object.defineProperty(navigator, "getBattery", {
	get: () => () => undefined,
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
	get: () => 1440,
});

Object.defineProperty(screen, "height", {
	get: () => 900,
});

Object.defineProperty(screen, "availWidth", {
	get: () => 1440,
});

Object.defineProperty(screen, "availHeight", {
	get: () => 900,
});

Object.defineProperty(Date.prototype, "getTimezoneOffset", {
	get: () => () => 0,
});

Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
	get: () => () => {
		return {
			locale: "es-ES",
			calendar: "gregory",
			numberingSystem: "latn",
			timeZone: "UTC",
			year: "numeric",
			month: "numeric",
			day: "numeric",
		};
	},
});
