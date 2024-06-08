//Create a function to send a request to the logout route when the user clicks logout
const logout = async () => {
  const response = await fetch(`/api/users/logout`, {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/`);
  } else {
    alert(`Failed to Log Out, please try again`);
  }
};

document
  .querySelector(`#LOGOUTBUTTONPLACEHOLDER`)
  .addEventListener(`click`, logout);
