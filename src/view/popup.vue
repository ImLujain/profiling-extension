<template>
  <div id="popup-container">
    <!-- Tab Headers -->
    <div class="header">
      <div class="div-header text-center">Privacy Guard</div>
      <div class="tab-headers">
        <button :class="{ 'active-tab': currentTab === 'accesses' }" @click="currentTab = 'accesses'">Access
          Insights</button>
        <button :class="{ 'active-tab': currentTab === 'trackers' }" @click="currentTab = 'trackers'">Trackers
          Summary</button>
      </div>

    </div>


    <!-- Tab Contents -->
    <div class="tab-content">
      <!-- Trackers Summary Tab -->
      <div v-if="currentTab === 'trackers'" class="trackers-summary">
        <!-- <h1>Trackers Summary</h1> -->
        <!-- <p><strong>Total Trackers Detected:</strong> <span>{{ totalCount }}</span></p> -->
        <div class="row">
          <div class="col-12 mt-3 mb-3">
            <!-- <CircleProgressBar :value="uniqueTrackersCount" :max="uniqueTrackersCount">{{ uniqueTrackersCount }}
            </CircleProgressBar> -->

          </div>
          <div class="col-12 ">
            Unique Trackers: <span class="value float-right">{{ uniqueTrackers }}</span>
          </div>
          <div class="col-12">
            Unique Parent Domains: <span class="value float-right">{{ uniqueParentDomains }}</span>

          </div>
        </div>

      </div>

      <!-- Access Insights Tab -->
      <div v-if="currentTab === 'accesses'" class="access-insights">
        <div v-if="localStorageData && localStorageData.value !== 'No data found for this key'"
          class="local-storage-data">
          <h6>Local Storage Data:</h6>
          <div class="scroll-div">
            <ul>
              <li v-for="(item, index) in parsedLocalStorageData" :key="index" class="access-item">

                <span v-if="item.isThirdParty.includes(true) && item.isThirdParty.includes(false)" class="access-type">
                  <img src="./../../public/third-party.png" />
                  <img src="./../../public/local.png" />
                </span>
                <span v-else-if="item.isThirdParty.includes(true)" class="access-type access-type-third-party">
                  <i class=""></i> <img src="./../../public/third-party.png" />
                </span>
                <span v-else class="access-type access-type-local">
                  <i class=""></i> <img src="./../../public/local.png" />
                </span>
                <div class="ml-1">  {{ deviceInfoDes[item.property]?deviceInfoDes[item.property]['value']:"no value"}} </div>

                <img src="./../../public/info.png" class="ml-auto" @mouseover="showDescriptioh" @mouseleave="hideDescriptioh">
                <span class="description">{{ deviceInfoDes[item.property]?deviceInfoDes[item.property]['des']:"no value"}}</span>

              </li>
            </ul>
          </div>

        </div>
        <p v-else>No data found for this domain.</p>
        <div>
          <div class="font-12">
            <img src="./../../public/third-party.png" /> Accessed By: Thired Party
          </div>
          <div class="font-12">
            <img src="./../../public/local.png" /> Accessed By: Local
          </div>

        </div>
      </div>



    </div>


    <div class="open-dashboard-container open-dashboard">
      <button @click="openDashboard">Open Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleProgressBar from './CircleProgressBar.vue';
import { ref, watch, computed } from "vue";

// require('../../public/PrivacyGuard-detect-fp-calls.js')

// import { deviceInfoDes } from '../../public/PrivacyGuard-detect-fp-calls.js'

// const test =require('../../public/PrivacyGuard-detect-fp-calls.js')
// console.log(test);



const deviceInfoDes: {[key: string]: {value: string, des: string }  } = {
  "navigator.userAgent": {
    "value": "userAgent",
    "des": "A string giving details on the browser and its underlying operating system. This attribute is collected with Javascript."
  },
  "navigator.platform": {
    "value": "platform",
    "des": "Browser-populated JavaScript attribute that indicates the platform the browser is running on (window.navigator.platform)"
  },
  "navigator.vendor": {
    "value": "vendor",
    "des": "Indicate the browser' vendor"
  },
  "navigator.languages": {
    "value": "languages",
    "des": "HTTP header sent to the server that indicates the preferred languages for the response"
  },
  "navigator.deviceMemory": {
    "value": "deviceMemory",
    "des": "a property that tells websites how much memory your device has, helping them adjust for better performance. It can also used to help identify your device uniquely."
  },
  "navigator.hardwareConcurrency": {
    "value": "hardwareConcurrency",
    "des": "Returns the value of navigator.hardwareConcurrency"
  },
  "navigator.doNotTrack": {
    "value": "doNotTrack",
    "des": "Browser-populated JavaScript attribute that indicates your Do Not Track setting (window.navigator.doNotTrack), 'NC' means the value was not specified"
  },
  "navigator.geolocation": {
    "value": "geolocation",
    "des": "Test to find out if the location bar is visible"
  },
  "navigator.plugins": {
    "value": "plugins",
    "des": "Browser-populated JavaScript attribute that gives the list of activated plugins in the browser."
  },
  "navigator.getBattery": {
    "value": "getBattery",
    "des": "Returns property belonging to the battery value, such as level, charging, chargin time and discharging time"
  },
  "navigator.connection": {
    "value": "connection",
    "des": "Connection informations"
  },
  "navigator.permissions": {
    "value": "permissions",
    "des": "Permissions of the browser"
  },

  "navigator.appVersion": {
    "value": "appVersion",
    "des": "null."
  },
  "screen.width": {
    "value": "Screen width",
    "des": "Returns the width of the screen."
  },
  "screen.height": {
    "value": "Screen height",
    "des": "Returns the height of the screen in pixels. "
  },
  "screen.colorDepth": {
    "value": "colorDepth",
    "des": "Returns the color depth of the screen."
  },
  "screen.pixelDepth": {
    "value": "pixelDepth",
    "des": "Returns the color depth of the screen."
  },
  "screen.availWidth": {
    "value": "availWidth",
    "des": " Returns the amount of horizontal space in pixels available to the window."
  },
  "screen.availHeight": {
    "value": "availHeight",
    "des": "Specifies the height of the screen, in pixels, minus permanent or semipermanent user interface features displayed by the operating system, such as the Taskbar on Windows."
  },
  "screen.orientation.type": {
    "value": "]orientation.type",
    "des": "null"
  },
  "document.cookie": {
    "value": "cookie",
    "des": " allows websites to read and write cookies, small pieces of data stored on your browser to remember information about your visit,"
  },

  "document.domain": {
    "value": "Domain",
    "des": "null"
  },
  "window.sessionStorage": {
    "value": "Session Storage",
    "des": "Information on the support of session storage. This attribute is collected through Javascript."
  },
  "document.referrer": {
    "value": "Referrer",
    "des": "null"
  },
  "document.hasFocus": {
    "value": "document.hasFocus",
    "des": "Information on the support of session storage. This attribute is collected through Javascript."
  },
  "window.indexedDB": {
    "value": "indexedDB",
    "des": "Information on the support of IndexedDB. This attribute is collected through Javascript."
  },
  "window.devicePixelRatio": {
    "value": "window.devicePixelRatio",
    "des": "enhances website visuals for your screen's sharpness and aids in browser fingerprinting by identifying device display characteristics."
  },
  "window.matchMedia": {
    "value": "window.matchMedia",
    "des": " used to determine if the content of a webpage matches certain conditions, like screen size or whether dark mode is enabled, which can help websites tailor their appearance and functionality to your device. This capability can also be utilized in browser fingerprinting to gather insights about your device's characteristics without collecting personal information."
  },


  "HTMLCanvasElement.prototype.getContext": {
    "value": "HTMLCanvasElement.prototype.getContext",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.getParameter": {
    "value": "WebGLRenderingContext.prototype.getParameter",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.createBuffer": {
    "value": "WebGLRenderingContext.prototype.createBuffer",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.bindBuffer": {
    "value": "WebGLRenderingContext.prototype.bindBuffer",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.bufferData": {
    "value": "WebGLRenderingContext.prototype.bufferData",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.createShader": {
    "value": "WebGLRenderingContext.prototype.createShader",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.shaderSource": {
    "value": "WebGLRenderingContext.prototype.shaderSource",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.compileShader": {
    "value": "WebGLRenderingContext.prototype.compileShader",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.getShaderParameter": {
    "value": "WebGLRenderingContext.prototype.getShaderParameter",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.createProgram": {
    "value": "WebGLRenderingContext.prototype.createProgram",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.linkProgram": {
    "value": "WebGLRenderingContext.prototype.linkProgram",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.useProgram": {
    "value": "WebGLRenderingContext.prototype.useProgram",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.getUniformLocation": {
    "value": "WebGLRenderingContext.prototype.getUniformLocation",
    "des": "null"
  },
  "WebGLRenderingContext.prototype.uniform1i": {
    "value": "WebGLRenderingContext.prototype.uniform1i",
    "des": "null"
  },
  "AudioContext.prototype.sampleRate": {
    "value": "AudioContext.prototype.sampleRate",
    "des": "null"
  },
  "AudioContext.prototype.createOscillator": {
    "value": "",
    "des": "null"
  },
  "document.ontouchstart": {
    "value": "",
    "des": "null"
  },
  "document.onmousemove": {
    "value": "document.onmousemove",
    "des": "null"
  },
  "Date.prototype.getTimezoneOffset": {
    "value": "Date.prototype.getTimezoneOffset",
    "des": "null"
  },
  "Intl.DateTimeFormat().resolvedOptions().timeZone": {
    "value": "TimeZone",
    "des": "returns current timezone"
  },
  "window.fetch": {
    "value": "window.fetch",
    "des": "null"
  },
  "XMLHttpRequest.prototype.open": {
    "value": "XMLHttpRequest.prototype.open",
    "des": "null"
  },
  "XMLHttpRequest.prototype.send": {
    "value": "XMLHttpRequest.prototype.send",
    "des": "null"
  },
  "CanvasRenderingContext2D.prototype.measureText": {
    "value": "CanvasRenderingContext2D.prototype.measureText",
    "des": "null"
  },
  "navigator.maxTouchPoints": {
    "value": "navigator.maxTouchPoints",
    "des": "to detect if the device used support touch and number of max touches allowed"
  },
  "navigator.onLine": {
    "value": "navigator.onLine",
    "des": "indicates if the user is connected to the internet or not"
  },
  
  "navigator.mimeTypes": {
    "value": "navigator.mimeTypes",
    "des": "null"
  }
}



const currentTab = ref('trackers');
const uniqueTrackersCount = ref(0);
const totalCount = ref(0);
const uniqueTrackers = ref(0);
const uniqueParentDomains = ref(0);
//let localStorageData = ref<string | null>(null);
//const localStorageData = ref('');
const localStorageData = ref('') as unknown as { value: string };



// Function to fetch data from the webpage's local storage
const fetchLocalStorageData = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].id != null && tabs[0].url) {
      const currentDomain = new URL(tabs[0].url).hostname;
      const localStorageKey = `accessedProperties_${currentDomain}`;

      chrome.tabs.sendMessage(tabs[0].id, { action: "getLocalStorageDataForKey", key: localStorageKey }, response => {
        localStorageData.value = response ? response.data : 'No data found for this key.';
      });
    }
  });
};

watch(currentTab, (newTab) => {
  if (newTab === 'accesses') {
    fetchLocalStorageData();
  }
  if (newTab === 'trackers') {
    chrome.runtime.sendMessage({ action: "getTrackers" }, (response) => {
      if (response) {
        // totalCount.value = response.detectedTrackers.length;
        uniqueParentDomains.value = response.uniqueDomainsCount;
        uniqueTrackers.value = response.uniqueTrackersCount;
      } else {
        console.error("No tracker data received.");
      }
    });
  }
});
const getHighlightClass = (item: string) => {
  // High Privacy Concern - Red
  const highPrivacy = [
    'navigator.deviceMemory',
    'navigator.hardwareConcurrency',
    'navigator.geolocation',
    'document.cookie',
    'window.localStorage',
    'window.sessionStorage',
    'window.indexedDB',
  ];

  // Medium Privacy Concern - Orange
  const mediumPrivacy = [
    'navigator.appVersion',
    'navigator.platform',
    'navigator.vendor',
    'navigator.languages',
    'navigator.maxTouchPoints',
    'screen.width',
    'screen.height',
    'navigator.connection',
  ];

  // Lower Privacy Concern - Yellow
  const lowerPrivacy = [
    'navigator.onLine',
    'screen.orientation.type',
    'document.hasFocus',
    'navigator.getBattery',
  ];

  if (highPrivacy.some(attr => item.includes(attr))) {
    return 'highlight-red'; // High privacy concern
  }
  if (mediumPrivacy.some(attr => item.includes(attr))) {
    return 'highlight-orange'; // Medium privacy concern
  }
  if (lowerPrivacy.some(attr => item.includes(attr))) {
    return 'highlight-yellow'; // Lower privacy concern
  }
  return ''; // Default, no additional class
};

const openDashboard = () => {
  chrome.tabs.create({ url: 'dashboard.html' });
};

function showDescriptioh(e:any) {
  console.log(e)
  console.log(e.target.nextElementSibling.style.display = 'block')
  // document.getElementBy(`topTrackersChart`).style.display = 'block';

}

function hideDescriptioh(e:any) {
  console.log(e)
  console.log(e.target.nextElementSibling.style.display = 'none')
  // document.getElementBy(`topTrackersChart`).style.display = 'block';

}

// Computed property to parse the local storage data into an array
const parsedLocalStorageData = computed(() => {
  if (localStorageData.value) {
    try {
      const data = JSON.parse(localStorageData.value);
      return data.map((item: { isThirdParty: any; }) => ({
        ...item,
        isThirdParty: Array.isArray(item.isThirdParty) ? item.isThirdParty : [],
      }));
    } catch (e) {
      console.error("Error parsing localStorageData:", e);
      return []; // Return an empty array if parsing fails
    }
  }
  return [];
});



</script>

<style scoped>
#popup-container {
  /* existing styles... */
}

.access-insights h2 {
  font-size: 18px;
  color: #333;
}

.local-storage-data {
  /* background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px; */
}

.tab-headers button {
  background-color: #008198;
  color: #FFFFFF;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  border: none;
}

.local-storage-data i {
  margin-right: 5px;
}

.fas.fa-users {
  color: #ff5722;
  /* 3rd Party Icon Color */
}

.fas.fa-user {
  color: #4caf50;
  /* Local Icon Color */
}

.local-storage-data li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  position: relative;
}

li .description{
  position: absolute;
  color: black;
    font-size: 10px;
    background: #c6c2c2f5;
    padding: 6px;
    border-radius: 5px;
    /* left: 121px; */
    top: 64%;
    border: 1px solid #c2bfbf;
    display: none;
    z-index: 9;
    right: 12%;
}
/* High Privacy Concern - Red */
.local-storage-data li.highlight-red {
  background-color: rgba(236, 80, 69, 0.5);
  ;
  /* Red with opacity */
}

/* Medium Privacy Concern - Orange */
.local-storage-data li.highlight-orange {
  background-color: rgba(255, 165, 69, 0.5);
  /* Orange with opacity */
}

/* Lower Privacy Concern - Yellow */
.local-storage-data li.highlight-yellow {
  background-color: rgba(255, 255, 70, 0.5);
  /* Yellow with opacity */
}

.local-storage-data ul {
  list-style-type: none;
  padding: 0;
}

.local-storage-data li {
  background-color: #fff;
  padding: 8px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 14px;
}

#popup-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #4a4a4a;
  background-color: #f9f9f9;
  max-width: 400px;
  width: 300px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.access-insights h6 {
  font-size: 16px;
  margin-bottom: 12px;
}

.local-storage-data ul {
  list-style: none;
  padding-left: 0;
}

.access-item {
  background-color: #f7f7f7;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.access-type {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
}

.access-type-third-party i,
.access-type-local i {
  margin-right: 5px;
}

.access-type-third-party {
  color: #d9534f;
  /* Adjust the color to suit your design */
}

.access-type-local {
  color: #5cb85c;
  /* Adjust the color to suit your design */
}

.tab-headers {
  display: flex;
  justify-content: space-around;
  margin: 20px 0px 0px 0px;
  background-color: #008198;
}

.tab-headers button {
  background-color: transparent;
  border: none;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.tab-headers button:hover {
  background-color: #008198;
  color: #f9f9f9;
}

.tab-headers .active-tab {
  background-color: #f2f2f2 !important;
  color: #008198;
}


/* 
.trackers-summary h1, .access-insights h1 {
  font-size: 22px;
  margin: 0 0 15px 0;
  color: #333;
} */
.trackers-summary {
  background: #6c757d0d;
  padding: 12px 6px;
  border-radius: 5px;
  font-size: 12px;
}

.local-storage-data {
  background: #6c757d0d;
  padding: 12px 6px;
  border-radius: 5px;
  font-size: 12px;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

span {
  color: #008198;
  font-weight: 600;
}

/* .local-storage-data {
  background-color: #e8f0fe;
  border: 1px solid #b6d4fe;
  padding: 15px;
  margin-top: 10px;
} */

.local-storage-data h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.local-storage-data ul {
  list-style-type: none;
  padding: 0;
}

.local-storage-data li {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #b6d4fe;
  margin-bottom: 5px;
  border-radius: 6px;
  font-size: 14px;
}

.open-dashboard-container button {
  background-color: #008198;
  color: white;
  padding: 7px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.open-dashboard-container button:hover {
  background-color: #008198;
}

.div-header {
  padding: 10px 0;
  border-bottom: 1px solid gray;
  font-family: 'Orbitron', sans-serif;

}


.open-dashboard {
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
}

circle.circle-progress__circle.circle-progress__line--top.circle-progress__line--filled {
  stroke: #008198 !important;
}

.circle-progress__line--filled {
  stroke: #008198 !important;

}

.scroll-div {
  overflow-y: scroll;
  height: 300px;
}

img {
  width: 17px;
}

.font-12 {
  font-size: 12px;
}</style>


