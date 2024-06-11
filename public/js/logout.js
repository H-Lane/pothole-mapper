const update = async () => {
  try {
    const name = document.querySelector(`#NEWNAMEPLACEHOLDER`);
    const email = document.querySelector(`#NEWEMAILPLACEHOLDER`);
    const password = document.querySelector(`#NEWPASSWORDPLACEHOLDER`);
    const response = await fetch(`/api/account`, {
      method: `PUT`,
      body: {
        name,
        email,
        password,
      },
      headers: { "Content-Type": "application/json" },
    });

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

document
  .querySelector(`#LOGOUTBUTTONPLACEHOLDER`)
  .addEventListener(`click`, logout);
