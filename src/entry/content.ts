
import { createApp } from "vue"
import TrackerHandlerComponent from "../view/TrackerHandlerComponent.vue"

(() => {
	function injectScript() {
		const parent = document.documentElement;
		const script = document.createElement("script");
		script.src = chrome.runtime.getURL("r.js");
		script.async = false;
		parent.insertBefore(script, parent.firstChild);
		parent.removeChild(script);
	}

	injectScript();
})();

window.addEventListener("load", () => {

    //append app
    const contentDetectorWrapper = document.createElement("div")
    contentDetectorWrapper.id="tracker-wrapper-container"
    const htmlElement = document.querySelector("html");   
    htmlElement?.appendChild(contentDetectorWrapper)

    const contentDetectorHandlerApp = createApp(TrackerHandlerComponent)
    contentDetectorHandlerApp.mount("#tracker-wrapper-container") 

})

// const randomizeGeneralDataScript = document.createElement('script');
// randomizeGeneralDataScript.src = chrome.runtime.getURL('r.js');
// (document.head || document.documentElement).appendChild(randomizeGeneralDataScript);
// randomizeGeneralDataScript.remove()

const detectFBScript = document.createElement('script');
detectFBScript.src = chrome.runtime.getURL('PrivacyGuard-detect-fp-calls.js');
(document.head || document.documentElement).appendChild(detectFBScript);
detectFBScript.remove()




chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getLocalStorageDataForKey") {
        const value = localStorage.getItem(request.key);
        sendResponse({ data: value });
    }
    return true; // Return true to keep the message channel open
});