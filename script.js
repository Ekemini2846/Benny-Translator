const selectCountry = document.querySelectorAll("select");
let fromText = document.querySelector(".from_text");
let toText = document.querySelector(".to_text");
const themeSwitch = document.getElementById("themeSwitch");

// Populate languages
for (let select of selectCountry) {
  for (let country in countries) {
    let option = document.createElement("option");
    option.value = country;
    option.innerText = countries[country];
    if (select.name === "from" && country === "en-GB") option.selected = true;
    if (select.name === "to" && country === "en-GB") option.selected = true;
    select.appendChild(option);
  }
}

// Instant translation
fromText.addEventListener("input", async () => {
  const text = fromText.value.trim();
  if (!text) {
    toText.value = "";
    return;
  }

  const translateFrom = selectCountry[0].value;
  const translateTo = selectCountry[1].value;
  const URL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    toText.value = data.responseData.translatedText;
  } catch (err) {
    toText.value = "Error translating.";
  }
});

// Toggle dark mode
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
