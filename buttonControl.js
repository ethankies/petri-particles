function revealDiv(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }
