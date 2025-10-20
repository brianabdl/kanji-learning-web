// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Check if username exists, if not redirect to index
    const currentPage = window.location.pathname.split('/').pop();
    const username = localStorage.getItem('kanjiUsername');
    
    if (!username && currentPage !== 'index.html' && currentPage !== '') {
        window.location.href = 'index.html';
    }
});
