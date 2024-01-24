console.log("hii")
//list of properties to monitor for device info access
const deviceInfoProperties = [
    // Navigator Object
    //"navigator.userAgent",
    "navigator.appVersion",
    "navigator.platform",
    "navigator.vendor",
    "navigator.languages",
    "navigator.deviceMemory",
    "navigator.hardwareConcurrency",
    "navigator.maxTouchPoints",
    "navigator.onLine",
    "navigator.doNotTrack",
    "navigator.geolocation",
    "navigator.mimeTypes",
    "navigator.plugins",
    "navigator.getBattery",
    "navigator.connection",
    "navigator.permissions",
    
    // Screen Object
    "screen.width",
    "screen.height",
    "screen.colorDepth",
    "screen.pixelDepth",
    "screen.availWidth",
    "screen.availHeight",
    "screen.orientation.type",
    
    // Document Object
    "document.cookie",
    "document.domain",
    "document.referrer",
    "document.hasFocus",
    
    // Window Object
    //"window.localStorage",
    "window.sessionStorage",
    "window.indexedDB",
    "window.devicePixelRatio",
    "window.matchMedia",
    
    // Canvas & WebGL
    "HTMLCanvasElement.prototype.getContext",
    "WebGLRenderingContext.prototype.getParameter",
    "WebGLRenderingContext.prototype.createBuffer",
    "WebGLRenderingContext.prototype.bindBuffer",
    "WebGLRenderingContext.prototype.bufferData",
    "WebGLRenderingContext.prototype.createShader",
    "WebGLRenderingContext.prototype.shaderSource",
    "WebGLRenderingContext.prototype.compileShader",
    "WebGLRenderingContext.prototype.getShaderParameter",
    "WebGLRenderingContext.prototype.createProgram",
    "WebGLRenderingContext.prototype.attachShader",
    "WebGLRenderingContext.prototype.linkProgram",
    "WebGLRenderingContext.prototype.getProgramParameter",
    "WebGLRenderingContext.prototype.useProgram",
    "WebGLRenderingContext.prototype.getUniformLocation",
    "WebGLRenderingContext.prototype.uniform1i",
    
    // AudioContext
    "AudioContext.prototype.sampleRate",
    "AudioContext.prototype.createOscillator",
    
    // Events
    "document.ontouchstart",
    "document.onmousemove",
    
    // Time & Date
    "Date.prototype.getTimezoneOffset",
    "Intl.DateTimeFormat().resolvedOptions().timeZone",
    
    // Fetch & XMLHttpRequest
    "window.fetch",
    "XMLHttpRequest.prototype.open",
    "XMLHttpRequest.prototype.send",
    
    // Others
    "CanvasRenderingContext2D.prototype.measureText",
];

function getDomain() {
    return window.location.hostname;
}

function saveAccessToLocalStorage(property, domain) {
    const localStorageKey = `accessedProperties_${domain}`;
    let accessedProperties = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    console.log(`Current accessed properties for ${domain}:`, accessedProperties);

    if (!accessedProperties.includes(property)) {
        accessedProperties.push(property);
        localStorage.setItem(localStorageKey, JSON.stringify(accessedProperties));
        console.log(`Updated accessed properties for ${domain}:`, accessedProperties);
    } else {
        console.log(`Property ${property} already stored for domain ${domain}`);
    }
}




// Counter to track how many times each property was accessed
const accessedPropertiesCounter = {};

// Function to get the origin (source) of the current script to detect its source 
function getCurrentScriptOrigin() {
    if (document.currentScript) {
        const src = document.currentScript.src;
        // console.log(`source ${src}`)
        if (src) {
            try {
                const url = new URL(src);
                // return url.origin;
                return url;
            } catch (e) {
                return "Unknown src";
            }
        } else {
            return "Inline script maybe ?";
        }
    } else {
        return "No document currentscript result :c";
    }
}

//The function that actually monitor the access to the pre-definded properties 
function monitorAccess(obj, property, handler) {
    //console.log(`property ${property}`)
    const parts = property.split("."); // First we split them to allow for nested properties to be monitord (e.g., navigator.languages).
    let currentObj = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        currentObj = currentObj[parts[i]];
        if (!currentObj) return;  // exit sfter last part 
    }
    const propName = parts[parts.length - 1];
    const originalValue = currentObj[propName];

    if (typeof originalValue === "function") {  // Special handling for functions
        currentObj[propName] = function(...args) {
            const origin = getCurrentScriptOrigin();
            handler(property, origin); // pass origin as an argument to handler
            return originalValue.apply(this, args);
        };
    } else {
        Object.defineProperty(currentObj, propName, {
            get: function() {
                const origin = getCurrentScriptOrigin();
               
                handler(property, origin); // pass origin as an argument to handler

                return originalValue;
            }
        });
    }
}


// Function to set up monitoring for all properties in deviceInfoProperties
function setupDeviceInfoMonitoring() {
    deviceInfoProperties.forEach(prop => {
        monitorAccess(window, prop, (accessedProperty, origin) => {
            console.log(`Accessed: ${accessedProperty} from: ${origin}`);

            // Increment the accessed counter
            accessedPropertiesCounter[accessedProperty] = (accessedPropertiesCounter[accessedProperty] || 0) + 1;

            // Save accessed property to local storage
            saveAccessToLocalStorage(accessedProperty, getDomain());
        });
    });
}
// Start the monitoring process
setupDeviceInfoMonitoring();