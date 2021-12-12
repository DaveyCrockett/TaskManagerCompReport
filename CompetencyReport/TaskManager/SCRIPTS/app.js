var important = false;
var fromVisible = true;
var icon;


function togglePriority() {
    console.log("Clicked!");

    if(important == true){
        icon.removeClass("fas").addClass("far");
        important = false;
    }else{
        icon.removeClass("far").addClass("fas");//No gain in performance though
        important = true;
    }
    
}

function toggleForm() {
    if(fromVisible){
        $(".section-form").hide();
        fromVisible = false;
    }else{
        $(".section-form").show();
        fromVisible = true;
    }
}

function fetchTasksFromServer() {
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        type: "GET",
        success: function(dataString){

            // parse json string to js object
            let allTasks = JSON.parse(dataString);
            let taskCount = 0;
            for(let i = 0; i< allTasks.length; i++){
                let task = allTasks[i];

                if(task.name === "David Paredes"){
                    displayTask(task);
                    taskCount += 1;
                }
            }
            $("#taskNum").text(taskCount);
        },
        error: function(err){
            console.log("Error getting data", err);
        }
    });
}


function saveTask() {
    console.log("Saved Task!");

    let title = $("#txtTitle").val();
    let dueDate = $("#txtDate").val();
    let description = $("#txtDescription").val();
    let status = $("#selStatus").val();
    let color = $("#selColor").val();
    let category = $("#selCategory").val();

    let theTask = new Task(important, title, dueDate, description, status, category, color);
    let stringData = JSON.stringify(theTask);

    console.log(theTask);
    console.log(stringData);
    // send the object to the server
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        type: "POST",
        data: stringData,
        contentType: "application/json",
        success: function(res){
            console.log("Server says: ", res);
            displayTask(theTask);
            clearForm();
        },
        error: function(err) {
            console.log("Error saving task", err);
            //todo: show an error to the user
        }
    });
}

function clearForm() {
    $("#txtTitle").val("");
    $("#txtDate").val("");
    $("#txtDescription").val("");
    $("#selStatus").val("");
    $("#selColor").val("");
    $("#selCategory").val("");
}

function displayTask(task){
    let syntax = `<div class="task">
        <i class="far fa-star"></i>

        <div class="info">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="details">
            <label class="status">${task.status}</label>
            <label class="category">${task.category}</label>
        </div>
    </div>`;

    $(".task-list").append(syntax);
}

function testHttpRequest(){
    $.ajax({
        url: 'https://restclass.azurewebsites.net/api/test',
        type: 'GET',
        success: function(response) {
            console.log("Server says: ", response);
        },
        error: function(err) {
            console.log("Error on request", err);
        }
    });
}

function init(){
    console.log("Task Manager!!");
    icon = $("#iPriority");
    //Hook events
    icon.click(togglePriority);
    $("#btnShowDetails").click(toggleForm);
    $("#saveTask").click(saveTask);
    // load data
   fetchTasksFromServer();
}

window.onload=init;

// button that hides and shows register task