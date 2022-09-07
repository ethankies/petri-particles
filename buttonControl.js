var presetContainer = document.getElementById("presets-container");
var presetButton = document.getElementById("presets")
var presetSelectionButton = document.getElementById("presets")
var qm = document.getElementById("question-mark")
var infoSquare = document.getElementById("info")
$(document).ready(function(){
  $(".game-button").click(function(){
   
    if(!$(this).is($('#reset')) ){
      
        $(this).toggleClass('selected-button');
 
    }

    // if($(this).is($('.preset-button'))){
    //   $(this).toggleClass('selected-button');
    //   //buttons dont stay highlighted
    // }
  });

  $(qm).click(function(){
    if (infoSquare.style.display === "none") {
      console.log("none")
      infoSquare.style.display = "block";
    } else {
      infoSquare.style.display = "none";
    }
  })

  
  $(presetButton).click(function(){
    if (presetContainer.style.display === "none") {
      presetContainer.style.display = "flex";
     // $(presetButton).toggleClass('selected-button');
  
    } else {
      presetContainer.style.display = "none";
    }
  })
})


function revealDiv(targetDivId, thisId) {
  var x = document.getElementById(targetDivId);
 

  if (x.style.display === "none") {
    x.style.display = "flex";

  } else {
    x.style.display = "none";
  }
}
