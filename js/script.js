const audio = new Audio("/invitaciones/sounds/click.mp3");
const sonidos = document.querySelectorAll(".clickSound");

sonidos.forEach(sonidos => {
  sonidos.addEventListener("click", () => {
    audio.play();
  });
});



$(function(){
  var cant = document.getElementsByClassName("multisteps_form_panel").length;
  var i = 1;

  // ========== Form-select-option ========== // Como no sé la cantidad de preguntas, los genero con un for viendo la cant de steps
  for(i; i <= cant; i++){
    var clase = ".step_" + i;
    $(clase).on('click', function(){
      $(clase).removeClass("active");
      $(this).addClass("active");
    });
  }
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab


function resize_to_fit_preg(pregunta) {		
  var pregText =  $(pregunta).find(".cont-pregunta");
  var fontsize = $(pregunta).find(".cont-pregunta").css('font-size');
  if (pregText.outerHeight() > pregText.parent().outerHeight()) {
    $(pregText).css('fontSize', parseFloat(fontsize) - 1);
    resize_to_fit_preg(pregunta);
  } ;
};

function showTab(n) {
  var x = document.getElementsByClassName("multisteps_form_panel");
  // This function will display the specified tab of the form ...
  // $(x[n]).show();
  x[n].style.display = "block";
  resize_to_fit_preg(x[n]);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("multisteps_form_panel");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
   //$(x[currentTab]).hide( "slow");
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
 /* $("#progress2").attr("aria-valuenow",100 * n / x.length);
  $("#progress2").css('width',100 * n / x.length);*/
  
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    //location.reload(true);
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("multisteps_form_panel");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function move() {
  var elem = document.getElementById("myBar"); 
  var width = parseInt(elem.innerHTML);
  var aim = width + 25;
 // var id = setInterval(frame, 25);
  
  function frame() {
      if (width >= aim) {
          clearInterval(id);
      } else if(width >= 100) {
          width=0; 
          aim = 25;
          elem.style.width = width + '%'; 
          elem.innerHTML = width * 1 + '%';
      } else {
          width++;
          elem.style.width = width + '%'; 
          elem.innerHTML = width * 1 + '%';
      }
  }
}