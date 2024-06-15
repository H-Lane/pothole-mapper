//Function to handle a User already in the system logging in
const loginFormHandler = async (event) => {
  try {
    event.preventDefault();

    //grab the values off the page
    const email = document.querySelector(`#emailinput`).value.trim();
    const password = document.querySelector(`#passwordinput`).value.trim();

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
      } else if (response.status === 400) {
        alert(`Login failed, please try again.`);
      } else {
        alert(`Server error, please try again later.`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//function to sign a new user up in our system
const signupFormHandler = async (event) => {
  try {
    event.preventDefault();

    //Assign variables to the input fields on the front end
    const name = document.querySelector(`#name-signup`).value.trim();
    const email = document.querySelector(`#email-signup`).value.trim();
    const password = document.querySelector(`#password-signup`).value.trim();

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
  } catch (err) {
    console.log(err);
  }
};

//Add Event Listeners to the submit buttons
document
  .querySelector(`#loginbutton`)
  .addEventListener(`click`, loginFormHandler);
document
  .querySelector(`#signupbutton`)
  .addEventListener(`click`, signupFormHandler);
