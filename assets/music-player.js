const music = document.querySelector("#birthday-music");
const musicToggle = document.querySelector("#music-toggle");
const musicStatus = document.querySelector("#music-status");
const musicDisabledForSession = sessionStorage.getItem("birthdayMusicDisabled") === "true";

function setMusicPlaying(isPlaying) {
  musicToggle.textContent = isPlaying ? "Matikan musik" : "Putar musik";
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

function showPlaybackFailure() {
  setMusicPlaying(false);
  musicStatus.textContent = music.error
    ? "Lagu tidak dapat dimuat."
    : "Autoplay diblokir. Tekan tombol untuk memutar lagu.";
}

music.addEventListener("error", () => {
  musicStatus.textContent = "Lagu tidak dapat dimuat.";
  musicToggle.disabled = true;
});

musicToggle.addEventListener("click", async () => {
  if (!music.paused) {
    music.pause();
    setMusicPlaying(false);
    musicStatus.textContent = "";
    sessionStorage.setItem("birthdayMusicDisabled", "true");
    return;
  }

  try {
    await music.play();
    setMusicPlaying(true);
    musicStatus.textContent = "";
    sessionStorage.removeItem("birthdayMusicDisabled");
  } catch {
    showPlaybackFailure();
  }
});

if (musicDisabledForSession) {
  setMusicPlaying(false);
} else {
  music.play().then(
    () => setMusicPlaying(true),
    showPlaybackFailure
  );
}
