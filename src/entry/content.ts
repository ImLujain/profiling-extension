
import { createApp } from "vue"
import TrackerHandlerComponent from "../view/TrackerHandlerComponent.vue"

window.addEventListener("load", () => {

    //append app
    const contentDetectorWrapper = document.createElement("div")
    contentDetectorWrapper.id="tracker-wrapper-container"
    const htmlElement = document.querySelector("html");   
    htmlElement?.appendChild(contentDetectorWrapper)

    const contentDetectorHandlerApp = createApp(TrackerHandlerComponent)
    contentDetectorHandlerApp.mount("#tracker-wrapper-container") 

})

const randomizeGeneralDataScript = document.createElement('script');
randomizeGeneralDataScript.src = chrome.runtime.getURL('randomize-user-data.js');
(document.head || document.documentElement).appendChild(randomizeGeneralDataScript);
randomizeGeneralDataScript.remove()

const detectFBScript = document.createElement('script');
detectFBScript.src = chrome.runtime.getURL('PrivacyGuard-detect-fp-calls.js');
(document.head || document.documentElement).appendChild(detectFBScript);
detectFBScript.remove()




//TF-IDF-interests.js
// const interest = document.createElement('script');
// interest.src = chrome.runtime.getURL('TF-IDF-interests.js');
// (document.head || document.documentElement).appendChild(interest);
// interest.remove()

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "get-property-accessed-count") {
//         // Handle the message
//         console.log("test new in content")
//         // console.log("Property Accessed:", message.property, "Origin:", message.origin);
//         // sendResponse({message})
//     }
// });








