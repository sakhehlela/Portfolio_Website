document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  toggleButton.addEventListener("click", function () {
      navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
});
