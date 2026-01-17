// Modern Search with Engine Toggles and Bangs
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('q');
const engineBtns = document.querySelectorAll('.engine');

const engines = {
    'duckduckgo': { url: 'https://duckduckgo.com/?q=', bang: '!d' },
    'github': { url: 'https://github.com/search?q=', bang: '!gh' },
    'youtube': { url: 'https://www.youtube.com/results?search_query=', bang: '!y' },
    'cosmos': { url: 'https://www.cosmos.so/search/elements/', bang: '!c' }
};

let currentEngine = 'duckduckgo';

function setEngine(engineKey) {
    currentEngine = engineKey;
    engineBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.engine === engineKey);
    });
    searchInput.placeholder = `Search with ${engineKey.charAt(0).toUpperCase() + engineKey.slice(1)}...`;
}

// Add event listeners to buttons
engineBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        setEngine(btn.dataset.engine);
        searchInput.focus();
    });
});

searchInput.addEventListener('input', () => {
    const val = searchInput.value; 
    
    // Check for quick switches (space after bang prefix)
    if (val === 's ') { setEngine('duckduckgo'); searchInput.value = ''; }
    else if (val === 'g ') { setEngine('github'); searchInput.value = ''; }
    else if (val === 'y ') { setEngine('youtube'); searchInput.value = ''; }
    else if (val === 'c ') { setEngine('cosmos'); searchInput.value = ''; }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (!val) return;

    // Handle URL direct entry
    if (val.startsWith('http://') || val.startsWith('https://')) {
        window.location.href = val;
        return;
    }

    // Bang logic for searches (e.g. "y term")
    const parts = val.split(' ');
    const firstWord = parts[0].toLowerCase();
    
    if (firstWord === 's' && parts.length > 1) { 
        window.location.href = engines['duckduckgo'].url + encodeURIComponent(parts.slice(1).join(' ')); 
    }
    else if (firstWord === 'g' && parts.length > 1) { 
        window.location.href = engines['github'].url + encodeURIComponent(parts.slice(1).join(' ')); 
    }
    else if (firstWord === 'y' && parts.length > 1) { 
        window.location.href = engines['youtube'].url + encodeURIComponent(parts.slice(1).join(' ')); 
    }
    else if (firstWord === 'c' && parts.length > 1) { 
        window.location.href = engines['cosmos'].url + encodeURIComponent(parts.slice(1).join(' ')); 
    }
    else {
        // Use current active engine
        window.location.href = engines[currentEngine].url + encodeURIComponent(val);
    }
});

// Global Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    if (e.key === 'Escape') {
        searchInput.value = '';
        searchInput.blur();
    }
    
    // Engine shortcuts 1-3
    if (document.activeElement !== searchInput) {
        if (e.key === '1') setEngine('duckduckgo');
        if (e.key === '2') setEngine('github');
        if (e.key === '3') setEngine('youtube');
        if (e.key === '4') setEngine('cosmos');
    }
});
