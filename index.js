// Get modal elements
const signInModal = document.getElementById('signInModal');
const signUpModal = document.getElementById('signUpModal');

// Get buttons to open modals
const signInBtn = document.getElementById('sign-in');
const signUpBtn = document.getElementById('sign-up');

// Get close elements for modals
const closeSignIn = document.getElementById('closeSignIn');
const closeSignUp = document.getElementById('closeSignUp');

// Open sign-in modal
signInBtn.addEventListener('click', () => {
    signInModal.style.display = 'flex';
});

// Open sign-up modal
signUpBtn.addEventListener('click', () => {
    signUpModal.style.display = 'flex';
});

// Close sign-in modal
closeSignIn.addEventListener('click', () => {
    signInModal.style.display = 'none';
});

// Close sign-up modal
closeSignUp.addEventListener('click', () => {
    signUpModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === signInModal) {
        signInModal.style.display = 'none';
    }
    if (event.target === signUpModal) {
        signUpModal.style.display = 'none';
    }
});
const counters = document.querySelectorAll('.counter');
const speed = 200; // Speed of the animation

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 50);
    } else {
      counter.innerText = target;
    }
  };

  window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('impact-stats');
    const statsPosition = statsSection.getBoundingClientRect().top;

    if (statsPosition < window.innerHeight && counter.innerText == "0") {
      updateCount();
    }
  });
});
