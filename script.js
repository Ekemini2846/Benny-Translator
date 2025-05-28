const selectCountry = document.querySelectorAll("select");
const fromText = document.querySelector(".from_text");
const toText = document.querySelector(".to_text");
const themeSwitch = document.getElementById("themeSwitch");

// Populate dropdowns with countries
selectCountry.forEach((select, index) => {
  for (let country in countries) {
    let option = document.createElement("option");
    option.value = country;
    option.innerText = countries[country];
    // Set defaults: English to English
    if ((index === 0 && country === "en-GB") || (index === 1 && country === "es-ES")) {
      option.selected = true;
    }
    select.appendChild(option);
  }
});

// Translation as you type
fromText.addEventListener("input", async () => {
  const text = fromText.value.trim();
  if (!text) {
    toText.value = "";
    return;
  }

  const translateFrom = selectCountry[0].value;
  const translateTo = selectCountry[1].value;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    toText.value = data.responseData.translatedText;
  } catch (err) {
    toText.value = "Error translating.";
    console.error(err);
  }
});

// Dark mode toggle
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Copy buttons
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Example usage inside your copy event
document.getElementById("copyTo").addEventListener("click", () => {
  const toText = document.querySelector(".to_text");
  if (toText.value.trim() !== "") {
    navigator.clipboard.writeText(toText.value);
    showToast("Copied!");
  }
});

