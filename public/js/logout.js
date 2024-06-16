alert(`logout.js is connecting`)

//fetch request to update a User in our system
const update = async () => {
  try {
    const name = document.querySelector(`#newName`).value.trim();
    const email = document.querySelector(`#newEmail`).value.trim();
    const password = document.querySelector(`#newPassword`).value.trim();
    const response = await fetch(`/api/account`, {
      method: `PUT`,
      body: {
        name,
        email,
        password,
      },
      headers: { "Content-Type": "application/json" },
    });

    //Refresh the page on a proper update
    if (response.ok) {
      window.location.reload();
    } else if (response.status === 400) {
      alert(`Update failed, please try again.`);
    } else {
      alert(`Server error, please try again later.`);
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a function to send a request to the logout route when the user clicks logout
const logout = async () => {
  try {
    const response = await fetch(`/api/users/logout`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else if (response.status === 400) {
      alert(`Update failed, please try again.`);
    } else {
      alert(`Server error, please try again later.`);
    }
  } catch (err) {
    console.log(err);
  }
};

function displayPassword() {
  var x = document.getElementById("newPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

document
  .querySelector(`#logoutButton`)
  .addEventListener(`click`, logout);

document
  .querySelector(`#updateButton`)
  .addEventListener(`click`, update);

document
  .querySelector(`#displayPassword`)
  .addEventListener(`click`, displayPassword);
