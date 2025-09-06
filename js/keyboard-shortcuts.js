// --- Keyboard Shortcuts for MoviePlayer ---
(function() {
  let selectedIndex = -1;

  // Focus search box on "/" key
  document.addEventListener('keydown', function(e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      const searchBox = document.getElementById('searchQuery');
      if (searchBox) searchBox.focus();
    }
  });

  // Esc to close modal
  document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('playerModal');
    if (modal && modal.classList.contains('show') && e.key === "Escape") {
      // Replace with your modal close logic!
      if (typeof closeModal === "function") closeModal();
      else modal.classList.remove('show');
    }
  });

  // Arrow keys and Enter to navigate and activate search results
  document.addEventListener('keydown', function(e) {
    const searchBox = document.getElementById('searchQuery');
    const results = document.querySelectorAll('#results .search-item');
    if (searchBox && document.activeElement === searchBox && results.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % results.length;
        updateSelection(results, selectedIndex);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + results.length) % results.length;
        updateSelection(results, selectedIndex);
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        // Simulate play button click for selected item
        const playBtn = results[selectedIndex].querySelector('.play-btn');
        if (playBtn) playBtn.click();
        else results[selectedIndex].click();
      } else if (e.key === "Escape") {
        selectedIndex = -1;
        updateSelection(results, selectedIndex);
        searchBox.blur();
      }
    }
  });

  function updateSelection(results, idx) {
    results.forEach((item, i) => {
      if (i === idx) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // Optional: Style for the selected search item (injects CSS)
  const style = document.createElement('style');
  style.innerHTML = `
    .search-item.selected {
      border: 2.5px solid #fff;
      box-shadow: 0 0 32px #fff8, 0 0 8px #fff;
      background: rgba(60, 60, 60, 0.93);
      color: #fff;
      font-weight: bold;
      transition: box-shadow 0.18s, border 0.18s, background 0.18s;
    }
  `;
  document.head.appendChild(style);

  // Reset selection on new search
  const searchBox = document.getElementById('searchQuery');
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      selectedIndex = -1;
      const results = document.querySelectorAll('#results .search-item');
      updateSelection(results, selectedIndex);
    });
  }
})();
