

var Color="#fa0000";
var strokecolor="black";
var color= "";
var dotColor="#456" ;

function addShapewithColor(type,dragzone,color,dotcolor,outlinecolor){

 
console.log(color);

if(mode=="submission") { color= "blue"}; 
if(mode=="correct") {   color= "green"};
if(color =="blue") Color="#0060bf";
if(color =="red") Color="#d9534f";
if(color =="orange") Color="#ffa500";
if(color =="green" ) Color ="#5cc902";
//if(color =="green") Color ="#5cc902";
//if(color =="grey") Color ="#808080"; //testing color 
  
//if(dotcolor =="red") {dotColor="red"; } else {dotColor="#456"}
//if(outlinecolor =="outlinered") { console.log("~~~~~~~~~~~~~~~");strokecolor="red";  } else { //strokecolor="black";}
  
if (type=="C") {addCircle(dragzone);} 
  
}



function addShape(type,dragzone){ 
  if (type=="C") {addCircle(dragzone);} 
}
 
 
function addCircle(dragzone) {
  var paper = new Raphael(
    $(dragzone).get(0), 102, 102);   
  var circle =paper.circle(50, 50)
  .attr({
    fill : Color, 
    stroke : strokecolor,
    r : 45
  }); 
  
  
  var sourcePoint= {
    anchor:"Right",  
    // deleteEndpointsOnDetach: false,
      paintStyle:{ fillStyle: dotColor},
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
     maxConnections: -1,
    connector: ["Straight"], 
     connectorOverlays: [["Arrow",
    { width: 15,
     length: 15}]],
  
     isSource:true,
     isTarget:false
    
   };
 
   var targetPoint= {
    anchor: "Left",
    maxConnections: -1, 
    isSource:false,
    isTarget:true,
    //deleteEndpointsOnDetach: false,
    beforeDrop:function(conn) {  
     
     var        existingConnections=jsPlumb.getConnections({source:conn.sourceId,target:conn.targetId});
      if(existingConnections.length >0 ) return false;
      else return true;
      

        } 
   
  };  
  var currentId = $(dragzone).attr('id'); 
  

  e1= jsPlumb.addEndpoint(currentId, sourcePoint);
  e2= jsPlumb.addEndpoint(currentId, targetPoint); 
 
  //jsPlumb.makeTarget(currentId, targetPoint);
 
 
  
}

