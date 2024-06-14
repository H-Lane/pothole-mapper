// Create a Leaflet map centered over Richmond, Virginia
var map = L.map("map").setView([37.5407, -77.436], 12);

// Add a tile layer from OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var markers = {}; // Object to store markers with pothole IDs

// Function to open the modal for reporting a pothole
function openModal(markerId, lat, lng) {
  // Create and display the modal dynamically
  var reportModal = document.createElement("div");
  reportModal.className = "modal";
  reportModal.id = "reportModal"; // Set modal ID for easier selection
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
  var latlng = L.latLng(lat, lng);
  var markerOffset = map.latLngToContainerPoint(latlng);
  reportModal.style.left = markerOffset.x + "px";
  reportModal.style.top = markerOffset.y + "px";
}

// Function to update the selected button
function updateSelectedButton(btnId) {
  // Remove 'selected' class from all buttons
  var buttons = document.querySelectorAll(".modal-content button");
  buttons.forEach(function (button) {
    button.classList.remove("selected");
  });

  // Add 'selected' class to the clicked button
  document.getElementById(btnId).classList.add("selected");
}

// Function to close the modal
function closeModal() {
  var reportModal = document.getElementById("reportModal");
  reportModal.style.display = "none";
}

// Function to submit the report
async function submitReport(markerId) {
  var comment = document.getElementById("comment").value;
  var selectedPotholeSize = document.querySelector(
    ".modal-content .selected"
  ).innerText;

  var marker = markers[markerId];
  if (!marker) {
    console.error("Marker not found for ID:", markerId);
    return;
  }

  const data = {
    lng: marker.getLatLng().lng,
    lat: marker.getLatLng().lat,
    size: selectedPotholeSize,
    description: comment,
    user_id: getSessionUserId(), // Replace with your actual user ID retrieval logic
  };

  try {
    const response = await fetch("/api/pothole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Pothole reported successfully!");
      closeModal();
    } else {
      alert("Failed to report pothole.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while reporting the pothole.");
  }
}

// Function to remove a pothole
function removePothole(markerId) {
  map.removeLayer(markers[markerId]);
  delete markers[markerId];
  closeModal();
}

// Event listener for clicking on the map
map.on("click", function (e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // Generate a unique marker ID
  var markerId = "marker_" + Object.keys(markers).length;

  // Add a marker with the generated marker ID
  var marker = L.marker([lat, lng]).addTo(map);
  markers[markerId] = marker;

  // Define the content of the popup with buttons
  var popupContent = `
    <button onclick="openModal('${markerId}', ${lat}, ${lng})">Report a Pothole</button>
    <button onclick="removePothole('${markerId}')">Remove a Pothole</button>
  `;

  // Bind the popup to the marker with the specified content
  marker.bindPopup(popupContent).openPopup();
});

// Event listener for clicking on a marker
map.on("popupopen", function (e) {
  var markerId = e.popup._source.options.potholeId;
});

function getSessionUserId() {
  return 1; //
}
// Function to execute when the user's location is found
// function onLocationFound(e) {
//   var radius = e.accuracy / 2;
//   L.marker(e.latlng).addTo(map)
//     .bindPopup("You are within " + radius + " meters from this point").openPopup();
//   L.circle(e.latlng, radius).addTo(map);
//   map.setView(e.latlng); // Centering the map on the user's location
// }

// Function to execute if the user's location is not found
// function onLocationError(e) {
//   alert(e.message);
// }

// Options for locating the user
// var locateOptions = {
//   setView: true,
//   maxZoom: 16
// };

  // // Event listener for locating the user's location
  // map.on('locationfound', onLocationFound);
  // map.on('locationerror', onLocationError);
  
  // // Locate the user's location
  // map.locate(locateOptions);
