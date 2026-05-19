// ================= ELEMENTS =================

// Buttons
const submitBtn = document.getElementById("submitPaperBtn");

// Overlays
const loginOverlay = document.getElementById("loginOverlay");
const submitOverlay = document.getElementById("submitOverlay");

// Close buttons
const loginCloseBtn = document.getElementById("loginCloseBtn");
const submitCloseBtn = document.getElementById("overlayCloseBtn");

// Backdrops
const loginBackdrop = document.getElementById("loginClose");
const submitBackdrop = document.getElementById("overlayClose");

// Forms
const loginForm = document.getElementById("loginForm");

// ================= STATE =================
let isLoggedIn = false;


// ================= OPEN FLOW =================

submitBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    loginOverlay.style.display = "block";
  } else {
    submitOverlay.style.display = "block";
  }
});


// ================= LOGIN LOGIC =================

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Fake login (for now)
  isLoggedIn = true;

  // Close login
  loginOverlay.style.display = "none";

  // Open submit form
  submitOverlay.style.display = "block";
});


// ================= CLOSE LOGIC =================

// Login close
loginCloseBtn.addEventListener("click", () => {
  loginOverlay.style.display = "none";
});

loginBackdrop.addEventListener("click", () => {
  loginOverlay.style.display = "none";
});

// Submit close
submitCloseBtn.addEventListener("click", () => {
  submitOverlay.style.display = "none";
});

submitBackdrop.addEventListener("click", () => {
  submitOverlay.style.display = "none";
});