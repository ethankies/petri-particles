
$(document).ready(function(){
  $(".game-button").click(function(){
    if(!$(this).is($('#reset'))){
  
      $(this).toggleClass('selected-button');
    }
  });
})


function revealDiv(targetDivId, thisId) {
  var x = document.getElementById(targetDivId);
 

  if (x.style.display === "none") {
    x.style.display = "flex";

  } else {
    x.style.display = "none";
    //thisDiv.classList.remove("selected-button")
    //$(thisDiv).removeClass("selected-button")
    // console.log(thisDiv.classList)

  }
}
