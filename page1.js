    function changePage(){
        window.location.href = "page2.html";
      }

      
        var caller = $("#start");
    

function movingBtn()
{
    var randX = Math.floor(Math.random() * (window.innerWidth - 88));
    var randY = Math.floor(Math.random() * (window.innerHeight - 88));
    caller.stop().animate({"left": randX + "px", "top": randY + "px"});

}

$(document).ready(function(){
caller.on('mouseenter', movingBtn);
      });

      //http://www.geeksforgeeks.org/different-ways-to-include-jquery-in-a-webpage/ source for moving button
      