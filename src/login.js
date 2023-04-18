// Login Setup
// const button = document.querySelector("button");
// const svg = document.querySelector("svg");

// button.addEventListener("click", () => {
//   svg.classList.remove("hidden");
//   // Do login logic here
//   // Once the login is complete, hide the loader again
//   svg.classList.add("hidden");

//   setTimeout(() => {
//     window.location.href = "dashboard.html";
//   }, 2000);
// });

window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});
