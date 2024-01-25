<template>
    <head>
        <title>Dashboard</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <!-- <script src="chart.js"></script> -->
    </head>
    <body>
        <!-- main container -->
        <div class="container mt-5"> 
            <h1 class="text-center mb-4">Detected Trackers</h1>
            <!-- profile div-->
            <div class="mb-4">
                <label for="profileSelect">Select Profile:</label>
                <select id="profileSelect" class="form-control">
                    <option value="allProfiles">All Profiles</option>
                    <option value="profile1">Profile 1</option>
                    <option value="profile2">Profile 2</option>
                    <option value="profile3">Profile 3</option>
                </select>
            </div>
    <!-- the div and row that should hold both table an chart -->
    <div class="row mb-4">
    <!-- canvas div-->       
    <div class="col-lg-6">
        <canvas id="topTrackersChart-profile1"></canvas>
    </div>
    <div class="col-lg-6">
        <canvas id="topTrackersChart-profile2"></canvas>
    </div>
    <div class="col-lg-6">
        <canvas id="topTrackersChart-profile3"></canvas>
    </div>
    <!-- table div-->
    <div class="col-lg-6">
    <div class="table-responsive">
        <table id="trackerTable" class="table table-striped">
            <thead>
                <tr>
                    <th>Tracker Domain</th>
                    <th>Parent Domain</th>
                    <th>Timestamp</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here by the populateTable function -->
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

</div>
            <div class="text-center mt-4">
                <button @click="clearStoredData" id="clearData" class="btn btn-primary">Clear Data</button>
            </div>
        </div>
    </body>
</template>


<script setup>

import { onMounted } from 'vue';

onMounted(() => {

    const profileSelect = document.getElementById('profileSelect');
    
    // Set default profile if none is set
    chrome.storage.local.get('selectedProfile', function(data) {
        if (!data.selectedProfile) {
            chrome.storage.local.set({ selectedProfile: 'allProfiles' });
        } else {
            profileSelect.value = data.selectedProfile;
        }
    });
    //event listner for when profile gets changed
    profileSelect.addEventListener('change', function() {
        const selectedProfile = profileSelect.value;
        chrome.storage.local.set({ selectedProfile: selectedProfile }, function() {
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
    const selectedProfile = profileSelect.value;

    // Initially hide all charts
    ['profile1', 'profile2', 'profile3'].forEach(profile => {
        const element = document.getElementById(`topTrackersChart-${profile}`);
        if (element) {
            element.style.display = 'none';
        }
    });

    if (selectedProfile === 'allProfiles') {
        loadAllProfiles();
        return;
    }

    // Show only the chart for the selected profile
    const selectedElement = document.getElementById(`topTrackersChart-${selectedProfile}`);
    if (selectedElement) {
        selectedElement.style.display = 'block';
    }

    chrome.runtime.sendMessage({action: "getTrackers", profile: selectedProfile}, function(response) {
        const tableBody = document.getElementById('trackerTable').querySelector('tbody');
        tableBody.innerHTML = '';

        const trackers = response.trackers[selectedProfile] || [];
        if (trackers.length > 0) {
            populateTable(trackers, tableBody);
            displayTopCategoriesChart(trackers, selectedProfile);
        } else {
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = "No trackers detected.";
            cell.colSpan = 4;
        }
    });
}




function loadAllProfiles() {
    const profiles = ['profile1', 'profile2', 'profile3'];
    profiles.forEach(profile => {
        chrome.runtime.sendMessage({action: "getTrackers", profile: profile}, function(response) {
            const trackers = response.trackers[profile] || [];
            if (trackers.length > 0) {
                displayTopCategoriesChart(trackers, profile);
            }
        });
    });

    // Show all charts
    ['profile1', 'profile2', 'profile3'].forEach(profile => {
        document.getElementById(`topTrackersChart-${profile}`).style.display = 'block';
    });
}



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

    const canvasId = profile ? `topTrackersChart-${profile}` : 'topTrackersChart';
    const ctx = document.getElementById(canvasId).getContext('2d');

    if (window[`topTrackersChartInstance_${profile}`]) {
        window[`topTrackersChartInstance_${profile}`].destroy();
    }

    const chartTitle = {
        'profile1': 'Profile 1',
        'profile2': 'Profile 2',
        'profile3': 'Profile 3'
    }[profile];

    window[`topTrackersChartInstance_${profile}`] = new Chart(ctx, {
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
    chrome.storage.local.clear(function() {
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
body {
    font-family: 'Arial', sans-serif;
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
    max-height: 400px; /* Adjust based on your preference */
}

button:hover {
    background-color: #4e5bc4;
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.table-responsive {
    overflow-x: initial;
}


</style>

