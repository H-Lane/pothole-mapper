// Create a Leaflet map centered over Richmond, Virginia
var map = L.map('map').setView([37.5407, -77.4360], 12);

// Add a tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = {}; // Object to store markers with pothole IDs

// Function to create and open the modal
function openModal(markerId, latlng) {
  // Create and display the modal dynamically
  var reportModal = document.createElement("div");
  reportModal.className = "modal";
  // generates the modal from inneHTML
  reportModal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>Report a Pothole</h2>
      <p>Please select the size of the pothole:</p>
      <div>
        <button id="smallBtn" onclick="updateSelectedButton('smallBtn')">Small</button>
        <button id="mediumBtn" onclick="updateSelectedButton('mediumBtn')">Medium</button>
        <button id="largeBtn" onclick="updateSelectedButton('largeBtn')">Large</button>
      </div>
      <p>Additional Comments:</p>
      <textarea id="comment" rows="4" cols="50"></textarea>
      <div>
        <button id="submitBtn" onclick="submitReport('${markerId}')">Submit</button>
      </div>
    </div>
  `;
  // Append modal to body
  document.body.appendChild(reportModal);

  // Position modal over the pin marker
  var markerOffset = map.latLngToContainerPoint(latlng);
  reportModal.style.left = markerOffset.x + 'px';
  reportModal.style.top = markerOffset.y + 'px';
}

// Function to update the selected button
function updateSelectedButton(btnId) {
  // Remove 'selected' class from all buttons
  var buttons = document.querySelectorAll(".modal-content button");
  buttons.forEach(function(button) {
    button.classList.remove("selected");
  });

  // Add 'selected' class to the clicked button
  document.getElementById(btnId).classList.add("selected");
}

// Function to close the modal
function closeModal() {
  var modal = document.querySelector(".modal");
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}

// Function to submit the report
function submitReport(markerId) {
  var comment = document.getElementById("comment").value;
  var selectedPotholeSize = document.querySelector(".modal-content .selected").innerText;
  // Logic for submitting the report with comment
  console.log("Submitting report for Marker ID " + markerId + "...");

  // Here we make a fetch request to obtain the pothole ID, and then delete the selected pin

  closeModal();
}

// Function to remove a pothole (delete the marker)
function removePothole(markerId) {
  map.removeLayer(markers[markerId]);
  delete markers[markerId]; // do we want to remove this?
  closeModal();
}

// Event listener for clicking on the map
map.on('click', function(e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // Generate a unique marker ID
  var markerId = 'marker_' + Object.keys(markers).length;

  // Add a marker with the generated marker ID
  var marker = L.marker([lat, lng]).addTo(map);
  markers[markerId] = marker; // Store with a unique ID

  // Define the content of the popup with buttons
  var popupContent = `
    <button onclick="openModal('${markerId}', ${lat}, ${lng})">Report a Pothole</button>
    <button onclick="removePothole('${markerId}')">Remove a Pothole</button>
  `;

  // Bind the popup to the marker with the specified content
  marker.bindPopup(popupContent).openPopup();
});

// Event listener for clicking on a marker
map.on('popupopen', function(e) {
  var markerId = e.popup._source.options.potholeId;
  // We can do w/e we want with this here
});
