//Function to handle a User already in the system logging in
const loginFormHandler = async (event) => {
  event.preventDefault();

  //grab the values off the page
  const email = document.querySelector(`#EMAILINPUTPLACEHOLDER`).value.trim();
  const password = document
    .querySelector(`#PASSWORDINPUTPLACEHOLDER`)
    .value.trim();

  //checks if there is a value in each of the fields and if there is, send them to the login route to get the User logged in
  if (email && password) {
    const response = await fetch(`/api/users/login`, {
      method: `POST`,
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //If all goes well, redirect the newly logged in User to the homepage
    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert(
        `Login failed, please try again. If this issue persists please try again later`
      );
    }
  }
};

//function to sign a new user up in our system
const signupFormHandler = async (event) => {
  event.preventDefault();

  //Assign variables to the input fields on the front end
  const name = document.querySelector(`#NAMEINPUTPLACEHOLDER`).value.trim();
  const email = document.querySelector(`#EMAILSIGNUPPLACEHOLDER`).value.trim();
  const password = document
    .querySelector(`#PASSWORDSIGNUPPLACEHOLDER`)
    .value.trim();

  //If there is data in those fields, send it to the create user POST request
  if (email && password) {
    const response = await fetch(`/api/users`, {
      method: `POST`,
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert(
        `Signup failed. Please try again. If this error persists please try again later`
      );
    }
  }
};

//Add Event Listeners to the submit buttons
document
  .querySelector(`.LOGINFORMSUBMITPLACEHOLDER`)
  .addEventListener(`submit`, loginFormHandler);
document
  .querySelector(`.SIGNUPFORMSUBMITPLACEHOLDER`)
  .addEventListener(`submit`, signupFormHandler);
