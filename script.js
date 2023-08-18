const word = document.querySelector(".words");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const check = document.getElementById("check-answer");
const trueFalseContainer = document.querySelector(".true-or-false");
const reset = document.getElementById("reset");
const result = document.querySelector(".result");

let anahtarlar = Object.keys(sozluk);

let isWordDisplayed = false;
let selectedWordValue; // Seçilen kelimenin değerini saklayacak bir değişken
let ornekler;

let trueOrFalse = [0, 0];

submit.addEventListener("click", () => {
  if (isWordDisplayed) {
    // Eğer bir kelime zaten gösterildiyse, cevabı kontrol et.
    checkSubmit(selectedWordValue); // Seçilen kelimenin değerini fonksiyona aktar
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
      answer.value = "";
      return;
    }
    randomNumber = Math.floor(Math.random() * anahtarlar.length);
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
  } else {
    check.innerHTML = "YANLIŞ";
    check.style.color = "#e76f51";
    trueOrFalse[1]++;
  }
}

answer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submit.click(); // submit butonunun 'click' eventini tetikler
    event.preventDefault(); // Formun gönderilmesini engellemek için (eğer form içerisindeyse)
  }
});

reset.addEventListener("click", () => {
  // Değişkenleri başlangıç durumuna getir
  isWordDisplayed = false;
  selectedWordValue = null;
  trueOrFalse = [0, 0];

  // Ekranı başlangıç durumuna getir
  word.innerHTML = "";
  answer.value = "";
  check.innerHTML = "";
  check.style.color = "black";
  submit.innerText = "Kelime Göster";
  trueFalseContainer.innerHTML = `Doğru : <span style="color:#344e41">${trueOrFalse[0]}</span>  Yanlış : <span style="color:#e76f51">${trueOrFalse[1]}</span> `;

  // Anahtarlar listesini yeniden oluştur
  anahtarlar = Object.keys(sozluk);
});
