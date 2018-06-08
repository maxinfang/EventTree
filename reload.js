function redraw(history,correct_string){
  
 myNodes=deserialiseC(history);
 mylinks=deserialiseL(history);
 final = deserialiseF(history);
  
  
 
  
 if (myNodes == []) return;
 
   if( mode == "student")
  { for(n=0; n<myNodes.length;n++){ 
    var node= myNodes[n];
    console.log(node);
    drawnode(node);
  }   
  
}
  
  
   if(mode == "submission" )
  {
        
    
        myNodes_correct=deserialiseC(correct_string);
        mylinks_correct=deserialiseL(correct_string);
        final_correct = deserialiseF(correct_string); 
    
       
    
     for(n=0; n<myNodes.length;n++){ 
        var node= myNodes[n];
       
        node.color="orange"; 
        node.dotcolor="red"; 
        node.outlinecolor="outlinered";
                      
        drawnode(node);
  }   
  
}
   
   

 
if(mode=="correct") { 

  
 var root = new Node();
 root = findrootnode();  
 var linkedArray= new Array(); 
 var linkedArray2= new Array();  
  
 for(n=0; n<myNodes.length;n++){  
  var node=myNodes[n];  
       //console.log(node);
       var linkedNode= new NodeClass(node)
     // console.log(linkedNode);
     linkedArray.push(linkedNode);  
     linkedArray2.push(linkedNode);
   } 
   
  function findlinkednode(id){
    
     for (x=0;x<linkedArray2.length;x++){ 
      var li=linkedArray2[x];
      if(li.id==id){return li;}
    } 
      return "none";
 } 
 
 

     
     for (j=0;j<linkedArray.length;j++){ 
      
      var linkedNode=linkedArray[j]; 
      var children= new Array(); 
      var parents= new Array(); 
      var nextlinkers= new Array();
      var prelinker= null;
      for(var n=0; n<mylinks.length;n++){ 
       var link= mylinks[n]; 
       if (link.t==linkedNode.id){
         prelinker=link;
         parents.push(findlinkednode(link.h));
       }
       
       if (link.h == linkedNode.id){
         children.push(findlinkednode(link.t))
         nextlinkers.push(link);
         
       }
        
  
     }
           // linkedNode.node.parentID;  
        // console.log(children);
         linkedNode.prevNode=parents; 
         linkedNode.nextNodes=children;
         linkedNode.prevconnectors =prelinker;
         linkedNode.nextconnectors=nextlinkers;  

       }
  
     
  
   
  
  
       
       var linkedrootnode=findlinkednode(root.id)
       recursive(linkedrootnode); 
       var deep =linkedrootnode.level;
       console.log("find root node");
       console.log(linkedrootnode);
       console.log("~~~~~");
       for(var n=deep; n>0 ;n--){
        
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {  
            
            
            
          }
        }
      }
      var project_duration=0; 
      
      for( var i=1; i<=deep; i++ )   {
       for (var j=0;j<linkedArray.length;j++){
       
         
      }
    }
     
    for( var i=1; i<=deep; i++ )   {
      for (var j=0;j<linkedArray.length;j++){
       var  lnode=  linkedArray[j]; 
       if(lnode.level==i) {
             console.log(lnode.node);
        }
    
      }
      
    }
 
  
  
     
     for(n=0; n<myNodes.length;n++){ 
       var node= myNodes[n];
     
        drawnode(node);  
   }   
  
  
  addConnections(mylinks);
   
 }
  

}

