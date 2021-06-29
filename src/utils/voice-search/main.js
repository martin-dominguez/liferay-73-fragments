const searchForm = fragmentElement.querySelector(".form");
const searchFormInputWrapper = searchForm.querySelector(".search-bar-keywords-input-wrapper");
const searchFormInput = searchFormInputWrapper.querySelector(".search-bar-keywords-input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".voice-info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  //recognition.lang = "en-US";

  searchFormInputWrapper.insertAdjacentHTML("beforeend", '<button class="voice-button" type="button"><i class="icon icon-microphone"></i></button>');

  const micBtn = searchFormInputWrapper.querySelector(".voice-button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("icon-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("icon-microphone");
    micIcon.classList.add("icon-microphone-off");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("icon-microphone-off");
    micIcon.classList.add("icon-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()===configuration.stopCommand) {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()===configuration.searchCommand) {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()===configuration.resetCommand) {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
  }
  
  info.textContent = 'Comandos de voz: "' 
		+ configuration.stopCommand + '", "' 
		+ configuration.resetCommand + '", "' 
		+ configuration.searchCommand + '"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}