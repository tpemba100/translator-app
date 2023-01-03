//selecting all the select options
const selectTag = document.querySelectorAll("select");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected; //to select english and japanese as default option
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); // adds option tag inside the select tags
  }
});
