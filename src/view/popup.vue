<template>
  <div id="popup-container">
    <!-- Tab Headers -->
    <div class="tab-headers">
      <button :class="{'active-tab': currentTab === 'accesses'}" @click="currentTab = 'accesses'">Access Insights</button>
      <button :class="{'active-tab': currentTab === 'trackers'}" @click="currentTab = 'trackers'">Trackers Summary</button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content">
      <!-- Trackers Summary Tab -->
      <div v-if="currentTab === 'trackers'" class="trackers-summary">
        <h1>Trackers Summary</h1>
        <p><strong>Total Trackers Detected:</strong> <span>{{ totalCount }}</span></p>
        <p><strong>Unique Trackers:</strong> <span>{{ uniqueTrackers }}</span></p>
        <p><strong>Unique Parent Domains:</strong> <span>{{ uniqueParentDomains }}</span></p>
        <CircleProgressBar :value="uniqueTrackersCount" :max="uniqueTrackersCount">{{ uniqueTrackersCount }}</CircleProgressBar>
      </div>

      <!-- Access Insights Tab -->
      <div v-if="currentTab === 'accesses'" class="access-insights">
        <h1>Access Insights</h1>
        <p><strong>ToAccessed Attributes:</strong> <span>{{ accessData }}</span></p>
        <!-- TODO: Implement Prop Access Insights  here -->
      </div>
    </div>
    <div class="open-dashboard-container">
      <button @click="openDashboard">Open Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleProgressBar from './CircleProgressBar.vue';
import { ref, watch } from "vue";

const currentTab = ref('trackers');
const uniqueTrackersCount = ref(0);
const totalCount = ref(0);
const uniqueTrackers = ref(0);
const uniqueParentDomains = ref(0);
let accessData = ref([]);

// Function to fetch data from local storage
const fetchData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length && tabs[0].url) {
            try {
                const currentDomain = new URL(tabs[0].url).hostname;
                const localStorageKey = `accessedProperties_${currentDomain}`;
                console.log(`local storage key:`, localStorageKey)
                const storedData = localStorage.getItem(localStorageKey);

                if (storedData !== null) {
                    const accessedProperties = JSON.parse(storedData);
                    accessData.value = accessedProperties;
                } else {
                    console.log("No data found in local storage for the current domain ", currentDomain);
                    accessData.value = [];
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error parsing URL: ", error.message);
                } else {
                    console.error("An unknown error occurred");
                }
            }
        }
    });
};

// Watcher to fetch data whenever the current tab changes to 'accesses'
watch(currentTab, (newTab) => {
    if (newTab === 'accesses') {
        fetchData();
    }
});



// Send a message to the background script to get trackers
chrome.runtime.sendMessage({ action: "getTrackers" }, function (response) {
    // Log the received response for debugging
    console.log("Received response from background:", response);

    // Check if response and response.trackers exist and are arrays
    if (response && response.trackers) {
      // Update the total count
      totalCount.value = response.trackers.length;
      uniqueParentDomains.value = response.uniqueDomainsCount;
      uniqueTrackers.value = response.uniqueTrackersCount;

    } else {
      // If the data is not in the expected format, log an error message
      console.log("Tracker data is not in the expected format or not available.");
    }
  });



  // Fetch Unique Trackers Count
  chrome.storage.local.get(['uniqueTrackersCount'], (data) => {
    uniqueTrackersCount.value = data.uniqueTrackersCount || 0;
  });

  // TODO: Fetch data for Access Insights


const openDashboard = () =>{
  chrome.tabs.create({url: 'dashboard.html'});
}
</script>

<style scoped>
#popup-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #4a4a4a;
  background-color: #f9f9f9;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tab-headers {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-headers button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #007BFF;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s;
}

.tab-headers .active-tab {
  border-bottom: 3px solid #007BFF;
  font-weight: 600;
}

.tab-content {
  padding: 10px 0;
}

.trackers-summary h1, .access-insights h1 {
  font-size: 22px;
  margin: 0 0 15px 0;
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

span {
  color: #007BFF;
  font-weight: 600;
}

/* Add more styles as needed */
</style>
