// --- Mini Player Logic FOR IFRAME ---

(function() {
  // Assumes modal: #playerModal, iframe: #playerFrame, minimize button: #minimizeBtn
  // Add a minimize button to your modal HTML: <button id="minimizeBtn">_</button>
  // Add a restore button inside mini player: <button id="restoreBtn">⤴</button>

  const modal = document.getElementById('playerModal');
  const iframe = document.getElementById('playerFrame');
  let miniPlayer = null;

  function createMiniPlayer() {
    if (miniPlayer) return;

    miniPlayer = document.createElement('div');
    miniPlayer.id = 'miniPlayerDock';
    miniPlayer.innerHTML = `
      <iframe id="miniIframe" src="${iframe.src}" allowfullscreen style="width:160px;height:90px;background:#000;border-radius:8px;border:2px solid #ff9100;"></iframe>
      <button id="restoreBtn" style="margin-top:5px;">⤴</button>
    `;
    Object.assign(miniPlayer.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: '#222d',
      padding: '10px',
      borderRadius: '12px',
      boxShadow: '0 4px 32px #0008',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    });
    document.body.appendChild(miniPlayer);

    miniPlayer.querySelector('#restoreBtn').onclick = restorePlayer;

    // Hide modal
    modal.classList.remove('show');
  }

  function restorePlayer() {
    // Restore iframe src
    iframe.src = miniPlayer.querySelector('#miniIframe').src;
    modal.classList.add('show');
    miniPlayer.remove();
    miniPlayer = null;
  }

  // Minimize button event
  const minimizeBtn = document.getElementById('minimizeBtn');
  if (minimizeBtn) minimizeBtn.onclick = createMiniPlayer;

  // Optional: handle modal close, remove mini player
  window.addEventListener('beforeunload', () => {
    if (miniPlayer) miniPlayer.remove();
  });

  // Keyboard shortcut: "m" to minimize when modal is open
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === "m" && modal.classList.contains('show')) {
      createMiniPlayer();
    }
  });
})();
