var CL_SEPARATOR='a';
var C_SEPARATOR='C';
var L_SEPARATOR='L';
var C_field_SEPARATOR='c';
var L_field_SEPARATRo='c';
var Label_SEPARATOR='d';
var Data_SEPARATOR='D';

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
 
function connector(id,h,t,EST,EFT,LST,LFT,FF,TF){ 
 this.h="";
 this.t="";
 this.EST="";
 this.EFT=""; 
 this.LST="";
 this.LFT="";
 this.FF="";
 this.TF="";
 this.activity="";
}

function Node(id,type,parent,top,left,activity,EST,EFT,LST,LFT,FF,TF){     
 this.id = ""; 
 this.top ="";
 this.left=""; 
 this.activity="";
 this.EST="";
 this.EFT=""; 
 this.LST="";
 this.LFT="";
 this.FF="";
 this.TF="";                                                         
}  


function NodeClass(node) {  
  this.id=node.id;
  this.prevNode=null;       
  this.nextNodes=null;   
  this.prevconnectors=null;       
  this.nextconnectors=null;   
  this.node=node;  
  this.level=0; 
  
}


function connectionClass(connector) {  
 
  this.prevLinks=null;       
  this.prevLinks=null;       
  this.connector=connector;  
  this.level=0; 
  
}


function deserialiseF(string){  
 var array= new Array(); 
 var stringwithCandL=string.split('a');  
  
  console.log("get answer");
  console.log(stringwithCandL[2]);
  
  return stringwithCandL[2];
}

function deserialiseL(string){  
 var array= new Array(); 
 var stringwithCandL=string.split('a');  
 var stringlink=stringwithCandL[1]; 
 if(stringlink.length ==0) return [];   
 var link= stringlink.split('L');  
   //console.log(link);
 for(i=1;i<link.length;i++){ 
   var shapeanddata=link[i].split('D');  
   var linkAttribute= shapeanddata[0].split('c'); 
   var dataAttribute=shapeanddata[1].split('d');
   console.log(linkAttribute);
   var cc = new connector(); 
   cc.h= linkAttribute[1]
   cc.t= linkAttribute[2]; 
   cc.activity=dataAttribute[1];
   cc.EST=dataAttribute[2];
   cc.EFT=dataAttribute[3];
   cc.LST=dataAttribute[4];
   cc.LFT=dataAttribute[5];
   cc.FF=dataAttribute[6];
   cc.TF=dataAttribute[7]; 
   array.push(cc);
 }
 
 
 return array;
 
}



function deserialiseC(string){ 
 var array= new Array(); 
 var stringwithCandL=string.split('a'); 
 var stringnode=stringwithCandL[0];
 var stringlink=stringwithCandL[1]; 
 var stringnode=  stringnode.split('C'); 
 for(i=1;i<stringnode.length;i++){ 
   var shapeanddata=stringnode[i].split('D'); 
       //console.log(shapeanddata);
       var nodeAttribute=shapeanddata[0].split('c');
       //console.log(nodeAttribute);
       var node = new Node();
       node.id= nodeAttribute[1]
       node.top=nodeAttribute[2];
       node.left=nodeAttribute[3];
   console.log(node.id+"top:"+node.top+":"+node.left);
   
       var dataAttribute=shapeanddata[1].split('d');
      // console.log(dataAttribute);
      node.activity=dataAttribute[1];
      node.EST=dataAttribute[2];
      node.EFT=dataAttribute[3];
      node.LST=dataAttribute[4];
      node.LFT=dataAttribute[5];
      node.FF=dataAttribute[6];
      node.TF=dataAttribute[7]; 
      array.push(node); 
    }  
    return array;   
    
  }


  function serialise(myNodes,mylinks,fianl){
    
    var answervalue ="";  
    for(l=0;l<myNodes.length;l++){
      var thisnode=myNodes[l];  
      answervalue+=C_SEPARATOR;  
      answervalue+=C_field_SEPARATOR; 
      answervalue+=thisnode.id;
      answervalue+=C_field_SEPARATOR; 
      answervalue+=thisnode.top;
      answervalue+=C_field_SEPARATOR;
      answervalue+=thisnode.left;
      answervalue+=C_field_SEPARATOR;  
      answervalue+=Data_SEPARATOR;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.activity;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.EST; 
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.EFT;
      answervalue+=Label_SEPARATOR; 
      answervalue+=thisnode.LST;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.LFT;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.FF;
      answervalue+=Label_SEPARATOR;
      answervalue+=thisnode.TF; 
    } 
    answervalue+=CL_SEPARATOR='a';
    
    for(l=0;l<mylinks.length;l++){
      var thislink=mylinks[l]; 
     //Cc"id"c"top"c"left"c
     answervalue+=L_SEPARATOR;   
     answervalue+=C_field_SEPARATOR; 
     answervalue+=thislink.h;
     answervalue+=C_field_SEPARATOR; 
     answervalue+=thislink.t;
     answervalue+=C_field_SEPARATOR;
     answervalue+=C_field_SEPARATOR;  
     answervalue+=Data_SEPARATOR;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.activity;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.EST;
     
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.EFT;
     answervalue+=Label_SEPARATOR;
     
     answervalue+=thislink.LST;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.LFT;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.FF;
     answervalue+=Label_SEPARATOR;
     answervalue+=thislink.TF; 
      
      
    } 
     answervalue+=CL_SEPARATOR;
    answervalue+=final;
     ;
    return answervalue;
    
  } 

  function generateID(myNodes){
    
    if (typeof(myNodes) == "undefined" ) {return 1;} 
    var myNodesArray=myNodes;
    var max=0;    
    for(n=0; n<myNodesArray.length;n++){ 
     var node= myNodes[n]; 
     node.id >=max;
     max=node.id 
   } 
   var ret= Number(max) +1;
   return ret;
   
 };


 function findnode(id){ 
  for(n=0; n<myNodes.length;n++){
    
    var node=myNodes[n];
    
    if (node.id==id) {
     return node; 
   } 
   
   
 }
}






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

function findlink(h,t){
  
  for(var n=0; n<mylinks.length;n++){ 
   var link= mylinks[n]; 
   
   if (link.h == h && link.t== t)
     
   {    
     return link; 
   };
   
   
 }
 return  null ;
}

function deletelink(h,t){

 var link = findlink(h,t);
 
 if (link == null) console.log("null");
 var index = mylinks.indexOf(link);  
 
 mylinks.splice(index,1);
 
 
 if(mode == "student"){ sentToparentPage();}
 return;


}

function generateLinkID(mylinks){
  
  if (typeof(mylinks) == "undefined" ) {return 10000;}
  
  var mylinksArray=mylinks;
  var max=0;  
  
  for(n=0; n<mylinks.length;n++){ 
   var mylink= mylinks[n]; 
   mylink.id >=max;
   max=mylink.id 
 } 
 var ret= Number(max) +1;
 return ret;
 
};


function addNewNode(node){

 myNodes.push(node);
 sentToparentPage();
}

function addNewLink(link){

 mylinks.push(link);
 sentToparentPage();
}

function  emptymyNodes(){
 
}

function updatelink(link,property,con){

  var mylinkArray=mylinks;
  
  
  var ll= findlink(link.h,link.t)
  if(ll){
   if(property=="activity"){ll.activity=link.activity;
    if (ll.activity==0){
      con.setPaintStyle({lineWidth: 2, 
       strokeStyle:"#666",
       dashstyle:"4 2"})
    } 
    else{
     con.setPaintStyle({
       dashstyle: "solid",
       lineWidth: 2 ,
       strokeStyle:"#666"
     })
   } 
 } 
 if(property=="EST"){ll.EST=link.EST;} 
 if(property=="EFT"){ll.EFT=link.EFT;}
 if(property=="LST"){ll.LST=link.LST;} 
 if(property=="LFT"){ll.LFT=link.LFT;}
 if(property=="FF"){ll.FF=link.FF;} 
 if(property=="TF"){ll.TF=link.TF;}
}
if(mode == "student"){ sentToparentPage();}
return;

}


function updateNode(node,property){
  var myNodesArray=myNodes;
  
  for(n=0; n<myNodesArray.length;n++){ 
   var nn= myNodes[n]; 
   if(  nn.id== node.id){
    if(property=="top") {nn.top=node.top;}
    if(property=="left"){nn.left=node.left;} 
    if(property=="activity"){nn.activity=node.activity;} 
    if(property=="EST"){nn.EST=node.EST;} 
    if(property=="EFT"){nn.EFT=node.EFT;}
    if(property=="LST"){nn.LST=node.LST;} 
    if(property=="LFT"){nn.LFT=node.LFT;}
    if(property=="FF"){nn.FF=node.FF;} 
    if(property=="TF"){nn.TF=node.TF;}
    
  }
} 

console.log(myNodes);
if(mode == "student"){ sentToparentPage();}
return;


};



function  giveWarning(myNodes,mylinks){
  
  
  
 var linkedArray= new Array();   //untested array
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
      for(var n=0; n<mylinks.length;n++){ 
       var link= mylinks[n]; 
       if (link.t==linkedNode.id){
         parents.push(findlinkednode(link.h));
       }
       
       if (link.h == linkedNode.id){
         children.push(findlinkednode(link.t))
       }
     }
           // linkedNode.node.parentID;  
         // console.log(children);
         linkedNode.prevNode=parents; 
         linkedNode.nextNodes=children;
       }  
    

  
  var testingArray= new Array();  
  var warningFlag = 0;
  
 
  
  if(linkedArray.length>0){testingArray.push(linkedArray.shift());}
   
  while(linkedArray.length>0){
    
    if(testingArray.length ==0) {warningFlag=1; break;}
    
    while(testingArray.length>0){
      
      if(linkedArray.length ==0) {break;} 
      
       var  lnode =testingArray.shift();
       var index = linkedArray.indexOf(lnode); 
      if(index >=0){ 
         linkedArray.splice(index,1); 
         if(linkedArray.length ==0) {break;}  
      }
      
      var prevnodesArray =lnode.prevNode;
      var nextnodesArray =lnode.nextNodes; 
      
       for (var p=0;p<prevnodesArray.length;p++){  
            
            var index1 = linkedArray.indexOf(prevnodesArray[p]);  
            if(index1>=0){ 
               //linkedArray.splice(index1,1);
               testingArray.push(prevnodesArray[p]);
            }
            
            }
      
       for (var n=0;n<nextnodesArray.length;n++){ 
            
            var index2 = linkedArray.indexOf(nextnodesArray[n]);   
            console.log(index2);
            if(index2 >=0){
              //linkedArray.splice(index2,1);
              testingArray.push(nextnodesArray[n]);}
          } 
      
    }
     
     
      
}
  
console.log("------------------------------------------------------");
/*
  
for(i=0; i<myNodes.length;i++){
    
  if (repeatflag == 1) {break;}
    
  var node= myNodes[i];
  var activity= node.activity;
    
  if (activity) { // ie not a dummy activity
    var numberOfactivity=0; 
    for (j=0;j<myNodes.length;j++){  
      var linkedNode=myNodes[j]; 
      console.log("==="+activity+""+linkedNode.node.activity);
      if (linkedNode.activity == activity){
            numberOfactivity++;
        if (numberOfactivity>1) repeatflag=1;
      }
    }    
  }
}

 */ 
var repeatflag=0;
for(i=0; i<myNodes.length;i++){
  if (myNodes[i].activity) { // ie not a dummy activity
    for(j=i+1; j<myNodes.length;j++){
      if(myNodes[i].activity ==myNodes[j].activity){
        console.log("warning");
        repeatflag = 1;
      }
    }
  }
}
  
  
  
console.log("------------------------------------------------------");
 
 var numberOfnoParent=0;
 for(n=0; n<myNodes.length;n++){
  var node= myNodes[n];
  var tail= node.id;
  var istailexist=0;
  for(var l=0; l<mylinks.length;l++){ 
   var link= mylinks[l]; 
   if (link.t == tail ){ 
    istailexist=1;break;
  } 
}   
if (istailexist==0) numberOfnoParent++;
}
 /*
if(repeatflag){
 $("body").css("background-color","#fee");
 $("p").text("Warning: Two activities use the same label!");

}*/

 if (warningFlag) {
 
 $("body").css("background-color","#fee");
 $("p").text("Warning: Not all nodes are connected!");
 
}  
else{
  $("body").css("background-color","transparent");
  $("p").text("");
  
}; 


}


function sentToparentPage()
{ giveWarning(myNodes,mylinks);
  console.log(mylinks);
  answervalue= serialise(myNodes,mylinks,final);
  console.log(answervalue);
  
  var elem= parent.document.getElementsByTagName("input"); 
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
  for(; i < elem.length; i++) {
    att = elem[i].getAttribute("type");
    if(att =="text") {
     elem[i].value   = answervalue;
   }  
   
 }
 
 
}


function calculateEFT(node){
 node.EFT= +du[node.activity] +  +node.EST;
 if( node.EFT==0){node.EFT="0"}
   return node.EFT;
}




function  calculateEST(node,value){
  if(value == 0) {value = "0";}
  node.EST=value;
  return true;
  
};




function calculateLFT(node,value){
  //if(value == ) {value=node.EFT;}
  if (value==0) value="0";
  // console.log(node.EFT);
  node.LFT=value;
  
  return true;
  
}

function calculateLST(node){
 node.LST=    +node.LFT - +du[node.activity];
 if(node.LST==0) {node.LST="0";}
 return node.EFT;

}

function calculateFFTF(node,value){ 
  
 node.FF=   value  - node.EFT;
 node.TF=    +node.LFT - +node.EFT;
 if(node.FF == 0) { node.FF ="0";}
 if(node.TF == 0)  { node.TF= "0";}
 
}



function deleteNode(node)
{
 var deletedNodeid=node.id; 
 var index = myNodes.indexOf(node); 
 
 myNodes.splice(index,1); 
 for(n=0; n<myNodes.length;n++){
  var node= myNodes[n];
  
  if(node.parentID==node.id){ 
    node.parentID="";
    $("#"+node.id).children().each(function(no,el){
      if($(el).hasClass("droplist")){
        $(el).hide();
      } 
    });
  }
 }
   
   deletearray =new Array();
   for(var n=0; n<mylinks.length;n++){ 
   var link= mylinks[n];  
   if (link.h == deletedNodeid  )
     
   {    
    deletearray.push(link); 
   }
     
      if (link.t == deletedNodeid  )
     
   {    
     deletearray.push(link); 
   }
   
  }  
   
   for(var d=0; d<deletearray.length;d++){ 
      var link= deletearray[d]; 
      deletelink(link.h,link.t); 
   }
   
   
  $("#"+deletedNodeid).remove();
  if(mode == "student"){ sentToparentPage();}
  return;
}

 function recursive(node){  
    var currentnode= node;
    var nextnodes= node.nextNodes;
    var nodedata= node.node; 
    var length= nextnodes.length;
    
     
    if( length>0) {
      var  prob=0;
      var max = 0;
      for (var x=0;x<length;x++){
        var childnode = nextnodes[x];  
        var childLevel = recursive(childnode);  
        
        if( max < childLevel){
          max=childLevel;  
          
        }
        
      } 
      node.level=max+1;
      return node.level
      
    } 
    
    node.level=1;
    return node.level;
    
  }

function findmaxEFTlinks(linksarray){
    var max=0;
   for(n=0; n<linksarray.length;n++){ 
       var lin= linksarray[n];
     if(lin.EFT>max){max=lin.EFT}
   }
  return max; 
}

function findminsESTlink(linksarray){
    var min=100000;
  for(n=0; n<linksarray.length;n++){ 
       var lin= linksarray[n];
     if(lin.EST< min){min=lin.EST}
   }
  return min;
  

}
