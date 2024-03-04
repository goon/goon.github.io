// Create form element
var form = document.createElement('form');
form.setAttribute('id', 'search-form');
form.setAttribute('action', 'https://www.perplexity.ai/search/'); 
form.setAttribute('method', 'get');
form.setAttribute('data-default-engine', 'perplexity');

// Create input element
var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'q');
input.setAttribute('name', 'q');
input.autofocus = true;

// Append input to form
form.appendChild(input);

// Select the parent element where you want to append the form
var parentElement = document.getElementById('search');

// Append form to the parent element
parentElement.appendChild(form);

var event = new Event('qElementReady');
document.dispatchEvent(event);

// Search Box with Highlighted Bookmarks and Multiple Search Engines //
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('q');

let defaultEngine = 'brave';
let currentEngine = defaultEngine; 

const searchEngineNames = {
  'google': 'Google',
  'duckduckgo': 'DuckDuckGo',
  'perplexity': 'Perplexity',
  'reddit': 'Reddit'
};

function getSearchQuery(input) {
  if (input.startsWith('g ') || input.startsWith('d ') || input.startsWith('a ') || input.startsWith('y ') || input.startsWith('r ')){
    var parts = input.split(' ');
    var query = parts.slice(1).join(' ');
    return query;
  } else {
    return input;
  }
}

searchInput.addEventListener('input', () => {
  const query = getSearchQuery(searchInput.value);
  if (searchInput.value.startsWith('g ')) {
    currentEngine = 'google';
    searchForm.action = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    searchInput.style.borderColor = 'rgba(166, 209, 137, 1)';
    searchInput.style.outlineColor = 'rgba(166, 209, 137, 0.5)';
  } else if (searchInput.value.startsWith('d ')) {
    currentEngine = 'duckduckgo';
    searchForm.action = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    searchInput.style.borderColor = 'rgba(239, 159, 118, 1)';
    searchInput.style.outlineColor = 'rgba(239, 159, 118, 0.5)';
  } else if (searchInput.value.startsWith('a ')) {
    currentEngine = 'amazon';
    searchForm.action = 'https://www.amazon.com/s?k=' + encodeURIComponent(query);
    searchInput.style.borderColor = 'rgba(30, 102, 245, 1)';
    searchInput.style.outlineColor = 'rgba(30, 102, 245, 0.5)';
  } else if (searchInput.value.startsWith('y ')) {
    currentEngine = 'youtube';
    searchForm.action = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    searchInput.style.borderColor = 'rgba(230, 69, 83, 1)';
    searchInput.style.outlineColor = 'rgba(230, 69, 83, 0.5)';
  } else if (searchInput.value.startsWith('r ')) {
    currentEngine = 'reddit';
    searchForm.action = 'https://www.reddit.com/r/' + encodeURIComponent(query);
    searchInput.style.borderColor = 'rgba(254, 100, 11, 1)'; 
    searchInput.style.outlineColor = 'rgba(254, 100, 11, 0.5)';
  } else {
    currentEngine = defaultEngine;
    searchForm.action = 'https://perplexity.ai/search'; 
    searchInput.style.borderColor = '';
    searchInput.style.outlineColor = '';
  }
});

searchForm.addEventListener('submit', (e) => {
  let query = getSearchQuery(searchInput.value);

  if (query.startsWith('http://') || query.startsWith('https://')) {
    e.preventDefault();
    window.location.href = query;
    return;
  } else if (query.endsWith('.com') || query.endsWith('.org') || query.endsWith('.net') || query.endsWith('.co.uk')) {
    e.preventDefault();
    window.location.href = 'http://' + query;
    return;
  }

  if (currentEngine === 'google') {
    e.preventDefault();
    window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
  } else if (currentEngine === 'duckduckgo') {
    e.preventDefault();
    window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
  } else if (currentEngine === 'amazon') {
    e.preventDefault();
    window.location.href = 'https://www.amazon.com/s?k=' + encodeURIComponent(query);
  } else if (currentEngine === 'youtube') {
    e.preventDefault();
    window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
  } else if (currentEngine === 'reddit') {
    e.preventDefault();
    window.location.href = 'https://www.reddit.com/r/' + encodeURIComponent(query);
  } else if (currentEngine === 'perplexity') { 
    e.preventDefault();
    window.location.href = 'https://search.perplexity.ai/search?q=' + encodeURIComponent(query);
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace' && searchInput.value === '') {
    currentEngine = defaultEngine;
    searchForm.action = 'https://search.brave.com/search';
    searchInput.style.borderColor = '';
    searchInput.style.outlineColor = '';
  }
});
