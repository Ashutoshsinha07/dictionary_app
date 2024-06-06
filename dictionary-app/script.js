const form = document.querySelector("#search-form");
const resultdiv = document.querySelector(".result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = form.querySelector("input[name='word']").value;
  getWordInfo(word);
});

const getWordInfo = async (word) => {
  try {
    resultdiv.innerHTML = "Fetching Data...";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
    console.log("API Response:", data);
    resultdiv.innerHTML = `<h2><strong>Word:</strong>${data[0].word}</h2>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${
      definitions.definition === undefined
        ? "Not found"
        : definitions.definition
    }</p>
     <p><strong>Example:</strong>${
       definitions.example === undefined ? "Not found" : definitions.example
     }</p>
     <p>
       <strong>Antonyms:</strong>
     </p>`;
    if (definitions.antonyms.length === 0) {
      resultdiv.innerHTML += `<span>Not found</span>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultdiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }
    resultdiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
