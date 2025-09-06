// --- Mini Player Logic for MoviePlayer ---
(function() {
  // Assumes modal: #playerModal, video: #moviePlayer, minimize button: #minimizeBtn
  // Add a minimize button to your modal HTML: <button id="minimizeBtn">_</button>
  // Add a restore button inside mini player: <button id="restoreBtn">⬆</button>

  const modal = document.getElementById('playerModal');
  const video = document.getElementById('moviePlayer');
  let miniPlayer = null;

  function createMiniPlayer() {
    if (miniPlayer) return;

    miniPlayer = document.createElement('div');
    miniPlayer.id = 'miniPlayerDock';
    miniPlayer.innerHTML = `
      <video id="miniVideo" src="${video.src}" controls style="width:160px;height:90px;background:#000;border-radius:8px;"></video>
      <button id="restoreBtn" style="margin-top:5px;">⬆</button>
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

    // Sync playback time
    const miniVid = miniPlayer.querySelector('#miniVideo');
    miniVid.currentTime = video.currentTime;
    miniVid.volume = video.volume;
    miniVid.play();

    // Restore button
    miniPlayer.querySelector('#restoreBtn').onclick = restorePlayer;

    // Pause big player, hide modal
    video.pause();
    modal.classList.remove('show');
  }

  function restorePlayer() {
    if (!miniPlayer) return;
    // Sync time back
    video.currentTime = miniPlayer.querySelector('#miniVideo').currentTime;
    video.volume = miniPlayer.querySelector('#miniVideo').volume;
    video.play();

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
