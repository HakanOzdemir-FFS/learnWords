const word = document.querySelector(".words");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const check = document.getElementById("check-answer");
const trueFalseContainer = document.querySelector(".true-or-false");
const reset = document.getElementById("reset");
const result = document.querySelector(".result");
const practiceBtn = document.getElementById("practice");
const unknownList = document.getElementsByTagName("ol")[0];

let anahtarlar = Object.keys(sozluk);
let randomNumber;

let isWordDisplayed = false;
let selectedWordValue;
let ornekler;

let trueOrFalse = [0, 0];

submit.addEventListener("click", () => {
  if (isWordDisplayed) {
    checkSubmit(selectedWordValue);
    answer.value = "";
    isWordDisplayed = false;
    submit.innerText = "Kelime Göster";
    trueFalseContainer.innerHTML = `Doğru : <span style="color:#344e41">${trueOrFalse[0]}</span>  Yanlış : <span style="color:#e76f51">${trueOrFalse[1]}</span> `;
    result.innerHTML =
      selectedWordValue +
      "<br><br>Örnek Cümle: " +
      (Array.isArray(ornekler) ? ornekler.join("<br>") : ornekler);
  } else {
    if (anahtarlar.length === 0) {
      check.innerHTML = "Tüm kelimeler gösterildi!";
      check.style.color = "BLUE";
      practiceBtn.style.display = "block";
      answer.value = "";
      return;
    }

    word.innerHTML = rastgeleKelime();
    selectedWordValue = sozluk[anahtarlar[randomNumber]].anlamlar; // Seçilen kelimenin değerini sakla
    ornekler = sozluk[anahtarlar[randomNumber]].ornekCumleler;
    isWordDisplayed = true;
    submit.innerText = "Cevabı Kontrol Et";
    anahtarlar.splice(randomNumber, 1);
    answer.value = "";
    result.innerHTML = "";
  }
});

function rastgeleKelime() {
  randomNumber = Math.floor(Math.random() * anahtarlar.length);
  return anahtarlar[randomNumber];
}

function checkSubmit(correctValue) {
  let isCorrect = false;

  if (Array.isArray(correctValue)) {
    isCorrect = correctValue.includes(answer.value.trim());
  } else {
    isCorrect = answer.value.trim() === correctValue;
  }

  if (isCorrect) {
    check.innerHTML = "DOĞRU";
    check.style.color = "#344e41";
    trueOrFalse[0]++;
    if (wrongWordsArray.includes(word.innerHTML)) {
      wrongWordsArray = wrongWordsArray.filter(
        (item) => item !== word.innerHTML
      );
      anahtarlar = anahtarlar.filter((item) => item !== word.innerHTML);
    }
  } else {
    check.innerHTML = "YANLIŞ";
    check.style.color = "#e76f51";
    trueOrFalse[1]++;
    addWrongWord(word.textContent);
  }
  if (wrongWordsArray.includes(word.innerHTML)) {
    wrongWordsArray = wrongWordsArray.filter((item) => item !== word.innerHTML);
    anahtarlar = anahtarlar.filter((item) => item !== word.innerHTML);
  }
}

answer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submit.click();
    event.preventDefault();
  }
});

reset.addEventListener("click", () => {
  // Değişkenleri başlangıç durumuna getir
  isWordDisplayed = false;
  selectedWordValue = null;
  trueOrFalse = [0, 0];
  unknownList.innerHTML = "";
  result.innerHTML = "";
  wrongWordsArray = [];
  practiceBtn.style.display ='none';

  // Ekranı başlangıç durumuna getir
  word.innerHTML = "";
  answer.value = "";
  check.innerHTML = "";
  check.style.color = "black";
  submit.innerText = "Kelime Göster";
  trueFalseContainer.innerHTML = `Doğru : <span style="color:#344e41">${trueOrFalse[0]}</span>  Yanlış : <span style="color:#e76f51">${trueOrFalse[1]}</span> `;

  anahtarlar = Object.keys(sozluk);
});

let wrongWordsArray = [];

function addWrongWord(wrongWord) {
  const wordDetail = {
    [wrongWord]: {
      anlamlar: sozluk[wrongWord].anlamlar,
      ornekCumleler: sozluk[wrongWord].ornekCumleler
    } 
  };

  const isWordExists = wrongWordsArray.some((word) => word.name === wrongWord);

  if (!isWordExists) {
    wrongWordsArray.push(wordDetail);
    let listItem = document.createElement("li");
    listItem.textContent = wrongWord;
    unknownList.appendChild(listItem);
  }
}

practiceBtn.addEventListener("click", () => {

  if (wrongWordsArray === 0) {
    alert("Yanlış cevaplanan kelime yok");
  }
  startPracticeMode();
  word.innerHTML = rastgeleKelime();
  console.log(wrongWordsArray);
});

function startPracticeMode() {
  anahtarlar = wrongWordsArray.map(wordObj => Object.keys(wordObj)[0]);
  isWordDisplayed = false;
  submit.innerText = "Kelime Göster";
  check.innerHTML = "";
  result.innerHTML = "";
  answer.value = "";
  unknownList.innerHTML = '';
  console.log(anahtarlar);
  practiceBtn.style.display ='none';
  wrongWordsArray = [];
}

