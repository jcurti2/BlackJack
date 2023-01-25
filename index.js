    function changePage(){
        window.location.href = "blackjack.html";

       localStorage.setItem('player1', document.querySelector(".nameTextBox").value)

      }

var caller = $("#start");
    
function movingBtn()
{
    var randX = Math.floor(Math.random() * 0.5 * (window.innerWidth - 88));

    var randY = Math.floor(Math.random() * 0.5 * (window.innerHeight - 88));

    caller.stop().animate({"left": randX + "px", "top": randY + "px"});
}

$(document).ready(function(){

caller.on('mouseenter', movingBtn);

  }
);

      