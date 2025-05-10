const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const photoPreview = document.getElementById('photoPreview');
const videoPreview = document.getElementById('videoPreview');
const previewContainer = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.getElementById('closeBtn');
const toggleCameraBtn = document.getElementById('toggleCameraBtn');

let mediaStream = null;
let mediaRecorder;
let chunks = [];
let recording = false;
let pressTimer;
let currentFacing = "environment";
let availableCameras = [];

async function getAvailableCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === "videoinput");
}

async function initCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      facingMode: { exact: currentFacing },
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    },
    audio: true
  };

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = mediaStream;
  } catch (err) {
    // fallback for exact facingMode error
    console.warn("Exact facingMode failed, falling back to default.");
    const fallbackConstraints = {
      video: true,
      audio: true
    };
    mediaStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
    video.srcObject = mediaStream;
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

toggleCameraBtn.addEventListener('click', async () => {
  currentFacing = currentFacing === "environment" ? "user" : "environment";
  await initCamera();
});

window.addEventListener('load', async () => {
  availableCameras = await getAvailableCameras();
  if (availableCameras.length > 1) {
    toggleCameraBtn.classList.remove('hidden');
  }
  await initCamera();
});

window.addEventListener('resize', initCamera);
