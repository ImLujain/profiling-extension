/* eslint-disable */
console.log("inside 2 content");
(() => {
	function injectScript() {
		const parent = document.documentElement;
		const script = document.createElement("script");
		script.src = chrome.runtime.getURL("profile2.js");
		script.async = false;
		parent.insertBefore(script, parent.firstChild);
		parent.removeChild(script);
	}

	injectScript();
})();