var L = window.L;

var map = L.map("map").setView([37.5407, -77.436], 12);

// Add a tile layer from OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var markers = {}; // Object to store markers with pothole IDs

function populatePins() {
  // Fetch pothole data and create markers
  const variable = fetch("/api/pothole", {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => console.log(response));
};
populatePins();
// .then(data => {
//   data.forEach(pothole => {
//     var markerId = `marker_${pothole.id}`;
//     var marker = L.marker([pothole.lat, pothole.lng]).addTo(map);
//     markers[markerId] = marker;

//     var popupContent = `<button onclick="openModal('${markerId}', ${pothole.lat}, ${pothole.lng})">Report a Pothole</button> <button onclick="removePothole('${markerId}')">Remove a Pothole</button>`;
//     marker.bindPopup(popupContent);
//   });
// })
// .catch(error => console.error('Error fetching pothole data:', error));

// Function to open the modal for reporting a pothole
function openModal(markerId, lat, lng) {
  // Close any existing modal
  closeModal();

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

  // Position modal over the map
  var mapContainer = document.getElementById("map");
  var mapRect = mapContainer.getBoundingClientRect();
  reportModal.style.left =
    mapRect.left + mapRect.width / 2 - reportModal.offsetWidth / 2 + "px";
  reportModal.style.top =
    mapRect.top + mapRect.height / 2 - reportModal.offsetHeight / 2 + "px";

  reportModal.style.display = "block";
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
  var existingModal = document.getElementById("reportModal");
  if (existingModal) {
    existingModal.remove();
  }
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
    // user_id: getSessionUserId(),
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

// Function to get session user ID (dummy function for example)
// function getSessionUserId() {
//   return 1; // Replace with actual implementation
// }
