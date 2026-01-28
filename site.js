document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Function to set dark mode state
    const enableDarkMode = (enabled) => {
        if (enabled) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
        updateDarkModeButtonText();
    };

    // Function to update button text
    const updateDarkModeButtonText = () => {
        if (darkModeToggle) {
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.textContent = 'Light Mode';
            } else {
                darkModeToggle.textContent = 'Dark Mode';
            }
        }
    };

    // Event listener for the toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            enableDarkMode(!isDarkMode);
        });
    }

    // Check initial dark mode state from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode(true);
    } else {
        enableDarkMode(false);
    }
});
