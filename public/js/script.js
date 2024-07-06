// Global variables
const container = document.querySelector(".logincontainer"),
  overlay = document.querySelector(".overlay");


const user = document.getElementById("user");
const button = document.getElementById("floating-button");
const menubutton = document.getElementById("menu-button");
const menucontainer = document.querySelector(".menu-container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");

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
  }, 100);
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

function showMenuContainer() {
  menucontainer.classList.remove("hide");
  overlay.classList.remove("hide");
  setTimeout(() => {
    overlay.classList.add("show");
    menucontainer.classList.add("show");
    // Ensure the menu container moves to the right position
    menucontainer.style.left = '0';
  }, 100);
}

function hideMenuContainer() {
  overlay.classList.remove("show");
  menucontainer.classList.remove("show");
  setTimeout(() => {
    overlay.classList.add("hide");
    menucontainer.classList.add("hide");
  }, 500)
}

user.addEventListener("click", () => {
  setTimeout(showContainer, 300); // Show the container and overlay after 300 milliseconds
});

button.addEventListener("click", () => {
  setTimeout(hideContainer, 300); // Hide the container and overlay after 300 milliseconds
});

menubutton.addEventListener("click", () => {
  if (menucontainer.classList.toggle("hide")) {
    setTimeout(hideMenuContainer, 100); // Hide the menu container after 100 milliseconds
  } else {
    setTimeout(showMenuContainer, 100); // Show the menu container after 100 milliseconds
  }
});


//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";
      } else {
        pwField.type = "password";
      }
    });
    // Toggle icon classes for the clicked icon only
    eyeIcon.classList.toggle("uil-eye");
    eyeIcon.classList.toggle("uil-eye-slash");
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

// Nadav's Cohen Script

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 32.048694, lng: 34.808089}
  });

  var locations = [
    {lat: 32.048694, lng: 34.808089},
    {lat: 31.784743, lng: 34.643353},
    {lat: 31.878642, lng:  34.819861},
    {lat: 31.777133, lng: 35.203170   }
  ];
    

  locations.forEach(function(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  });
}