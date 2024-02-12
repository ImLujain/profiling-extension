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

function createProxyHandler(handler) {
    return {
        get(target, prop, receiver) {
            // Log the property access or call the handler function
            console.log(`Property ${prop} has been accessed`);
            handler(`${target.constructor.name.toLowerCase()}.${String(prop)}`, getCurrentScriptOrigin());

            // Proceed to return the property value
            return Reflect.get(target, prop, receiver);
        },
        // You can add more traps here if needed, for example, to intercept function calls or property settings
    };
}

//The function that actually monitor the access to the pre-definded properties 
function monitorAccess(obj, property, handler) {
    const parts = property.split(".");
    let currentObj = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        currentObj = currentObj[parts[i]];
        if (!currentObj) return; // Exit if any part of the path is undefined
    }
    const propName = parts[parts.length - 1];
    const originalValue = currentObj[propName];

    if (typeof originalValue === 'function') {
        currentObj[propName] = function(...args) {
            const origin = getCurrentScriptOrigin();
            handler(`${property}`, origin); // Log the access
            
            try {
                const result = originalValue.apply(this, args);
                // Check if the function returns a promise
                if (result instanceof Promise) {
                    return result.then(value => {
                        // Log promise resolution or perform additional actions
                        console.log(`${property} promise resolved`);
                        return value;
                    }).catch(error => {
                        // Log promise rejection or perform additional actions
                        console.log(`${property} promise rejected`);
                        throw error;
                    });
                }
                return result;
            } catch (error) {
                console.error(`Error calling ${property}:`, error);
                throw error; // Re-throw the error after logging
            }
        };
    } else {
        let value = originalValue;
        Object.defineProperty(currentObj, propName, {
            get: function() {
                const origin = getCurrentScriptOrigin();
                handler(`${property}`, origin); // Log the access
                return value;
            },
            set: function(newValue) {
                value = newValue;
            },
            configurable: true
        });
    }
}



// Function to set up monitoring for all properties in deviceInfoProperties
function setupDeviceInfoMonitoring() {
    deviceInfoProperties.forEach(prop => {
        monitorAccess(window, prop, (accessedProperty, origin) => {
            console.log(`Accessed: ${accessedProperty} from: ${origin}`);

            saveAccessToLocalStorage(accessedProperty, getDomain());
        });
    });
}
// Start the monitoring process
setupDeviceInfoMonitoring();