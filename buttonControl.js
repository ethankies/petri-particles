var presetContainer = document.getElementById("presets-container");
var presetButton = document.getElementById("presets")
var presetSelectionButton = document.getElementById("presets")
var qm = document.getElementById("question-mark")
var infoSquare = document.getElementById("info")
var leftCol = document.getElementById("left-column")

var singlePresetButton = document.getElementsByClassName(".preset-button")
$(document).ready(function(){
  $(".game-button").click(function(){
   
    if(!$(this).is($('#reset')) ){
      
        $(this).toggleClass('selected-button');

        if($(this).is($('.preset-button'))) {
          //Only one preset can be selected at a time
          $(".preset-button").removeClass('selected-button');
          $(this).toggleClass('selected-button');
        }
 
    }

  });

  $(qm).click(function(){
    if (infoSquare.style.display === "none") {

      infoSquare.style.display = "block";
      leftCol.style.display = "block";
    } else {
      infoSquare.style.display = "none";
      leftCol.style.display = "none";
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
  
 $(".gamebutton.preset-button").click(function(){
  console.log("prest clicked")
  singlePresetButton.toggleClass("selected-button")
 })

})//end ready func


function revealDiv(targetDivId, thisId) {
  var x = document.getElementById(targetDivId);
 

  if (x.style.display === "none") {
    x.style.display = "flex";

  } else {
    x.style.display = "none";
  }
}
