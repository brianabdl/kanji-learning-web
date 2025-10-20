// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Check if username exists, if not redirect to index
    const currentPage = window.location.pathname.split('/').pop();
    const username = localStorage.getItem('kanjiUsername');
    
    if (!username && currentPage !== 'index.html' && currentPage !== '') {
        window.location.href = 'index.html';
    }
});

// Utility function to display username
function displayUsername() {
    const username = localStorage.getItem('kanjiUsername');
    const welcomeElement = document.getElementById('welcomeText');
    if (welcomeElement && username) {
        welcomeElement.textContent = `Welcome, ${username}!`;
    }
}

// Call display username if on a page with the element
if (document.getElementById('welcomeText')) {
    displayUsername();
}
