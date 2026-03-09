// assign home page
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

// hidden default username and password
// hidden user name
const inputUser = document.getElementById("input-user-name");
const defaultUser = document.getElementById("defaultUser");

inputUser.addEventListener("input", () => {
  if (inputUser.value.trim().toLowerCase() === "admin") {
    defaultUser.style.display = "none";
  } else {
    defaultUser.style.display = "block";
  }
});

// hidden password
const inputPassword = document.getElementById("input-password");
const defaultPass = document.getElementById("defaultPass");

inputPassword.addEventListener("input", () => {
  if (inputPassword.value.trim().toLowerCase() === "admin123") {
    defaultPass.style.display = "none";
  } else {
    defaultPass.style.display = "block";
  }
});
