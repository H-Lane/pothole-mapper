const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector(`#EMAILINPUTPLACEHOLDER`).value.trim();
  const password = document
    .querySelector(`#PASSWORDINPUTPLACEHOLDER`)
    .value.trim();

  if (email && password) {
    const response = await fetch(`/api/users/login`, {
      method: `POST`,
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert(
        `Login failed, please try again. If this issue persists please try again later`
      );
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector(`#EMAILSIGNUPPLACEHOLDER`).value.trim();
  const password = document
    .querySelector(`#PASSWORDSIGNUPPLACEHOLDER`)
    .value.trim();

  if (email && password) {
    const response = await fetch(`/api/users`, {
      method: `POST`,
      body: JSON.stringify({ email, password }),
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

document
  .querySelector(`.LOGINFORMSUBMITPLACEHOLDER`)
  .addEventListener(`submit`, loginFormHandler);
document
  .querySelector(`.SIGNUPFORMSUBMITPLACEHOLDER`)
  .addEventListener(`submit`, signupFormHandler);
