function createButtonGridArray(n=n){
    let indices = [];  // creating the grid array
    for(var i = 0; i < n; i++){
        let row = [];
        for(var j = 0; j < n; j++){
            row.push(0); // marking each index as 0 initally
        } indices.push(row); // pushing each row into grid
    } return indices;
}

function setStart(n=n){
    let elemID = window.event.target.id;
    let data = elemID.split("$");
    row = parseInt(data[0]);
    column = parseInt(data[1]);
    grid = createButtonGridArray(n);
    grid[row][column] = "S";
    for(var i = 0 ; i < grid.length; i++){
        for(var j = 0; j < grid.length; j++){
            if(grid[i][j] == "S"){
                document.getElementById(i.toString() + "$" + j.toString()).style["background-color"] = "red";
            }else{
                document.getElementById(i.toString() + "$" + j.toString()).style["background-color"] = "white";
            }
        }
    }
    return;
}
function start(n=n){
    let mainDiv = document.getElementById("main");
    let parent = document.createElement("div");
    for(var i = 0; i < n; i++){
        let childDiv = document.createElement("div");
        for(var j = 0; j < n; j++){
            btnId = (i.toString() + "$" + j.toString()).toString();
            childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' onclick="setStart(n=n)" </button>'
        }parent.append(childDiv);
    }mainDiv.append(parent);
    mainDiv.innerHTML += "<br>"
    mainDiv.innerHTML += "<button class='continue' onclick='checkIfStartPointExists(n=n)'> Continue -> </button>"
}



function setFinish(){
    let elemID = window.event.target.id;
    let data = elemID.split("$");
    row = parseInt(data[0]);
    column = parseInt(data[1]);
    if(grid[row][column] == "S"){
        alert("Start Cannot be Finish Point! Please change Finish point!");
    } else{
        for(var i = 0 ; i < grid.length; i++){
            for(var j = 0; j < grid.length; j++){
                if(grid[i][j] == "F"){
                    grid[i][j] = 0;
                }
            }
        }
        grid[row][column] = "F";
        for(var i = 0 ; i < grid.length; i++){
            for(var j = 0; j < grid.length; j++){
                if(grid[i][j] == "S"){
                    document.getElementById(i.toString() + "$" + j.toString()).style["background-color"] = "red";
                }else if(grid[i][j] == "F"){
                    document.getElementById(i.toString() + "$" + j.toString()).style["background-color"] = "blue";
                }else{
                    document.getElementById(i.toString() + "$" + j.toString()).style["background-color"] = "white";
                }
            }
        }
    }
    return;
}
function checkIfStartPointExists(n){
    let counter = 0;
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid.length; j++){
            if(grid[i][j] == "S"){
                counter += 1;
            }
        }
    }
    if(counter != 1){
        alert("Please add a starting point!");
    }else{
        document.getElementById("instructions").innerHTML = "Select A Finishing Point (End Node)";
        finish(n);
    }
}
function finish(n=n){
    let mainDiv = document.getElementById("main");
    mainDiv.innerHTML = "";
    let parent = document.createElement("div");
    for(var i = 0; i < n; i++){
        let childDiv = document.createElement("div");
        for(var j = 0; j < n; j++){
            btnId = (i.toString() + "$" + j.toString()).toString();
            if(grid[i][j] != "S"){
                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' onclick="setFinish()" </button>'
            }else{
                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: red;" onclick="setFinish()" </button>'
            }
            
        }parent.append(childDiv);
    }mainDiv.append(parent);
    mainDiv.innerHTML += "<br>"
    mainDiv.innerHTML += "<button class='continue' onclick='checkIfEndPointExists(n=n)'> Continue -> </button>"
}

function checkIfEndPointExists(n){
    let counter = 0;
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid.length; j++){
            if(grid[i][j] == "F"){
                counter += 1;
            }
        }
    }
    if(counter != 1){
        alert("Please add a Ending point!");
    }else{
        document.getElementById("instructions").innerHTML = "Create Walls Between Start And End Node";
        main(n);
    }
}
function showButtonGrid(n=n){
    let grid = document.getElementById("btnGrid");
    let parent = document.createElement("div");
    for(var i = 0; i < n; i++){
        let childDiv = document.createElement("div");
        for(var j = 0; j < n; j++){
            btnId = (i.toString() + "$" + j.toString()).toString();
            childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' onclick="extractRowAndColumnID()" </button>'
        }parent.append(childDiv);
    }grid.append(parent);
}
function extractRowAndColumnID(){
    let elemID = window.event.target.id;
    let data = elemID.split("$");
    row = parseInt(data[0]);
    column = parseInt(data[1]);
    let clsLis = document.getElementById(elemID).classList
    if(grid[row][column] == "S" || grid[row][column] == "F"){
        alert("Start And Finish positions cannot be overwritten! Please choose a separate point!")
    } else{
        for(var j = 0; j < clsLis.length; j ++){
            if(clsLis[j] == "fillEmpty"){
                document.getElementById(elemID).classList.remove("fillEmpty");
                document.getElementById(elemID).classList.add("fillFilled");
                grid[row][column] = 1;
                break
            } else if(clsLis[j] == "fillFilled"){
                document.getElementById(elemID).classList.remove("fillFilled");
                document.getElementById(elemID).classList.add("fillEmpty");
                grid[row][column] = 0;
                break
            }
        }
    }
}
function main(n=n){
    let mainDiv = document.getElementById("main");
    mainDiv.innerHTML = "";
    let parent = document.createElement("div");
    for(var i = 0; i < n; i++){
        let childDiv = document.createElement("div");
        for(var j = 0; j < n; j++){
            btnId = (i.toString() + "$" + j.toString()).toString();
            if(grid[i][j] == "S"){
                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: red;" onclick="extractRowAndColumnID()" </button>'
            }else if(grid[i][j] == "F"){
                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: blue;" onclick="extractRowAndColumnID()" </button>'
            }else{
                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' onclick="extractRowAndColumnID()" </button>'
            }
        }parent.append(childDiv);
    }mainDiv.append(parent);
    mainDiv.innerHTML += '<br><button id="a_star" class="continue" onclick="formatArrayForPython(n=n)">get array!</button>'
}


function formatArrayForPython(n=n){
    let maze = "";
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid.length; j++){
            maze = maze + grid[i][j];
        }maze = maze + "\n"
    }
    $('#a_star').click(function(){
        $.ajax({
            type: "POST",
            url: "/",
            data: {
                "maze":maze
            },
            dataType: "json",
            success: function(data){
                if(data["state"] == true){
                    var path = data["path"];
                    for(var i = 0; i < grid.length; i++){
                        for(var j = 0; j< grid.length; j++){
                            for(index = 0; index < path.length; index++){
                                if (path[index][0] == i && path[index][1] == j){
                                    if(grid[i][j] != "S" && grid[i][j] != "F"){
                                        grid[i][j] = "*";
                                    }
                                }
                            }
                        }
                    }
                    let mainDiv = document.getElementById("main");
                    mainDiv.innerHTML = "";
                    let parent = document.createElement("div");
                    for(var i = 0; i < n; i++){
                        let childDiv = document.createElement("div");
                        for(var j = 0; j < n; j++){
                            btnId = (i.toString() + "$" + j.toString()).toString();
                            if(grid[i][j] == "S"){
                                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: red;" </button>'
                            }else if(grid[i][j] == "F"){
                                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: blue;" </button>'
                            }else if(grid[i][j] == "*"){
                                childDiv.innerHTML += '<button class="btn fillEmpty animate" id='+btnId+' style="background-color: yellow;" </button>'
                            }else if(grid[i][j] == "1"){
                                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+' style="background-color: rgb(100, 227, 100);" </button>'
                            }else{
                                childDiv.innerHTML += '<button class="btn fillEmpty" id='+btnId+'  </button>'    
                            }
                        }parent.append(childDiv);
                    }mainDiv.append(parent);
                    document.getElementById("instructions").innerHTML = "The Solution Is As Follows";
                    document.getElementById("reloadBtn").style["visibility"] = "visible";
                } else{
                    alert("No solution Exists!");
                    document.getElementById("reloadBtn").style["visibility"] = "visible";
                    document.getElementById("a_star").remove();
                }
                
            }
        });
    });   
}
var n;
var grid;
function getMazeSize(m){
    n = m;
    grid = createButtonGridArray(n);
    start(n);
    document.getElementById("instructions").style["visibility"] = "visible";
    document.getElementById("drpBtn").remove();
}
