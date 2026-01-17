const themeBtns = document.querySelectorAll('.theme-btn');
const themeCurrentText = document.querySelector('.theme-current');

const themeNames = {
    'kanagawa': 'Kanagawa',
    'tokyo-night': 'Tokyo Night',
    'rose-pine': 'Rose Pine',
    'gruvbox': 'Gruvbox',
    'everforest': 'Everforest',
    'catppuccin-mocha': 'Catppuccin Mocha'
};

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
    themeCurrentText.textContent = `Theme: ${themeNames[theme]}`;
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('selected-theme') || 'kanagawa';
setTheme(savedTheme);

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setTheme(theme);
    });
});
