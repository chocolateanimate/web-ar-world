const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const photoPreview = document.getElementById('photoPreview');
const videoPreview = document.getElementById('videoPreview');
const previewContainer = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.getElementById('closeBtn');

let mediaStream = null;
let mediaRecorder;
let chunks = [];
let recording = false;
let pressTimer;

async function initCamera() {
  try {
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 4096 },
        height: { ideal: 2160 }
      },
      audio: true
    };

    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = mediaStream;
  } catch (err) {
    alert("Could not access the camera.");
    console.error(err);
  }
}

function capturePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const dataURL = canvas.toDataURL('image/png');

  photoPreview.src = dataURL;
  photoPreview.classList.remove('hidden');
  videoPreview.classList.add('hidden');
  previewContainer.classList.remove('hidden');

  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'photo.png';
    a.click();
  };
}

function startRecording() {
  chunks = [];
  mediaRecorder = new MediaRecorder(mediaStream);
  mediaRecorder.ondataavailable = e => chunks.push(e.data);
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/mp4' });
    const videoURL = URL.createObjectURL(blob);
    videoPreview.src = videoURL;

    videoPreview.classList.remove('hidden');
    photoPreview.classList.add('hidden');
    previewContainer.classList.remove('hidden');

    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = videoURL;
      a.download = 'video.mp4';
      a.click();
    };
  };
  mediaRecorder.start();
  captureBtn.classList.add('recording');
  recording = true;
}

function stopRecording() {
  if (recording && mediaRecorder) {
    mediaRecorder.stop();
    captureBtn.classList.remove('recording');
    recording = false;
  }
}

captureBtn.addEventListener('mousedown', () => {
  pressTimer = setTimeout(() => {
    startRecording();
  }, 500);
});

captureBtn.addEventListener('mouseup', () => {
  clearTimeout(pressTimer);
  if (recording) {
    stopRecording();
  } else {
    capturePhoto();
  }
});

closeBtn.addEventListener('click', () => {
  previewContainer.classList.add('hidden');
});

window.addEventListener('load', initCamera);
window.addEventListener('resize', initCamera);
