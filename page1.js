    function changePage(){
        window.location.href = "page2.html";
      }

      
        var caller = $("#start");
    

function movingBtn()
{
    var randX = Math.floor(Math.random() * (window.innerWidth - 100));
    var randY = Math.floor(Math.random() * (window.innerHeight - 100));
    caller.stop().animate({"left": randX + "px", "top": randY + "px"});

}

// $(document).ready(function() {
    
//     caller.on('mouseenter', foo);
//     caller.on('click', function(){
//         alert('clicked!');
//     });
    
// });
$(document).ready(function(){
caller.on('mouseenter', movingBtn);
      });
      