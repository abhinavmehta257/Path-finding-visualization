canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


window.onload = function()
{var value_slider = document.querySelector('.volume_slider');
 
 const changeBgTo = color => (value_slider.style.background = color);

value_slider.addEventListener('input',function(){
   var valueh1 = value_slider.value;

    
    
    if(valueh1 < 350) 
        changeBgTo('#2cff7d');
    else if(valueh1 >=350 && valueh1 <650) 
        changeBgTo('#C6FF2C');
    else if(valueh1 >=550 && valueh1 <800) 
        changeBgTo('#FFAE2C');
    else changeBgTo('#FF2C2C');
}) ;                          
  
 value_slider.addEventListener('change',function(){
         numberOfObstacle = value_slider.value;
     console.log(numberOfObstacle);
   
     //making obstacles
for(var i = 0; i<numberOfObstacle; i++){
    var colss = Math.floor(Math.random()*rows);
    var rowss = Math.floor(Math.random()*cols);
    var obs = grid[colss][rowss];
    if(obs != start && obs !=end )
    {obs.isObstacle = true;
    obstacles.push(obs);}
}
    //printing obstacles
for(var i=0; i<obstacles.length; i++){
    obstacles[i].show("#000000");
}

console.log(obstacles);
 })
}




var numberOfObstacle;

console.log(canvas.height);
console.log(canvas.width);
function removeFromArray(arr, elt){
    
    for(var i= arr.length-1; i>=0; i--){
        if(arr[i]==elt){
            arr.splice(i,1)
            
        }
    }
    
}

function heuristic(x, y){
    var distance = Math.sqrt(Math.pow((x.i-y.i),2)+Math.pow((x.j-y.j),2));
    
    return distance;
}


var rows =77;
var cols =30;
var cellWidth =20;
var cellHeight =20;

console.log("cols "+cols);
console.log("rows "+rows);

var grid = new Array(rows);

var openSet = new Array;
var closeSet = new Array;
var start;
var end;
var path = new Array;
var offset = 60;
var current;
var destinationSet = false;
for(i = 0; i<rows; i++){
    grid[i] = new Array(cols);
}

//adding click listener to all the boxes
window.addEventListener('click', function(e){
    if (destinationSet == false ) {
        for(var i=0; i < rows; i++)
            for(var j=0; j < cols; j++){
                grid[i][j].clicked(e);
            }

        for(var i=0; i < rows; i++)
            for(var j=0; j < cols; j++){
                if(grid[i][j].isDestination == true)
                {
                    end = grid[i][j];
                }
            }
    }
    
    
})

function spot(i, j){
    this.i = i;
    this.j = j;
    this.g  = 0;
    this.h = 0;
    this.f = 0;
    this.isDestination = false;
    this.isObstacle = false;
    var x = i*cellHeight;
    var y = j*cellWidth;
    
    this.show = function(color){
        ctx.fillStyle = color;
        ctx.fillRect(i*cellHeight , j*cellWidth , cellHeight-1, cellWidth-1);
    } 
    
    this.clicked = function(e){
        if(e.x>x && e.x<x+cellWidth-1 && e.y-offset>y && e.y-offset<y+cellWidth-1 && this.isObstacle == false){
            this.isDestination=true;
            this.show("#802f78");
            destinationSet = true;
            console.log("destination set");
        }
    }
    
    this.neighbour = new Array;
    this.previous = undefined;
    
    this.addNeighbour = function(grid){
        var i = this.i;
        var j = this.j;
       if(i>0){
        this.neighbour.push(grid[i-1][j]);
    }
    if(j>0){
        this.neighbour.push(grid[i][j-1]);
    }
    if(i<rows-1){
        this.neighbour.push(grid[i+1][j]);
    }
    if(j<cols-1){
        this.neighbour.push(grid[i][j+1]);
    } 
    }
 
}


var obstacles = new Array;

//assigning class to each block
for(var i=0; i < rows; i++)
    for(var j=0; j < cols; j++){
        grid[i][j] = new spot(i,j);
    }

//making starting and ending point
start = grid[37][17];


//adding neighbour
for(var i=0; i < rows; i++)
    for(var j=0; j < cols; j++){
        grid[i][j].addNeighbour(grid);
    }






console.log(end);

openSet.push(start);
console.log(openSet.length);

winner = 0;
//printind grid

for(var i=0; i < rows; i++)
    for(var j=0; j < cols; j++){
        grid[i][j].show("#3c72d6");
        
    }
start.show("#fff959");




var destinationFound = false;


//path finding function

function pathFinding(){
    
    if (openSet.length>0 && destinationFound != true) {
        for(var i=0; i< openSet.length-1; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
               
            }
        }
        
        
        current = openSet[winner];

        if(current.isDestination ==true){

            var temp = current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            
            destinationFound = true;
            
            console.log("destnation found");
    
        }
        closeSet.push(current);

        removeFromArray(openSet,current);
        var neighbours = current.neighbour;

       

        for(var i =0;i < neighbours.length; i++){
            var neighbour = neighbours[i];
            if(!closeSet.includes(neighbour)){
                var tempG = current.g + 1;

                if (neighbour.isObstacle!= true) {
                    if(openSet.includes(neighbour)){
                        if(tempG< neighbour.g){
                            neighbour.g = tempG;
                        }
                    }else{
                        neighbour.g = tempG;
                        openSet.push(neighbour); 
                    }
                }


                neighbour.h = heuristic(neighbour, end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
            }
        }

        //printing openset
        for(var i =0; i<openSet.length; i++){
            openSet[i].show("#46c771");
        }
        //printing closeset
        for(var i=0; i<closeSet.length; i++){
            closeSet[i].show("#c74646");
        }
        start.show("#fff959");
        //printing path
        for(var i=1; i<path.length; i++){
                path[i].show("#59fcff");
            }
        
        end.show("#802f78")
        start.show("#fff959");
        
    }
    
    
if(openSet.length==0){
    clearInterval(refresh);
    alert("No path to Destination");
}

    
}

var refresh;
var btn = document.getElementById('startbtn');
var btn2 = document.getElementById('refreshbtn');
btn.addEventListener('click', startit);
btn2.addEventListener('click', refreshit);

//start
function startit(){
refresh = window.setInterval(pathFinding, 10);
}

//refresh
function refreshit(){
    location.reload();
}
