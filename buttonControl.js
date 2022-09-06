function revealDiv(id) {
    var x = document.getElementById(id);



    
    if (x.style.display === "none") {
      x.style.display = "flex";

    } else {
      x.style.display = "none";
    }
  }

$(document).ready(function(){
  $(".game-button").click(function(){
     
    $(".game-button").removeClass("selected-button")
    $(this).addClass("selected-button")
      
      
  });
})
