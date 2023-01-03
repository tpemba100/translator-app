//selecting all the select options
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected; //to select english and japanese as default option
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    //a HTML variable with template literals for value and
    let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); // adds option tag inside the select tags
  }
});

exchangeIcon.addEventListener("click", () => {
  // switching values from language option and text

  let tempoText = fromText.value,
    tempLang = selectTag[0].value;

  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;

  toText.value = tempoText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  let translateFrom = selectTag[0].value; // getting from tag value
  let translateTo = selectTag[1].value; // getting to tag value

  if (!text) return; //return nothing if the input is empty
  toText.setAttribute("placeholder", "Translating..");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  // fetching API
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder", "Translation..");
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    //targets all the copy icons with class (fa-copy)
    if (target.classList.contains("fa-copy")) {
      //check if clicked is from Text or to Texxt
      if (target.id == "from") {
        console.log("From Text was Copied");
        navigator.clipboard.writeText(fromText.value); //writeText writes text string to system clipboard
      } else {
        console.log("To Text was Copied");
        navigator.clipboard.writeText(toText.value); //writeText writes text string to system clipboard
      }
    } else {
      //IF the Exchange icon was pressed
      let utterance;
      if (target.id == "from") {
        // SSIU is a speech request to browser
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value; // setting the language to the from Language
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      const synth = window.speechSynthesis;

      // SpeechSynthesis.speak(utterance);
      synth.speak(utterance);
    }
  });
});
