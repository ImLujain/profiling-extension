<template>
    <div>
     
                <!-- main container -->
                <div class="div-header-primary  color-047488 text-left pl-3">Dashboard</div>
                <!-- profile div-->
                <div id="content" class="mt-3">


                    <!-- The div and row that should hold both the table and chart -->
                    <div class="row mb-4">
                        <div class=" col-lg-6">
                            <div class="div-header color-047488 text-left pl-3 mb-3">Profile</div>

                            <div class=" col-12 col-4">
                                <label for="profileSelect">Select Profile:</label>
                                <select id="profileSelect" class="form-control">
                                    <option value="allProfiles" selected>All Profiles</option>
                                    <option value="profile1">Windows Desktop</option>
                                    <option value="profile2">MacBook Air</option>
                                    <option value="profile3">iPhone X</option>
                                </select>
                            </div>
<div  id="table-info"  >
                            <!-- Combined canvas div -->
                            <div class=" mt-3">
                                <canvas id="topTrackersChart"></canvas>
                            </div>

                            <!-- Table div -->
                            <div>
                                <div class="table-responsive">
                                    <table id="trackerTable" class="table">
                                        <thead>
                                            <tr>
                                                <th>Tracker Domain</th>
                                                <th>Parent Domain</th>
                                                <th>Timestamp</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Table rows will be inserted here dynamically -->
                                        </tbody>
                                    </table>
                                </div>
                                <!-- Pagination for the table -->
                                <nav aria-label="Table pagination" class="custom-pagination">
                                    <ul class="pagination" >
                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="text-center mt-4">
                                <button @click="clearStoredData" id="clearData" class="btn custom-btn-color">Clear Data</button>
                            </div>
                        </div>
                        <div id="no-result"><img src="./../../public/no-result.png" /> No trackers detected.</div>
                    </div>
                     

                        <div id="fingerprint-info" class="col-6 ">
                            <div class="div-header color-047488 text-left pl-3 mb-3 ">Browser Fingerprint</div>
                            <!-- <label for="profileSelect">Your current Profile:</label> -->
                            <div class="row text-left ">
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Platform</div>
                                        <div class="col-9"> <span id="fingerprint-platform"></span> </div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Plugins</div>
                                        <div class="col-9"> <span id="fingerprint-plugins"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">User Agent</div>
                                        <div class="col-9"> <span id="fingerprint-userAgent"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Languages</div>
                                        <div class="col-9"> <span id="fingerprint-languages"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Device Memory</div>
                                        <div class="col-9"> <span id="fingerprint-deviceMemory"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488   border-info-fingerprint-fingerprintright">Battery</div>
                                        <div class="col-9">  <span id="fingerprint-battery"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488   border-info-fingerprint-fingerprintright">Media Devices</div>
                                        <div class="col-9">  <span id="fingerprint-mediaDevices"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488   border-info-fingerprint-fingerprintright">Mime Types</div>
                                        <div class="col-9">  <span id="fingerprint-mimeTypes"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Hardware Concurrency</div>
                                        <div class="col-9">  <span id="fingerprint-hardwareConcurrency"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Screen Resolution</div>
                                        <div class="col-9">   <span id="fingerprint-screenResolution"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488  border-info-fingerprint-fingerprintright ">Timezone Offset</div>
                                        <div class="col-9">   <span id="fingerprint-timezoneOffset"></span></div>
                                    </div>
                                </div>
                                <div class="col-12 br-1 border-info-fingerprint">
                                    <div class="row p-1">
                                        <div class="col-3 pl-3 color-047488   border-info-fingerprint-fingerprintright">Date Time Format</div>
                                        <div class="col-9">   <span id="fingerprint-dateTimeFormat"></span></div>
                                    </div>
                                </div>
                                </div>
                           
                        </div>
                    </div>
                </div>

            </div>

</template>

<script setup>

import { onMounted } from 'vue';
onMounted(() => {
    populateFingerprintInfo();


    const profileSelect = document.getElementById('profileSelect');

    // Set default profile if none is set
    chrome.storage.local.get('selectedProfile', function (data) {
        if (!data.selectedProfile) {
            chrome.storage.local.set({ selectedProfile: 'allProfiles' });
        } else {
            profileSelect.value = data.selectedProfile;
        }
    });
    //event listner for when profile gets changed
    profileSelect.addEventListener('change', function () {
        const selectedProfile = profileSelect.value;
        chrome.storage.local.set({ selectedProfile: selectedProfile }, function () {
            loadTrackersForProfile();
        });
    });
    //for table pagination, it supposed to show 4 profiles 
    document.querySelectorAll('.page-link').forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (index === 0) { // Previous button
                currentPage = Math.max(1, currentPage - 1);
            } else if (index === 4) { // Next button
                currentPage += 1; // You might want to add a check to ensure it doesn't exceed the total number of pages
            } else {
                currentPage = index; // 1-based index
            }

            loadTrackersForProfile(); // Reload the table with the new page
        });
    });

    loadTrackersForProfile();

});

//This function that reads your browser fingerprint to show them 
async function populateFingerprintInfo() {
    document.getElementById('fingerprint-platform').textContent = navigator.platform;
    document.getElementById('fingerprint-plugins').textContent = `${navigator.plugins.length} plugins`;
    document.getElementById('fingerprint-userAgent').textContent = navigator.userAgent || 'Not available';
    document.getElementById('fingerprint-languages').textContent = navigator.languages.join(', ');
    document.getElementById('fingerprint-deviceMemory').textContent = navigator.deviceMemory || 'Not available';
    await populateBatteryInfo(); // Asynchronously populate battery info
    //document.getElementById('fingerprint-connection').textContent = navigator.connection ? JSON.stringify(navigator.connection) : 'Not available';
    document.getElementById('fingerprint-mediaDevices').textContent = navigator.mediaDevices ? 'Accessible' : 'Not accessible';
    document.getElementById('fingerprint-mimeTypes').textContent = `${navigator.mimeTypes.length} mime types`;
    document.getElementById('fingerprint-hardwareConcurrency').textContent = navigator.hardwareConcurrency;
    document.getElementById('fingerprint-screenResolution').textContent = `${screen.width}x${screen.height}`;
    populateTimezoneOffset();
    populateDateTimeFormat();
}

async function populateBatteryInfo() {
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            const batteryLevel = Math.round(battery.level * 100) + '%';
            const chargingStatus = battery.charging ? 'charging' : 'not charging';
            document.getElementById('fingerprint-battery').textContent = `Level: ${batteryLevel}, Status: ${chargingStatus}`;
        } catch (error) {
            document.getElementById('fingerprint-battery').textContent = 'Battery info not accessible';
            console.error('Error accessing battery info:', error);
        }
    } else {
        document.getElementById('fingerprint-battery').textContent = 'Battery API not supported';
    }
}

function populateTimezoneOffset() {
    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const sign = offset > 0 ? "-" : "+";
    document.getElementById('fingerprint-timezoneOffset').textContent = `UTC ${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
}

function populateDateTimeFormat() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTimeFormat = new Intl.DateTimeFormat('default', options).format(new Date());
    document.getElementById('fingerprint-dateTimeFormat').textContent = dateTimeFormat;
}



let topTrackersChartInstance = null;
function loadTrackersForProfile() {
    let selectedProfile = profileSelect.value;
    // Initially hide all charts
    ['profile1', 'profile2', 'profile3'].forEach(profile => {
        const element = document.getElementById(`topTrackersChart`);
        if (element) {
            element.style.display = 'none';
        }
    });
    var profiletest = ['profile1', 'profile2', 'profile3'];

    if (selectedProfile != 'allProfiles') {
        profiletest = [selectedProfile];
    }
    console.log(selectedProfile)

    console.log('profiletest')

    console.log(profiletest)
    // Show only the chart for the selected profile


    profiletest.forEach(profile => {
        chrome.runtime.sendMessage({ action: "getTrackers", profile: profile }, function (response) {
            const tableBody = document.getElementById('trackerTable').querySelector('tbody');
            tableBody.innerHTML = '';

            const trackers = response.trackers[profile] || [];
            console.log(profile)
            console.log(response.trackers[profile])
            if (trackers.length > 0) {
                populateTable(trackers, tableBody);
                displayTopCategoriesChart(trackers, profile);
                profiletest.forEach(profile => {
                    document.getElementById(`topTrackersChart`).style.display = 'block';

                });

                document.getElementById('no-result').style.display = 'none';
                document.getElementById('table-info').style.display = 'block';

            } else {
                document.getElementById('table-info').style.display = 'none';
                document.getElementById('no-result').style.display = 'block';

            }
        });
    })
}

// function loadAllProfiles() {
//     const profiles = ['profile1', 'profile2', 'profile3'];
//     console.log('gggggggggggggggggggggggggggggggggggggggggggg');
//     profiles.forEach(profile => {
//         chrome.runtime.sendMessage({action: "getTrackers", profile: profile}, function(response) {
//             const trackers = response.trackers[profile] || [];
//             console.log(trackers);
//             if (trackers.length > 0) {
//                 console.log('gggggggggggggggggggggggggggggggggggggggggggg');
//                 displayTopCategoriesChart(trackers, profile);
//             }
//         });
//     });

//     // Show all charts
//     ['profile1', 'profile2', 'profile3'].forEach(profile => {
//         document.getElementById(`topTrackersChart-${profile}`).style.display = 'block';
//     });
// }

// // load all tracker for all trackers option
// function loadAllProfiles() {
//     const profiles = ['profile1', 'profile2', 'profile3'];
//     profiles.forEach(profile => {
//         chrome.runtime.sendMessage({action: "getTrackers", profile: profile}, function(response) {
//             const trackers = response.trackers[profile] || [];
//             if (trackers.length > 0) {
//                 displayTopCategoriesChart(trackers, profile);
//             }
//         });
//     });
// }

let currentPage = 1;
const entriesPerPage = 5;

function populateTable(trackers, tableBody) {
    tableBody.innerHTML = '';

    // Determine the start and end index based on the current page
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    const trackersToDisplay = trackers.slice(startIndex, endIndex);

    trackersToDisplay.forEach(trackerInfo => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = trackerInfo.trackerDomain;
        row.insertCell(1).textContent = trackerInfo.parentDomain;
        row.insertCell(2).textContent = trackerInfo.timestamp;
        row.insertCell(3).textContent = trackerInfo.category;
    });
}

function displayTopCategoriesChart(trackers, profile) {
    const categoryCounts = {};

    trackers.forEach(tracker => {
        const category = tracker.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const sortedCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
    const topCategories = sortedCategories.slice(0, 10);
    const topCategoriesCounts = topCategories.map(category => categoryCounts[category]);

    const colors = topCategories.map((_, i) => `hsla(${i * 25}, 70%, 50%, 0.2)`);
    const borderColors = topCategories.map((_, i) => `hsla(${i * 25}, 70%, 50%, 1)`);

    const canvasId = 'topTrackersChart';
    const ctx = document.getElementById(canvasId).getContext('2d');

    if (window[`topTrackersChartInstance`]) {
        window[`topTrackersChartInstance`].destroy();
    }

    const chartTitle = {
        'profile1': 'Profile 1',
        'profile2': 'Profile 2',
        'profile3': 'Profile 3'
    }[profile];

    window[`topTrackersChartInstance`] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topCategories,
            datasets: [{
                label: '# of Times Detected',
                data: topCategoriesCounts,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            title: {
                display: true,
                text: chartTitle,
                fontSize: 16,
                padding: 20
            }
        }
    });
}

function clearStoredData() {
    chrome.storage.local.clear(function () {
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        } else {
            console.log("Stored data has been cleared.");
        }
    });
}

</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.table thead tr {
    background-color: #008198;
    color: #ffffff;
    text-align: left;
}

.table th,
.table td {
    padding: 12px 15px;
}


.table tbody tr {
    border-bottom: 1px solid #dddddd;
}

#dashboard-wrapper-container {
    display: inline-block;
    /* display: inline; */
    width: 9%;
    border: 1px solid red;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

#no-result {
    display: none;
    margin: 3%;
}
.border-info-fingerprint{
    border-bottom: 1px solid #04748833;
    font-size: 14px;
}
.border-info-fingerprint-fingerprintright{
    border-right: 1px solid #04748833;
}
.table tbody tr:last-of-type {
    border-bottom: 2px solid #008198;
}

.table tbody tr.active-row {
    font-weight: bold;
    color: #008198;
}

body {
    font-family: 'Nanum Gothic', sans-serif;
    background-color: #f6f7fb;
}

h1 {
    color: #333;
    border-bottom: 3px solid #6371ef;
    padding-bottom: 0.5rem;
}

canvas {
    width: 100%;
    height: auto;
    max-height: 400px;
    /* Adjust based on your preference */
}

button:hover {
    background-color: #4e5bc4;
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

img {
    width: 50px;
}

#topTrackersChart {
    border-radius: 6px;
    box-shadow: 2px 4px 5px 4px #afa1a1a8;
}


.app {
    display: inline-block;
}

.div-header {
    padding: 10px 0;
    border-bottom: 1px solid #80808033;
}

.cover {
    height: 892px;

}

.color-047488 {
    color: #047488;
}

.div-header-primary{
    padding: 10px 0;
    border-bottom: 1px solid gray;
}

.custom-btn-color {
  background-color: #008198; /* Green background */
  color: white; /* White text */
  border: none; /* No border */
}

.custom-btn-color:hover {
  background-color: #004450; /* Darker green on hover */
}
.custom-pagination .page-item .page-link {
    background-color: #ffffff; /* New background color */
    color: #008198; /* Text color */
    border-color: #008198; /* Border color */
}

.custom-pagination .page-item .page-link:hover {
    background-color: #0c879d;
    border-color: #008198;
}
</style>

