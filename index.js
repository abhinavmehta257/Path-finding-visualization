canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
/*
ctx.fillRect(0,0,20,20);
*/
/*canvas.height = window.innerHeight;
canvas.width = window.innerWidth;*/
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


var rows =60;
var cols =35;
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

var current;
for(i = 0; i<rows; i++){
    grid[i] = new Array(cols);
}

function spot(i, j){
    this.i = i;
    this.j = j;
    this.g  = 0;
    this.h = 0;
    this.f = 0;
    
    this.show = function(color){
        ctx.fillStyle = color;
        ctx.fillRect(i*cellHeight , j*cellWidth , cellHeight-1, cellWidth-1);
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



//assigning class to each block
for(var i=0; i < rows; i++)
    for(var j=0; j < cols; j++){
        grid[i][j] = new spot(i,j);
    }
//adding neighbour
for(var i=0; i < rows; i++)
    for(var j=0; j < cols; j++){
        grid[i][j].addNeighbour(grid);
    }

start = grid[0][0];
end = grid[36][34];

console.log(end);

openSet.push(start);
console.log(openSet.length);

winner = 0;

while(openSet.length>0){
    
    for(var i=0; i< openSet.length; i++){
        if(openSet[i].f < openSet[winner].f){
            winner = i;
        }
    }
    current = openSet[winner];
    
    if(current === end){
        
        var temp = current;
        path.push(temp);
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }
        
        console.log("destnation found");
/*
        current.show("#59fcff");
*/
        break;
    }
    closeSet.push(current);
    
    //openSet.remove(current)
    removeFromArray(openSet,current);
    var neighbours = current.neighbour;

    /*console.log("current",current);
    
    console.log("neighbour",neighbours);*/
    
    for(var i =0;i < neighbours.length; i++){
        var neighbour = neighbours[i];
        if(!closeSet.includes(neighbour)){
            var tempG = current.g + 1;
            
            if(openSet.includes(neighbour)){
                if(tempG< neighbour.g){
                    neighbour.g = tempG;
                }
            }else{
                neighbour.g = tempG;
                openSet.push(neighbour); 
            }
            
            
           neighbour.h = heuristic(neighbour, end);
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.previous = current;
        }
    }
      
    
    
    for(var i=0; i < rows; i++)
        for(var j=0; j < cols; j++){
            grid[i][j].show("#3c72d6");
    }

for(var i =0; i<openSet.length; i++){
    openSet[i].show("#46c771");
}
    for(var i=0; i<closeSet.length; i++){
        closeSet[i].show("#c74646");
    }
    
    
    
}

for(var i=0; i<path.length; i++){
        path[i].show("#59fcff");
    }

 
    
    
