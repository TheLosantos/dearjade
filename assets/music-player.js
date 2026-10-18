const music = document.querySelector("#birthday-music");
const musicToggle = document.querySelector("#music-toggle");
const musicDisabledForSession = sessionStorage.getItem("birthdayMusicDisabled") === "true";

function setMusicPlaying(isPlaying) {
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
}

music.addEventListener("error", () => {
  musicToggle.disabled = true;
  console.error("Lagu tidak dapat dimuat.", music.error);
});

musicToggle.addEventListener("click", async () => {
  if (!music.paused) {
    music.pause();
    setMusicPlaying(false);
    sessionStorage.setItem("birthdayMusicDisabled", "true");
    return;
  }

  try {
    await music.play();
    setMusicPlaying(true);
    sessionStorage.removeItem("birthdayMusicDisabled");
  } catch (error) {
    setMusicPlaying(false);
    console.warn("Pemutaran musik tidak dapat dimulai.", error);
  }
});

if (musicDisabledForSession) {
  setMusicPlaying(false);
} else {
  music.play().then(
    () => setMusicPlaying(true),
    () => setMusicPlaying(false)
  );
}
