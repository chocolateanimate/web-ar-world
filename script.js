// 🔹 Replace these variables
const LENS_WEB_URL = "https://lens.snap.com/experience/3551b071-c9aa-4a81-a798-262fe59ffe68";
const SNAPCHAT_DEEP_LINK = "snapchat://lens/3551b071-c9aa-4a81-a798-262fe59ffe68";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.snapchat.android";
const APP_STORE_URL = "https://apps.apple.com/app/snapchat/id447188370";

// Web button
document.getElementById("web-btn").addEventListener("click", () => {
  window.location.href = LENS_WEB_URL;
});

// App button
document.getElementById("app-btn").addEventListener("click", () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const storeURL = isIOS ? APP_STORE_URL : PLAY_STORE_URL;

  // Try to open Snapchat app
  window.location.href = SNAPCHAT_DEEP_LINK;

  // If app not installed, go to store after delay
  setTimeout(() => {
    window.location.href = storeURL;
  }, 1500);
});
