const DISCONNECT_URL = 'https://raw.githubusercontent.com/disconnectme/disconnect-tracking-protection/master/services.json';

let disconnectList = {} as any; //create list to store the retrived list
let currentProfile = 'profile1'; // default profile, I want to change it to all profiles

const userAgents = {
    'profile1': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
    'profile2': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
    'profile3': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
} as any;

// Get the currently selected profile from local storage
chrome.storage.local.get(['selectedProfile'], (data) => {
    if (data.selectedProfile) {
        currentProfile = data.selectedProfile;
    }

});

// Listen for changes in the selected profile in storage
chrome.storage.onChanged.addListener(function(changes) {
    if (changes.selectedProfile) {
        currentProfile = changes.selectedProfile.newValue;
        chrome.declarativeNetRequest.updateDynamicRules({ //declartiveNetRequest to modify header
            addRules: [{
                "id": 1,
                "priority": 1,
                "action": {
                     // @ts-ignore comment
                    "type": "modifyHeaders",
                    "requestHeaders": [{
                        "header": "User-Agent",
                         // @ts-ignore comment
                        "operation": "set",
                        "value": userAgents[currentProfile]
                    }]
                },
                "condition": {
                    "urlFilter": "|http*",
                     // @ts-ignore comment
                    "resourceTypes": ["script", "main_frame", "sub_frame"]
                }
            }],
            removeRuleIds: [1]
          });
        //sendUserAgentToContentScript();
    }
});

// Note: With the new declarativeNetRequest rules, you are no longer embedding user agents info through content script

// function sendUserAgentToContentScript() {
//     const userAgent = userAgents[currentProfile];
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         if(tabs && tabs.length)
//             chrome.tabs.sendMessage(tabs[0].id!, { action: "setUserAgent", value: userAgent });
//     });
// }

async function fetchDisconnectList() {
    try {
        const response = await fetch(DISCONNECT_URL);
        disconnectList = await response.json();
        console.log("Fetched Disconnect.me list:", disconnectList);
    } catch (error) {
        console.error('Error fetching Disconnect.me list:', error);
    }
}

//TODO Lujain: webRequest is outdated and no longer supported. Reimplement it with the new "declarativeNetRequest". I am coded the user-agent feature for you to help you with an example. Your task is to implement gathering trackerInfo

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {
//         const userAgent = userAgents[currentProfile];
//         if (userAgent) {
//             for (let header of details.requestHeaders) {
//                 if (header.name.toLowerCase() === 'user-agent') {
//                     header.value = userAgent;
//                     return { requestHeaders: details.requestHeaders };
//                 }
//             }
//         }
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking", "requestHeaders"]
// );

// // on before request "Fires when a request is about to occur.
// //This event is sent before any TCP connection is made and can be used to cancel or redirect requests. "
chrome.webRequest.onBeforeRequest.addListener(
    function(details:any) {
        if (!details.url) return; // Check if URL is defined
        
        const domain = new URL(details.url).hostname;
        let parentDomain = null;
        if (details.initiator) {
            parentDomain = new URL(details.initiator).hostname;
        } else if (details.documentUrl) {
            parentDomain = new URL(details.documentUrl).hostname;
        } else {
            parentDomain = domain; // Fallback to the domain itself
        }

        for (const category in disconnectList.categories) {
            const services = disconnectList.categories[category];
            for (const serviceObj of services) {
                for (const serviceName of Object.keys(serviceObj)) {
                    const serviceDomains = Object.values(serviceObj[serviceName]).flat();
                    if (serviceDomains.includes(domain)) {
                        const timestamp = new Date().toISOString();
                        const trackerInfo = { 
                            trackerDomain: domain, 
                            timestamp, 
                            parentDomain,
                            category
                        };
                        storeDetectedTracker(trackerInfo);
                    }
                }
            }
        }
    },
    { urls: ["<all_urls>"] }
);

function storeDetectedTracker(trackerInfo: any) {
    chrome.storage.local.get(['selectedProfile', 'detectedTrackers', 'uniqueTrackersCount', 'uniqueDomainsCount'], (data) => {
        const profile = data.selectedProfile || 'profile1';
        const trackers = data.detectedTrackers || {};
        let uniqueTrackersCount = data.uniqueTrackersCount || 0;
        let uniqueDomainsCount = data.uniqueDomainsCount || 0;
        trackers[profile] = trackers[profile] || [];

        const isDuplicateTracker = trackers[profile].some((entry:any) => 
            entry.trackerDomain === trackerInfo.trackerDomain
        );

        const isDuplicateParentDomain = trackers[profile].some((entry:any) => 
            entry.parentDomain === trackerInfo.parentDomain
        );

        if (!isDuplicateTracker) {
            trackers[profile].push(trackerInfo);
            uniqueTrackersCount++; // Increment the unique tracker count
        }

        if (!isDuplicateParentDomain && trackerInfo.parentDomain !== trackerInfo.trackerDomain) {
            uniqueDomainsCount++; // Increment the unique domain count
        }

        chrome.storage.local.set({ 
            detectedTrackers: trackers, 
            uniqueTrackersCount: uniqueTrackersCount,
            uniqueDomainsCount: uniqueDomainsCount 
        });
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getTrackers") {
            const profile = request.profile;
            chrome.storage.local.get(['detectedTrackers', 'uniqueTrackersCount', 'uniqueDomainsCount'], (data) => {
                const trackers = data.detectedTrackers || {};
                const uniqueTrackersCount = data.uniqueTrackersCount || 0;
                const uniqueDomainsCount = data.uniqueDomainsCount || 0;
                console.log("Sending data to popup:", data); // Log the data being sent to popup
                sendResponse({ 
                    trackers: trackers, 
                    // list: disconnectList,
                    uniqueTrackersCount: uniqueTrackersCount,
                    uniqueDomainsCount: uniqueDomainsCount
                });
            });
            return true;
        }
     
        
    }
);

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "propertyAccessed") {
//         // Handle the message
//         console.log("background got the message from content")
//         console.log("Property Accessed:", message.property, "Origin:", message.origin);
//     }
// });

// Fetch the disconnect list at the start

// Other existing code...

interface AccessInfo {
    property: string;
    origin: string;
    // count: number;
    timestamp: string;
}

interface AccessData {
    accesses: AccessInfo[];
    counts: { [key: string]: number };
}

const accessData: AccessData = {
    accesses: [],
    counts: {}
};

// Define a type for the expected request structure
interface PropertyAccessedRequest {
    action: string;
    property: string;
    origin: string;
    count: number;
}

// Listener for messages from the detection script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Check for the right action
        if (request.action == "propertyAccessed") {
            console.log("message reached the background", request)
            // Update access data structure
            const accessedProperty = request.property;
            console.log(accessedProperty)
            const accessInfo = {
                property: accessedProperty,
                origin: request.origin,
                // count: request.count,
                timestamp: new Date().toISOString() // Add a timestamp
            };

            // Store the individual access instance
            accessData.accesses.push(accessInfo);
            

            // Update the count
            accessData.counts[accessedProperty] = request.count;

            // Optionally, you can send a response back
            sendResponse({ status: 'Access Recorded' });
        }

        return true; // Return true to indicate asynchronous response (if needed)
    }
);

// Function to provide access data to the popup
function getAccessData() {
    return accessData;
}


fetchDisconnectList();



