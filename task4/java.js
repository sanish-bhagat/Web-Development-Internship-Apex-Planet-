const tabButtons = document.querySelectorAll(".tab_button");
const tabPanes = document.querySelectorAll(".tab_pane");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active classes
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Add active to clicked tab and its pane
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

const form = document.getElementById('contact-form');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const response = await fetch('https://formspree.io/f/xkgrzeve', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  });

  if (response.ok) {
    // Show the custom popup
    popup.style.display = 'flex';  // Display the popup
    form.reset();  // Reset the form
  } else {
    alert('Oops! Something went wrong.');
  }
});

// Close the popup when the "Close" button is clicked
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';  // Hide the popup
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.style.display = "none";
  close_btn.style.display = "block";
});


document.querySelectorAll('.nav_links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    // hamburger.style.display = 'block'

    if (window.innerWidth <= 1024) {
      hamburger.style.display = "block"
      closeBtn.style.display = 'none';
    }
  });
});

document.querySelector(".close-btn").addEventListener("click", () => {
  navLinks.classList.remove("show");
  hamburger.style.display = "block"
});

