
var modal = document.getElementById('reportModal');
// open button
var btn = document.getElementById("reportBtn");
// Close button
var span = document.getElementsByClassName("close")[0];
// nav report button opens modal
btn.onclick = function() {
  modal.style.display = "block";
}

// close modal on close button
span.onclick = function() {
  modal.style.display = "none";
}

// close modal on click outside window
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//button handlers
document.getElementById("smallBtn").onclick = function() {
    selectSize('small');
};

document.getElementById("mediumBtn").onclick = function() {
    selectSize('medium');
};

document.getElementById("largeBtn").onclick = function() {
    selectSize('large');
};

function selectSize(size) {
// Remove active class from all size buttons
document.getElementById("smallBtn").classList.remove("active");
document.getElementById("mediumBtn").classList.remove("active");
document.getElementById("largeBtn").classList.remove("active");
}

// Add active class to the clicked size button

document.getElementById(size + "Btn").classList.add("active");

document.getElementById("submitBtn").onclick = function() {
var selectedSize = document.querySelector('.active').id.replace("Btn", ""); // submits size of pothole
var comment = document.getElementById("comment").value; // submits comment
}
//send data to tables
function sendData(selectedSize, comment) {
    //location of table
}