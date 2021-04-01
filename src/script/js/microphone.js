import refs from './refs';
const inputSearchMicroRef = document.querySelector(
  '.search__input-wrapper .search__input',
);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

refs.microphone.addEventListener('click', clickOnMicrophone);

function clickOnMicrophone() {
  if (!refs.microphone.classList.contains('active-microphone')) {
    refs.microphone.classList.add('active-microphone');
    startRecognition();
    return;
  }
  refs.microphone.classList.remove('active-microphone');
  stopRecognition();
}

function listenSpeech(e) {
  let transcript = Array.from(e.results)
    .map(result => result[0].transcript)
    .join('');

  //  transcript = transcript[0].toUpperCase() + transcript.slice(1);
  inputSearchMicroRef.value = transcript;

  if (e.results[0].isFinal) {
    stopRecognition();
    refs.microphone.classList.remove('active-microphone');
  }
}

function startRecognition() {
  recognition.addEventListener('result', listenSpeech);
  recognition.start();
}

function stopRecognition() {
  recognition.stop();
  recognition.removeEventListener('result', listenSpeech);
}