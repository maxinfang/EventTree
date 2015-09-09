function addConnections(linklist){
 
  var arraynodes=linklist.slice();
  
  for(n=0; n<arraynodes.length;n++){
    var link= arraynodes[n]; 
    addConnection(link);  
  }
  
}


function addConnection(link){
  
  var targetid ;
  $("#"+link.t).children().each(function(no,el){
    if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
      targetid= el.id ; 
    } 
  });
  
  var sourceid ;
  
  $("#"+link.h).children().each(function(no,el){
    if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
      sourceid= el.id ; 
    } 
  });
  
  var parentId=$('#'+sourceid).parent().attr('id');
  var childId=$('#'+targetid).parent().attr('id');
  
  
   $("#"+parentId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           $(el).hide();
          
         } 
       })
     
  $("#"+childId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           
           console.log($(el));
             $(el).show();
          
         } 
       })
  
  s=jsPlumb.selectEndpoints({source: sourceid}).get(0);
  t=jsPlumb.selectEndpoints({target: targetid}).get(0);
  
  console.log("printhere");
  console.log(parentId);
  
  
  
  var linkconn= jsPlumb.connect({
   source:s,
   target:t 
 }); 
  
  linkconn.addOverlay( ["Custom", {
    create:function(component) {  
      var boxvalue= drawbox("line",link,linkconn);  
      return $(boxvalue);  
    },
    location:0.5,
                cssClass:"datatable"//,
               // id: cc.id
             }]); 
  
  $(".datatable").jLzindex();
  
  if(link.activity==0){
    
    linkconn.setPaintStyle({lineWidth: 2, 
      strokeStyle:"#666",
      dashstyle:"4 2"
    })
   
    //  var box= linkconn.getOverlays();
     // if(box.isVisiable==true){box.setVisiable(false)} 
     //  box[1].setVisible(false); 
    }
    

     }


