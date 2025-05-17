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
const closeBtn = document.querySelector('.close-btn'); // ✅ Correct reference

// Open nav menu
hamburger.addEventListener('click', () => {
  navLinks.classList.add('show'); // Better than toggle here for clarity
  hamburger.style.display = 'none';
  closeBtn.style.display = 'block';
});

// Close nav menu with close button
closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('show');
  hamburger.style.display = 'block';
  closeBtn.style.display = 'none';
});

// Close nav menu when a link is clicked (on mobile)
document.querySelectorAll('.nav_links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');

    if (window.innerWidth <= 1024) {
      hamburger.style.display = 'block';
      closeBtn.style.display = 'none';
    }
  });
});

// Adjust menu icons on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    navLinks.style.display = 'flex';
    hamburger.style.display = 'none';
    closeBtn.style.display = 'none';
  } else {
    hamburger.style.display = 'block';
  }
});

// window.addEventListener('load', () => {
//   if (window.location.hash !== '#home') {
//     window.location.hash = '#home';
//   }
// });

// window.addEventListener('load', () => {
//   // Remove any anchor from URL and scroll to top
//   if (window.location.hash) {
//     window.scrollTo(0, 0);
//     history.replaceState(null, null, window.location.pathname);
//   }
// });


window.addEventListener('beforeunload', function () {
  // Always reset scroll position to top before reload
  window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
  // If there's a hash in the URL, remove it
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
});

window.addEventListener('load', () => {
  if (!window.location.hash) {
    window.location.hash = '#home';
  }
});

