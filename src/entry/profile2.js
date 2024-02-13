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
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
});

Object.defineProperty(navigator, "userAgentData", {
	get: () => undefined,
});

Object.defineProperty(navigator, "languages", {
	get: () => ['es-ES', 'es'],
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

// Object.defineProperty(navigator.keyboard, "getLayoutMap", {
// 	get: () => () => undefined,
// });

Object.defineProperty(navigator, "mediaDevices", {
	get: () => undefined,
});

Object.defineProperty(navigator, "mimeTypes", {
	get: () => [],
});

Object.defineProperty(navigator, "hardwareConcurrency", {
	get: () => 4,
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
