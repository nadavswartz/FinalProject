// Global veribals

const container = document.querySelector(".logincontainer"),
  overlay = document.querySelector(".overlay"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password");

const user = document.getElementById("user");
const button = document.getElementById("floating-button");


// Nadav's S. Code

function showContainer() {
  overlay.classList.remove("hide");
  container.classList.remove("hide");
  button.classList.remove("hide");
  var head = document.getElementById("header")
  head.style.background = 'rgba(0, 0, 0, 0)'
  setTimeout(() => {
    overlay.classList.add("show");
    container.classList.add("show");
    button.classList.add("show");
  }, 100); // Adding a slight delay to ensure the transition takes effect
}

function hideContainer() {
  overlay.classList.remove("show");
  container.classList.remove("show");
  button.classList.remove("show");
  var head = document.getElementById("header")
  head.style.background = 'var(--bg-color)'
  setTimeout(() => {
    overlay.classList.add("hide");
    container.classList.add("hide");
    button.classList.add("hide");
  }, 500);
}

user.addEventListener("click", () => {

  setTimeout(showContainer, 300); // Show the container and overlay after 2 seconds

});

button.addEventListener("click", () => {
  setTimeout(hideContainer, 300);
});

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  let currentIndex = 0;
  const images = document.querySelectorAll(".slider-img");
  const totalImages = images.length;

  function showImage(index) {
      images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
      });
  }

  function nextImage() {
      currentIndex = (currentIndex + 1) % totalImages;
      showImage(currentIndex);
  }


  setInterval(nextImage, 7000);
});

// Nadav's C. Code

// Stav's Code
