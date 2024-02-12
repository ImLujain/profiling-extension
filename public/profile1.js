Object.defineProperty(navigator, "platform", {
	get: () => "Win32",
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

// Object.defineProperty(navigator, "userAgent", {
// 	get: () =>
// 		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
// });

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
	get: () => () => 0.7,
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
	get: () => 4,
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
