// assign main.html file into index.html file
const assignFile = () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.toLowerCase();
    const password = document.getElementById("password").value.toLowerCase();
    if (name === "admin" && password === "admin123") {
      window.location.href = "main.html";
    } else {
      alert("Invalid username or password");
    }
  });
};
assignFile();

// span hidden function
const spanHidden = () => {
  const name = document.getElementById("name");
  const password = document.getElementById("password");
  const nameSpan = document.getElementById("nameSpan");
  const passSpan = document.getElementById("passSpan");

  name.addEventListener("input", () => {
    if (name.value === "admin") {
      nameSpan.style.display = "none";
    } else {
      nameSpan.style.display = "inline";
    }
  });

  password.addEventListener("input", () => {
    if (password.value === "admin123") {
      passSpan.style.display = "none";
    } else {
      passSpan.style.display = "inline";
    }
  });
};
spanHidden();
