<template>
    <div>
        <div class="row cover">
            <div id="sidbar" class="col-2 ">
                <div class="div-header text-center">Detected Trackers</div>
                <ul>
                    <li> <img src="./../../public/dashboard.png" />
                        <p>Dashboar</p>
                    </li>
                    <li><img src="./../../public/about.png" />
                        <p>About us </p>
                    </li>
                </ul>
            </div>

            <div class="col-9 ">
                <!-- main container -->
                <div class="div-header  color-047488 text-left pl-3">Dashboard</div>
                <!-- profile div-->
                <div id="content" class="mt-3">
                    <div class=" row col-4">
                        <label for="profileSelect">Select Profile:</label>
                        <select id="profileSelect" class="form-control">
                            <option value="allProfiles" selected>All Profiles</option>
                            <option value="profile1">Windows Desktop</option>
                            <option value="profile2">MacBook Air</option>
                            <option value="profile3">iPhone X</option>
                        </select>
                    </div>

                    <!-- The div and row that should hold both the table and chart -->
                    <div class="row mb-4">
                        <div id="table-info">

                            <!-- Combined canvas div -->
                            <div class="col-lg-12 mt-3">
                                <canvas id="topTrackersChart"></canvas>
                            </div>

                            <!-- Table div -->
                            <div class="col-lg-12">
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
                                <nav aria-label="Table pagination">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="text-center mt-4">
                                <button @click="clearStoredData" id="clearData" class="btn btn-primary">Clear Data</button>
                            </div>
                        </div>
                        <div id="no-result"><img src="./../../public/no-result.png" /> No trackers detected.</div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
onMounted(() => {


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


#sidbar {
    display: inline-block;
    background: #f1f1f1;
}

#sidbar .div-header {
    font-family: 'Orbitron', sans-serif;
}

/* display: inline; */


#sidbar li {
    list-style: none;
    padding: 8px;

}

#sidbar ul {
    padding: 0px;
    text-align: center;
}

.color-047488 {
    color: #047488;
}

#sidbar img {
    width: 23px;
}

#sidbar p {
    padding-left: 6px;
    display: inline-block;
    margin: 2px;
}

#sidbar li:hover {
    color: #047488;
}

.app {
    display: inline-block;
}

.div-header {
    padding: 10px 0;
    border-bottom: 1px solid gray;
}

.cover {
    height: 892px;

}
</style>

