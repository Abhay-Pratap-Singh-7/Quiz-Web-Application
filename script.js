const question = document.getElementById('hehe')
const answers = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4')]
const next_button = document.getElementById('next-btn')
const quizScore = document.getElementById('heading')

var count = 0;
var correctAnsIndex = -1;
var data = {};
var score = 0;

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

async function fetchQuestions() {
  const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    catch(error){
      if (error.message.includes('Failed to fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

function displayQuestion(count,data) {

  if ( count >= 10 ){
    quizScore.textContent = 'Score is : ' + score;
    question.style.display = 'none';
    for ( var i = 0; i < answers.length; i++ ){
      answers[i].style.display = 'none';
    }
    answers.style.display = 'none';
    next_button.style.display = 'none';
  }

    try {
        console.log(data);
        question.textContent = data.results[count].question
        const correct = data.results[count].correct_answer;
        const allAnswer = [data.results[count].correct_answer, data.results[count].incorrect_answers[0], data.results[count].incorrect_answers[1], data.results[count].incorrect_answers[2]]
        const shuffledAnswers = shuffleArray(allAnswer);
        
        correctAnsIndex = shuffledAnswers.indexOf(correct);

        answers.forEach((ans) => {
          ans.style.backgroundColor = "white";
        })
        
        answers[0].textContent = shuffledAnswers[0]
        answers[1].textContent = shuffledAnswers[1]
        answers[2].textContent = shuffledAnswers[2]
        answers[3].textContent = shuffledAnswers[3]
        return data;
    }
    catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}


function isCorrectAns(selectedIndex) {
  if (selectedIndex === correctAnsIndex) {
    answers[selectedIndex].style.backgroundColor = "green";
    score = score + 1;
  } else {
    answers[selectedIndex].style.backgroundColor = "red";
    answers[correctAnsIndex].style.backgroundColor = "green"; // highlight correct one
  }
}

for(let i=0;i<answers.length;i++)
{
  answers[i].addEventListener("click", () => {
    isCorrectAns(i);
  });
}

next_button.addEventListener('click', () =>{
  count=count+1;
  console.log("next",data, count);
  
  displayQuestion(count,data);
})
fetchQuestions().then((data) => {
  console.log(data);
  this.data = data
  displayQuestion(count,data);
})



