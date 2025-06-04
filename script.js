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
    // Default: English for "from", Spanish for "to"
    if ((index === 0 && country === "en-GB") || (index === 1 && country === "es-ES")) {
      option.selected = true;
    }
    select.appendChild(option);
  }
});

// Translation as you type with debounce (to avoid too many API calls)
let debounceTimer;
fromText.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(translateText, 500);
});

async function translateText() {
  const text = fromText.value.trim();
  if (!text) {
    toText.value = "";
    return;
  }

  const translateFrom = selectCountry[0].value;
  const translateTo = selectCountry[1].value;

  // Using MyMemory API
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      toText.value = data.responseData.translatedText;
    } else {
      toText.value = "No translation found.";
    }
  } catch (err) {
    toText.value = "Error during translation.";
    console.error(err);
  }
}

// Dark mode toggle
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Copy translation button
document.getElementById("copyTo").addEventListener("click", () => {
  if (toText.value.trim() !== "") {
    navigator.clipboard.writeText(toText.value);
    showToast("Copied!");
  }
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
