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
        <div v-if="localStorageData" class="local-storage-data">
          <h2>Local Storage Data:</h2>
          <ul>
            <li v-for="(item, index) in parsedLocalStorageData" :key="index">{{ item }}</li>
          </ul>
        </div>
        <p v-else>No data found for this domain.</p>
      </div>
    </div>
    <div class="open-dashboard-container">
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
let localStorageData = ref<string | null>(null);

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
      chrome.runtime.sendMessage({ action: "getTrackers" }, function (response) {
        if (response && response.trackers) {
          totalCount.value = response.trackers.length;
          uniqueParentDomains.value = response.uniqueDomainsCount;
          uniqueTrackers.value = response.uniqueTrackersCount;
        } else {
          console.error("No tracker data received.");
        }
      });
    }
});

const openDashboard = () => {
  chrome.tabs.create({url: 'dashboard.html'});
};

// Computed property to parse the local storage data into an array
const parsedLocalStorageData = computed(() => {
  if (localStorageData.value) {
    try {
      return JSON.parse(localStorageData.value);
    } catch (e) {
      return [localStorageData.value]; // If not JSON, return as single item array
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
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
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
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.tab-headers {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #007BFF;
  border-radius: 8px;
}

.tab-headers button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  transition: background-color 0.3s, color 0.3s;
}

.tab-headers button:hover {
  background-color: #0056b3;
  color: #f9f9f9;
}

.tab-headers .active-tab {
  background-color: white;
  color: #007BFF;
  border-radius: 8px;
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

.local-storage-data {
  background-color: #e8f0fe;
  border: 1px solid #b6d4fe;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.open-dashboard-container button:hover {
  background-color: #0056b3;
}
</style>


