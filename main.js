let capitalData,
  flagData,
  randomNumber,
  correctAnswer,
  temp,
  score = 0;
let capitalQuestionText = document.querySelector(".capital-question span");
let capitalQuestion = document.querySelector(".capital-question");

let flagQuestion = document.querySelector(".flag-question");
let choices = document.getElementsByClassName("choice");
let choicesText = document.querySelectorAll(".choice span");
let main = document.querySelector(".main");
let end = document.querySelector(".end");
let finalScore = document.querySelector(".end span");
let btnTryAgain = document.querySelector(".end button");
let flagImg = document.querySelector(".flag-question img");

async function fetchCapitalData() {
  let response = await fetch("https://restcountries.com/v2/all?fields=capital");
  capitalData = await response.json();
  capitalData.splice(111, 1);

  return capitalData;
}

async function fetchFlagData() {
  let response = await fetch("https://restcountries.com/v2/all?fields=flags");
  flagData = await response.json();
  flagData.splice(111, 1);

  return flagData;
}
const generateQuestion = async function () {
  randomNumber = Math.floor(Math.random() * 250);
  await fetchCapitalData();
  let response = await fetch(
    "https://restcountries.com/v2/capital/" + capitalData[randomNumber].capital
  );
  let responseJson = await response.json();
  correctAnswer = responseJson[0].name;
  [generateFlagQuestion, generateCapitalQuestion][
    Math.floor(Math.random() * 2)
  ]();
  let randomChoice = Math.floor(Math.random() * 4);
  for (let i = 0; i < choicesText.length; i++) {
    choices[i].style.backgroundColor = "white";
    choices[i].style.color = "#6066d0";
    choices[i].onmouseover = function () {
      choices[i].style.backgroundColor = "#F9A826";
      choices[i].style.color = "white";
    };
    choices[i].onmouseout = function () {
      choices[i].style.backgroundColor = "white";
      choices[i].style.color = "#6066d0";
    };
    if (i == randomChoice) {
      choicesText[randomChoice].textContent = correctAnswer;
    } else {
      let response2 = await fetch(
        "https://restcountries.com/v2/capital/" +
          capitalData[Math.floor(Math.random() * 250)].capital
      );
      let response2Json = await response2.json();

      choicesText[i].textContent = response2Json[0].name;
    }
  }
  evaluate();
};
const generateCapitalQuestion = async function () {
  capitalQuestionText.textContent = capitalData[randomNumber].capital;

  flagQuestion.style.display = "none";
  capitalQuestion.style.display = "block";
  main.style.height = "559px";
};

const generateFlagQuestion = async function () {
  await fetchFlagData();
  flagImg.src = flagData[randomNumber].flags.svg;

  main.style.height = "629px";
  flagQuestion.style.display = "block";
  capitalQuestion.style.display = "none";
};

const evaluate = function () {
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].children[1].textContent == correctAnswer) {
      temp = i;
      choices[i].onclick = function () {
        choices[i].style.backgroundColor = "#60BF88";
        choices[i].style.color = "white";
        score++;
        generateQuestion();
      };
    } else {
      choices[i].onclick = function () {
        choices[i].style.backgroundColor = "#EA8282";
        choices[i].style.color = "white";
        choices[temp].style.backgroundColor = "#60BF88";
        choices[temp].style.color = "white";
        setTimeout(() => {
          finalScore.textContent = score;

          main.style.display = "none";
          end.style.display = "flex";
        }, 1000);
      };
    }
  }
};

btnTryAgain.onclick = function () {
  score = 0;
  generateQuestion();
  setTimeout(() => {
    main.style.display = "flex";
    end.style.display = "none";
  }, 500);
};
generateQuestion();
