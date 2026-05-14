function setup() {
  var theme = "dark";
  const changeThemeBtn = document.getElementById("changeThemeBtn");
  changeThemeBtn.addEventListener("click", function () {
    changeTheme();
    console.log("changed");
  });
}

function changeTheme() {
  if (theme === "dark") {
    theme = "light";
    loadTheme();
  } else {
    theme = "dark";
    loadTheme();
  }
}

function loadTheme() {
  if (theme === "dark") {
    console.log("dark");
    document.getElementById("main").style.backgroundColor = rgb(30, 30, 46);
  } else {
    console.log("light");
    document.getElementById("main").style.backgroundColor = rgb(255, 255, 255);
  }
}
