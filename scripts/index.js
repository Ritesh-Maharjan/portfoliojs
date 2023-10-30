const rootEl = document.querySelector(":root");
const hamburgerMenu = document.getElementById("hamburger-menu");
const nav = document.getElementById("nav");
const changeColor = document.getElementById("change-color");
const form = document.getElementById("my-form");
let menuOn = true;
let nightMode = true;

hamburgerMenu.addEventListener("click", () => {
  if (menuOn) {
    nav.style.display = "flex";
    menuOn = !menuOn;
  } else {
    nav.style.display = "none";
    menuOn = !menuOn;
  }
});

changeColor.addEventListener("click", () => {
  if (nightMode) {
    rootEl.style.setProperty("--primary-color", "#f5f5f5");
    rootEl.style.setProperty("--secondary-color", "#1d1d1d");
    nightMode = !nightMode;
    changeColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"> <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/> </svg>
    Dark`;
    // changeColor.innerText = "dark";
  } else {
    rootEl.style.setProperty("--primary-color", "#1d1d1d");
    rootEl.style.setProperty("--secondary-color", "#f5f5f5");
    nightMode = !nightMode;
    changeColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"> <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/> </svg>
    Light`;
    // changeColor.innerText = "light";
  }
});

const handleSubmit = (e) => {
  e.preventDefault();
  let status = document.getElementById("error");
  let data = new FormData(e.target);

  fetch(e.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    })
    .finally(() => {
      setTimeout(() => {
        console.log("This is running");
        status.innerText = "";
      }, 10000);
    });
};

form.addEventListener("submit", handleSubmit);
