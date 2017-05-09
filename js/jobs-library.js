const BASE_URL = "http://cobra5d.com/yaats";

// on document ready
$(document).ready(function() {
    setJobsTable();
});

// creates a HTML table filled with jobs from API and fires an event
function setJobsTable() {
    $.get(BASE_URL + "/user/jobs/display", function(data, status){
        // jobs array from json
        var jobs = data.jobs;

        // create a HTML jobs table
        var table = `
        <div class='panel'>
            <table class='table table-hover table-jobs'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>`;
                
                for(var i=0 ; i<jobs.length ; i++){
                    table += `
                    <tr class='jobs-table-row' id='${jobs[i]._id}' onclick='showJobDetails(this.id)'>
                        <td class="col-md-4"> ${jobs[i].title}</td>
                        <td class="col-md-1">${jobs[i].location}</td>
                        <td class="col-md-1">${jobs[i].posted}</td>
                    </tr>`;
                }
                table +=
                `</tbody>
            </table>
        </div>
        
        <style>
            .jobs-table-row:hover { cursor:pointer; }
        </style>
        `;

        // fire setJobsTable event and pass HTML table in argument
        $(document).triggerHandler('setJobsTable:data-received', [table]);
        document.getElementById("jobs-table").innerHTML = table;
    });
}

// setJobsTable event handler
$(document).on('setJobsTable:data-received', function(event, data) {
    // add HTML jobs table to div with id=jobs-table
    document.getElementById("jobs-table").innerHTML = data;
});

// opens a new tab with job details on jobs table row click
function showJobDetails(jobId){ 
    var win = window.open("js/job.html?id=" + jobId, '_blank');
    win.focus();
}