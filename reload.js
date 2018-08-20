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
         
     for(n=0; n<myNodes.length;n++){ 
        var node= myNodes[n];
       
        node.color="orange";   // missing
        node.dotcolor="red";    //wrong children
        node.outlinecolor="outlinered";   //???
                      
        drawnode(node);
  }   
    
    for(m=0; m<mylinks.length;m++){ 
        var linker= mylinks[m];
        console.log(linker);
        linker.dropdowncolor="red";
        linker.probcolor="red";
     
  }   
     
     
     addConnections(mylinks);
  
}
   
   

 
if(mode=="correct") { 
        
        myNodes=deserialiseC(correct_string);
        mylinks=deserialiseL(correct_string);
        final = deserialiseF(correct_string); 

  
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
       
       
       for(var n=deep; n>0 ;n--){
        
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {  
                if(lnode.prevconnectors==null)      
                  {lnode.node.EST=1;}
             else { lnode.node.EST= lnode.prevNode[0].node.EST*lnode.prevconnectors.EST; 
               var parentslist=  lnode.prevNode[0].previouslinkbox;   
               parentslist.push(lnode.prevconnectors.activity);
                   lnode.previouslinkbox= parentslist;                       console.log( lnode.previouslinkbox);// lnode.node.EST.activity);
                 
                   
                  
                   
             } 
          }
        }
      }
  
  console.log(linkedrootnode);
  
    
   var linkedconnections=new Array(); 
   var linkedconnectionsserach=new Array(); 
    
  
  
    for(var l=0; l<mylinks.length; l++ ){
    
      var   connector =  mylinks[l]; 
      var linkedconnector= new connectionClass(connector);
     
      var lnode=(findlinkednode(connector.h));
      
      
       if(lnode.prevconnectors == null ) continue;
      
        console.log(lnode.prevconnectors );
      
      
      
      // push the activity to parent list as ID ?
 
        var predecessor= new Array(); 
       
       
     
      linkedconnector.prevLinks=predecessor; 
           
      linkedconnections.push(linkedconnector); 
      
      
    }
  
 
       console.log(linkedconnections);
   
       
     /* var final=0;
      for (var j=0;j<linkedArray.length;j++){
       var  lnode =  linkedArray[j]; 
         if(lnode.level==1) {
             console.log(lnode);
             final =lnode.node.EST+final;
        }
    
      }
      console.log(final); 
       */
   
     for(n=0; n<myNodes.length;n++){ 
       var node= myNodes[n];
     
        drawnode(node);  
   }   
  
  
  addConnections(mylinks);
   
 }
  

}

