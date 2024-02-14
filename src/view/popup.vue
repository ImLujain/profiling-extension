<template>
  <div id="popup-container">
    <!-- Tab Headers -->
    <div class="div-header text-center">Detected Trackers</div>
    <div class="tab-headers">
      <button :class="{'active-tab': currentTab === 'accesses'}" @click="currentTab = 'accesses'">Access Insights</button>
      <button :class="{'active-tab': currentTab === 'trackers'}" @click="currentTab = 'trackers'">Trackers Summary</button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content">
      <!-- Trackers Summary Tab -->
      <div v-if="currentTab === 'trackers'" class="trackers-summary">
        <!-- <h1>Trackers Summary</h1> -->
        <!-- <p><strong>Total Trackers Detected:</strong> <span>{{ totalCount }}</span></p> -->
        <div class="row">
          <div class="col-12 mt-3 mb-3">
            <CircleProgressBar :value="uniqueTrackersCount" :max="uniqueTrackersCount">{{ uniqueTrackersCount }}</CircleProgressBar>

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
    <div v-if="localStorageData && localStorageData.value !== 'No data found for this key.'" class="local-storage-data">
      <h6>Local Storage Data:</h6>
      <ul>
        <li v-for="(item, index) in parsedLocalStorageData" :key="index">
          {{ item.property }} - Accessed by: 
          <span v-if="item.isThirdParty.includes(true) && item.isThirdParty.includes(false)">Both 3rd Party and Local</span>
          <span v-else-if="item.isThirdParty.includes(true)">3rd Party</span>
          <span v-else>Local</span>
        </li>
      </ul>
    </div>
    <p v-else>No data found for this domain.</p>
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
  chrome.tabs.create({url: 'dashboard.html'});
};

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

/* High Privacy Concern - Red */
.local-storage-data li.highlight-red {
  background-color: rgba(236, 80, 69, 0.5);; /* Red with opacity */
}

/* Medium Privacy Concern - Orange */
.local-storage-data li.highlight-orange {
  background-color: rgba(255, 165, 69, 0.5); /* Orange with opacity */
}

/* Lower Privacy Concern - Yellow */
.local-storage-data li.highlight-yellow {
  background-color: rgba(255, 255, 70, 0.5); /* Yellow with opacity */
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
  width: 262px;
  padding:15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.tab-headers {
  display: flex;
  justify-content: space-around;
  margin: 20px 0px 0px 0px;
  background-color: #007BFF;
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
  background-color: #0056b3;
  color: #f9f9f9;
}

.tab-headers .active-tab {
  background-color: #f2f2f2 !important;
  color: #007BFF;
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
.local-storage-data{
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
  color: #007BFF;
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
  background-color: #007BFF;
  color: white;
  padding: 7px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.open-dashboard-container button:hover {
  background-color: #0056b3;
}

.div-header {
    padding: 10px 0;
    border-bottom: 1px solid gray;
    font-family: 'Orbitron', sans-serif;

}


.open-dashboard{
  text-align: center;
    margin-top: 20px;
    font-size: 11px;
}

circle.circle-progress__circle.circle-progress__line--top.circle-progress__line--filled {
    stroke: #027bff !important;
}
.circle-progress__line--filled{
  stroke: #027bff !important;

}
</style>


