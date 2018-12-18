 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    
 if(array[0] == "question"){  
    }; 
 
 var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
 var namespaceforLabel=  array[0]+"_"+array[1]+"_label"; 
 var namespaceforSubmit= array[0]+"_"+array[1]+"_submission"; 
 var namespaceforAnswer= array[0]+"_"+array[1]+"_answer"; 
 var namespacefortoleranceprob = array[0]+"_"+array[1]+"_tolerance_prob"; 
 var op= new Array();

 
 
 function getEntry(){
   
    var elements=new Array();  
    var  seq=1;
    var  flag =1;
    
  while(flag){
    
    var  tempname= namespaceforEntry+"_"+seq; 
    var element=parent.document.getElementById(tempname);
    if ( typeof element !="undefined"&& element !=null ) { 
      
      var bu =element.innerHTML;
      elements.push( bu);
      seq++;
    }else {flag=0;}
      
   }
     return elements;
   }
 

function getLabel(){
    var element=  parent.document.getElementById(namespaceforLabel);
  if (element == null) { console.log(questionId); return;}
    console.log( element.innerHTML);
    return element.innerHTML;
 } 

function getsubmission(){
    var element= parent.document.getElementById(namespaceforSubmit);
    return element.innerHTML;
    
 } 

function getCorrectAnswer(){
   
  var el=parent.document.getElementById(namespaceforAnswer).innerHTML; 
     
  return el;
    
 } 

function getToleranceprob(){
   var element= parent.document.getElementById(namespacefortoleranceprob);
   
    if (element == null) {   return 0.01;}
     
    return element.innerHTML;
  
}

 var op = getEntry();
 var dataLabel= getLabel();


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
     
    
      function getAncestors(nodeclass,list){
       
            var parentlist= list;
             
        var parentnode = nodeclass.prevNode ;
            console.log(parentnode);
        if ( parentnode==null) {
             console.log(parentlist);
             return parentlist;
           }
        else {  
           // console.log(parentnode.id);
          //parentnode = nodeclass.prevNode();
            parentlist.push(parentnode.node.value);
            getAncestors(parentnode,parentlist); 
        }
       
         return parentlist;
       
         
     
     }   
    
    
    
    
         
     for(n=0; n<myNodes.length;n++){ 
        var node= myNodes[n];
       
       // node.color="orange";   // missing
      //  node.dotcolor="red";    //wrong children
      //  node.outlinecolor="outlinered";   //???
          drawnode(node);
  }   
    
    for(m=0; m<mylinks.length;m++){ 
        var linker= mylinks[m];
      //  console.log(linker);
        linker.dropdowncolor="red";
        linker.probcolor="red";
     
  }   
     
     
     addConnections(mylinks);
  
}
   
   

 
if(mode=="correct") { 
        
 myNodes=deserialiseC(correct_string);
 mylinks=deserialiseL(correct_string);
 final = deserialiseF(correct_string); 
  
 myNodes_student=deserialiseC(history);
 mylinks_student=deserialiseL(history);
 final_student = deserialiseF(history);
  
  
function findrootnode(){

 for(var m=0; m<myNodes.length;m++){ 
   
   var node= myNodes[m]; 
   var id = node.id; 
   
   var count =0;
   for(var n=0; n<mylinks.length;n++){
    var link=mylinks[n];
    if (link.t==id) {
      count++;
      console.log("link:++"+link);
    }
  }
  if (count==0) {
   console.log("root:"+id); 
   return findnode(id);
 }
 

}


}
  
   function findnode_student(id){ 
  for(n=0; n<myNodes_student.length;n++){
    
    var node=myNodes_student[n];
    
    if (node.id==id) {
     return node; 
   } 
   
   
 }
}

  
  function findrootnode_student(){ 
 for(var m=0; m<myNodes_student.length;m++){ 
   
   var node= myNodes_student[m]; 
   var id = node.id; 
   
   var count =0;
   for(var n=0; n<mylinks_student.length;n++){
    var link=mylinks[n];
    if (link.t==id) {
      count++;
      console.log("link:++"+link);
    }
  }
  if (count==0) {
   console.log("root:"+id); 
   return findnode_student(id);
 }
 

}


}
  
  
  
 var root = new Node();
 root = findrootnode();  
 var linkedArray= new Array(); 
 var linkedArray2= new Array();  
  
 
   var root_student = new Node();
 root_student = findrootnode_student();  
 var linkedArray_student= new Array(); 
 var linkedArray2_student= new Array();  
  
  
 for(n=0; n<myNodes.length;n++){  
  var node=myNodes[n];  
       //console.log(node);
       var linkedNode= new NodeClass(node)
     // console.log(linkedNode);
     linkedArray.push(linkedNode);  
     linkedArray2.push(linkedNode);
   } 
  
  
  
   for(n=0; n<myNodes_student.length;n++){  
  var node=myNodes_student[n];  
       //console.log(node);
       var linkedNode= new NodeClass(node)
     // console.log(linkedNode);
     linkedArray_student.push(linkedNode);  
     linkedArray2_student.push(linkedNode);
   } 
   
  function findlinkednode(id){ 
     for (x=0;x<linkedArray2.length;x++){ 
      var li=linkedArray2[x];
      if(li.id==id){return li;}
    } 
      return "none";
 } 
  
   function findlinkednode_student(id){ 
     for (x=0;x<linkedArray2_student.length;x++){ 
      var li=linkedArray2_student[x];
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
  
       for (j=0;j<linkedArray_student.length;j++){ 
      var linkedNode=linkedArray_student[j]; 
      var children= new Array(); 
      var parents= new Array(); 
      var nextlinkers= new Array();
      var prelinker= null;
       
      for(var n=0; n<mylinks_student.length;n++){ 
       var link= mylinks_student[n]; 
       if (link.t==linkedNode.id){
         prelinker=link;
         parents.push(findlinkednode_student(link.h));
       }
       
       if (link.h == linkedNode.id){
         children.push(findlinkednode_student(link.t))
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
  
  
       var linkedrootnode_student=findlinkednode(root.id)
       recursive(linkedrootnode_student); 
       var deep_student =linkedrootnode_student.level;
       
       
       for(var n=deep; n>0 ;n--){
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {  
                if(lnode.prevconnectors==null)      
                  {lnode.node.EST=1;}
             else { lnode.node.EST= lnode.prevNode[0].node.EST*lnode.prevconnectors.EST; 
                     
                   //  var parentslist=[];
                   //   parentslist =  lnode.prevNode[0].previouslinkbox;  
                  //    parentslist.push(lnode.prevconnectors.activity);
                   //   lnode.previouslinkbox= parentslist;  
                       
                   
                  
                   
             } 
          }
        }
      }
  //
         
       for(var n=deep; n>0 ;n--){
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {  
                 var parentslist=[];
                 if( lnode.prevNode[0] == null){
                    console.log(lnode);
                        
                      }
                 else{
                      var parentslist=[];
                      parentslist =  lnode.prevNode[0].previouslinkbox;  
                      parentslist.push(lnode.prevconnectors.activity);
                      lnode.previouslinkbox = parentslist;  }
                 
              
          }
        }
      }
  
  
  
   console.log(linkedrootnode);
  
  
  
  
    /*
  
    function getAncestors(nodeclass,list){ 
            var parentlist= list;
        var parentnode = nodeclass.prevNode ;
            console.log(parentnode);
        if ( parentnode==null) {
             console.log(parentlist);
             return parentlist;
           }
        else {  
            parentlist.push(parentnode.node.value);
            getAncestors(parentnode,parentlist); 
        }
       
         return parentlist;
       
         
     
     }   
        
  
  */
  
  
  
  console.log(linkedrootnode);
  console.log(linkedrootnode_student);
    
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
   
       
      var final=0;
      for (var j=0;j<linkedArray.length;j++){
       var  lnode =  linkedArray[j]; 
         if(lnode.level==1) { 
             if(lnode.node.activity =="1"){
               //this means the correct answer needs adds up
               final= final+lnode.node.EST;
             
             }
         } 
      }
   
    updatefinalAnswer(final);
  
     for(n=0; n<myNodes.length;n++){ 
       var node= myNodes[n];
     
        drawnode(node);  
   }   
  
  
  addConnections(mylinks);
   
 }
  

}

