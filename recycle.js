// Handle form submission for bulk recycling
document.getElementById("bulkForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Check if the user is signed in
    const userSignedIn = false; // This should be dynamically set based on user's sign-in status

    if (!userSignedIn) {
        alert('Please sign in or sign up to proceed.');
        window.location.href = "index.html"; // Redirect to sign-in page
        return;
    }

    // Show confirmation if user is signed in
    document.getElementById("pickupResult").style.display = "block";

    // Redirect to recycling centers page
    window.location.href = "recyclingcenter.html";

    // Clear form inputs
    this.reset();
});

// Handle form submission for recycle item form
document.getElementById('recycleItemForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Check if the user is signed in
    const userSignedIn = false; // This should be dynamically set based on user's sign-in status

    if (!userSignedIn) {
        alert('Please sign in or sign up to proceed.');
        window.location.href = "index.html"; // Redirect to sign-in page
        return;
    }

    // Get form values
    const item = document.getElementById('item').value.toLowerCase();
    const address = document.getElementById('address').value;

    // Check for valid input
    if (item && address) {
        // Redirect to recycling centers page
        window.location.href = "recyclingcenter.html";
    } else {
        alert('Please fill in all fields.');
    }
});
