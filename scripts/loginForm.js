// Add EventListener in Sign in Btn

document.getElementById("sign-in-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const inputUserName = document
    .getElementById("input-user-name")
    .value.trim()
    .toLowerCase();
  const inputPassword = document.getElementById("input-password").value.trim();

  const validUserName = "admin";
  const validPassword = "admin123";

  if (inputUserName === validUserName && inputPassword === validPassword) {
    window.location.assign("home.html");
  } else {
    if (inputUserName !== validUserName) {
      alert("Invalid UserName");
    } else if (inputPassword !== validPassword) {
      alert("Invalid Password");
    }
  }
});
