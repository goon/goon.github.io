// Assuming searchInput is already declared and accessible

// Initialize activeSuggestion to -1
let activeSuggestion = -1;

// Define your shortcuts and corresponding colors
const shortcuts = {
  'g': 'rgba(166, 209, 137, 0.5)',
  'd': 'rgba(239, 159, 118, 0.5)',
  'a': 'rgba(30, 102, 245, 0.5)',
  'y': 'rgb(230, 69, 83, 0.5)',
  'r': 'rgba(254, 100, 11, 0.5)',
  // Add more shortcuts and colors as needed
};

// Create a container for the dropdown menu
const dropdownMenu = document.createElement('div');
dropdownMenu.setAttribute('id', 'autocomplete-dropdown');
dropdownMenu.setAttribute('class', 'autocomplete-dropdown');
searchInput.parentNode.appendChild(dropdownMenu);

// Function to fetch suggestions
function fetchSuggestions(input, shortcutUsed) {
  // Remove the shortcut from the input
  const query = getSearchQuery(input);

  fetch(`https://api.allorigins.win/raw?url=https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
  .then(response => response.json())
  .then(data => {
      // Clear the dropdown menu
      dropdownMenu.innerHTML = '';

      // Get the suggestions
      const suggestions = data[1];

      // Limit the suggestions to the top 4
      suggestions.slice(0, 3).forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.setAttribute('class', 'suggestion-item');
        item.setAttribute('id', `suggestion-${index}`);
        item.setAttribute('tabindex', '0'); // make the item focusable
        item.textContent = suggestion;

        // Add a hover event listener to the suggestion item
        item.addEventListener('mouseover', () => {
          item.style.backgroundColor = shortcuts[shortcutUsed]; // color based on the shortcut used
        });
        item.addEventListener('mouseout', () => {
          item.style.backgroundColor = ''; // remove the background color when not hovering
        });

        // Add a click event listener to the suggestion item
        item.addEventListener('click', () => {
          // Populate the search box with the clicked suggestion
          searchInput.value = suggestion;

          // Clear the dropdown menu
          dropdownMenu.innerHTML = '';

          // Submit the form
          searchInput.form.submit();
        });

        dropdownMenu.appendChild(item);
      });
    });
}

// Attach an event listener to the search input field
searchInput.addEventListener('input', (event) => {
  // Detect the shortcut used
  let shortcutUsed = searchInput.value.charAt(0); // get the first character of the input

  fetchSuggestions(searchInput.value, shortcutUsed);
});

// Attach a keydown event listener to the search input field
searchInput.addEventListener('keydown', (event) => {
  const totalSuggestions = document.querySelectorAll('.suggestion-item').length;

  if (event.key === 'ArrowDown') {
    event.preventDefault(); // prevent the default action
    activeSuggestion = (activeSuggestion + 1) % totalSuggestions;
  } else if (event.key === 'ArrowUp') {
    event.preventDefault(); // prevent the default action
    activeSuggestion = (activeSuggestion - 1 + totalSuggestions) % totalSuggestions;
  }

  // Highlight the active suggestion
  document.querySelectorAll('.suggestion-item').forEach((item, index) => {
    if (index === activeSuggestion) {
      item.style.backgroundColor = shortcuts[shortcutUsed]; // color based on the shortcut used
    } else {
      item.style.backgroundColor = ''; // remove the background color when not active
    }
  });

  // If the enter key is pressed, select the active suggestion
  if (event.key === 'Enter' && activeSuggestion !== -1) {
    event.preventDefault(); // prevent the default action only if a suggestion is active
    searchInput.value = document.querySelector(`#suggestion-${activeSuggestion}`).textContent;
    dropdownMenu.innerHTML = '';
    activeSuggestion = -1; // reset activeSuggestion

    // Submit the form
    searchInput.form.submit();
  }
});