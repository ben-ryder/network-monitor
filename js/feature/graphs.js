
// Setting behaviour of filter forms submission.
document.querySelector("#filterForm").addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter.id === "filterReset"){
        setDefaultFilters();
        setupPage();
        return true;
    }
    else if (e.submitter.id === "filterSubmit"){
        let filterValues = {
            startDate: document.querySelector("#startDate").value,
            startTime: document.querySelector("#startTime").value,
            endDate: document.querySelector("#endDate").value,
            endTime: document.querySelector("#endTime").value,
        }
        setupPage(filterValues);
    }
    return true;
})


function setupGraphs(tests){
    let layout = {
        title: {
            text: '<b>Internet Speeds (Mbps)</b>',
            font: {
                family: 'Muli',
                size: 20,
                color: "#000"
            }
        },
        showlegend: true,
        legend: {
            "orientation": "h",
            y: -0.2,
        },

    }

    let config = {
        responsive: true,
        displayModeBar: false,
        displaylogo: false
    }

    let downloadTrace = {
        x: [],  // Time of Day
        y: [], // Download Speed
        mode: 'lines',
        name: 'Download',
        line: {
            color: 'rgb(0, 0, 255)',
            width: 1.3
        }
    }

    let uploadTrace = {
        x: [],  // Time of Day
        y: [], // Upload Speed
        mode: 'lines',
        name: 'Upload',
        line: {
            color: 'rgb(225, 145, 65)',
            width: 1.2
        }
    }

    for (let i = 0; i < tests.length; i++){
        let test = tests[i];
        let timestamp = test.test_date + " " + test.test_time
        downloadTrace.x.push(timestamp);
        downloadTrace.y.push(test.download_speed);

        uploadTrace.x.push(timestamp);
        uploadTrace.y.push(test.upload_speed);

    }

    Plotly.newPlot('testGraph', [downloadTrace, uploadTrace], layout, config);

}


function addTestToList(test){
    let testInnerTemplate = `
        <div class="test__field-group test__field-group--timestamp">
            <p class="test__field test__field--date">${test.test_date}</p>
            <p class="test__field test__field--time">${test.test_time}</p>
        </div>
        <p class="test__field test__field--ping">${test.ping_speed}</p>
        <p class="test__field test__field--download">${test.download_speed}</p>
        <p class="test__field test__field--upload">${test.upload_speed}</p>
    `
    let testWrapper = document.createElement("div");
    testWrapper.className = "test";
    testWrapper.innerHTML = testInnerTemplate;

    document.querySelector(".test-list").prepend(testWrapper);
}
function setupList(tests){
    tests.forEach((test) => {
        addTestToList(test);
    });
}


function setupTestDisplays(tests){
    setupGraphs(tests);
    setupList(tests);
}


function setDefaultFilters(){
    let date = new Date();
    let currentDateString = date.toISOString().slice(0, 10);

    document.querySelector("#startDate").value = currentDateString;
    document.querySelector("#startTime").value = "00:00";
    document.querySelector("#endDate").value = currentDateString;
    document.querySelector("#endTime").value = "23:59";
}


function setupPage(filterValues=null){
    // Get Tests and call the main test setup
    let url = "/api/get-tests";

    // Adding filter values to query parameters if their present.
    if (filterValues !== null){
        let queryParameters = `startDate=${filterValues.startDate}&startTime=${filterValues.startTime}&endDate=${filterValues.endDate}&endTime=${filterValues.endTime}`;
        url = url + "?" + queryParameters
    }

    let testListRequest = new XMLHttpRequest();
    testListRequest.open("GET", url, true);
    testListRequest.onload = function () {
        if (testListRequest.readyState == 4 && testListRequest.status == 200) {
            setupTestDisplays(JSON.parse(testListRequest.responseText));
        }
    }
    testListRequest.send();
}


window.onload = function(){
    setupPage();

    // Set default filter values
    setDefaultFilters();
}