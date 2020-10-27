const store = {
  // 5 or more questions are required
  questions: [
    {
      question: `What is Mr. Krabs' full name?`,
      answers: [
        'Krusty Krabs',
        'Eugene Krabs',
        'Eugene H. Krabs',
        'Ernest K. Krabs'
      ],
      correctAnswer: `Eugene H. Krabs`,
      imgSrc: 'images/eugene-krabs.jpg'
    },
    {
      question: `What's the Krabby Patty secret formula?`,
      answers: [
        '(X-2)+1',
        'Nothing',
        'Plankton',
        'Two parts chum, one part kelp'
      ],
      correctAnswer: '(X-2)+1',
      imgSrc: 'images/krabby-patty.jpg'
    },
    {
      question: `Spongebob and Patrick were traveling _ salesmen.`,
      answers: [
        'Bible',
        'Chocolate',
        'Krabby Patty',
        'Purse'
      ],
      correctAnswer: 'Chocolate',
      imgSrc: 'images/spongebob-salesmen.jpg'
    },
    {
      question: `What is Plankton's wife name?`,
      answers: [
        'Karen',
        'Susan',
        'Amy',
        'Betty'
      ],
      correctAnswer: 'Karen',
      imgSrc: 'images/plankton-wife.jpg'
    },
    {
      question: `What does F.U.N. stand for?`,
      answers: [
        'Fish Until New Years.',
        'Friends who do stuff together, U and me, Anywhere, Anytime at all.',
        'Frolicking through the flowers, Ukelele, Nose-picking.',
        'Nothing.'
      ],
      correctAnswer: 'Friends who do stuff together, U and me, Anywhere, Anytime at all.',
      imgSrc: 'images/f-u-n.png'
    },
    {
      question: `How do you get rid of sea bears?`,
      answers: [
        'Draw an oval in the sand.',
        'Make yourself look bigger.',
        'Lie on the ground and play dead.',
        'Draw a circle in the sand and get inside.'
      ],
      correctAnswer: 'Draw a circle in the sand and get inside.',
      imgSrc: 'images/spongebob-sea-bear.png'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

const grabStart = () => {
  return ` <h2>Test your Spongebob knowledge!</h2>
  <div class="block">
  <br>
    <img src="images/spongebob-fan-art.png" id="beginQuiz" width="600"><br />
    <button id="beginQuiz">
      <h2>Click Here!</h2>
    </button>
    <p class="tally">${store.questions.length} questions total!</p>
  </div>`
}

const grabQuestion = (i) => {
  store.questionNumber++
  let option = store.questions[i].answers
  return `<h2>${store.questions[i].question}</h2>
          <div class="block questions">
            <h3>Question ${store.questionNumber}</h3>
            <form id="questionForm">                
              <input type="radio" id="A"  value="${option[0]}" name="spaceqs" required></input>
              <label for="A">${option[0]}</label>
              <input type="radio" id="B" value="${option[1]}" name="spaceqs" required></input>
              <label for="B">${option[1]}</label>
              <input type="radio" id="C" value="${option[2]}" name="spaceqs" required></input>
              <label for="C">${option[2]}</label>
              <input type="radio" id="D" value="${option[3]}" name="spaceqs" required></input>
              <label for="D">${option[3]}</label>
              <input type="submit" value="submit">
            </form>
            <p class="tally">Correct: ${store.score}, Incorrect: ${i - store.score}</p>
          </div>`
}

const grabAnswer = (results, i) => {
  return `
  <div class="block">
    <h3>${results === "correct" ? "You got it!" : "Sorry...the correct answer is:"}</h3>
    <img src="${store.questions[i].imgSrc}">
<p>${store.questions[i].correctAnswer}</p>
    <button id="nextQuestion">Next Question</button>
    <p class="tally">Correct: ${store.score}, Incorrect: ${store.questionNumber - store.score}</p>
  </div>`
}

const grabResults = () => {
  return `<h2>You Finished!</h2>
          <div class="block">
            <h3>Quiz complete!</h3>
            <p>You answered ${store.score} out of ${store.questions.length} questions correctly!</p>
            <button id="restartQuiz">Try again</button>
            <p></p>
            <p><i>"No, this is PATRICK."</i></p>
            <p>-Patrick</p>
          </div>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
const renderQuiz = (callback) => {
  if (store.quizStarted === false) {
    $('main').html(grabStart());
  }
  if (store.quizStarted === true) {
    $('main').html(callback);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

let index = 0;

const tally = () => {

  $('main').on('submit', event => {
    event.preventDefault()
    let correct = store.questions[index].correctAnswer
    let checked = $('input[name="spaceqs"]:checked').val()
    if (correct.includes(checked)) {
      store.score++
      renderQuiz(grabAnswer("correct", index))
      console.log("Yay!")
    } else {
      renderQuiz(grabAnswer("incorrect", index))
      console.log("lame...")
    }
    index++;
  })
}

const nextQuestion = () => {
  $('main').on('click', '#nextQuestion', event => {
    if (store.questionNumber === store.questions.length) {
      renderQuiz(grabResults())
    }
    else { renderQuiz(grabQuestion(index)) }
  }
  )
}

const beginQuiz = () => {
  $('main').on('click', '#beginQuiz', event => {
    store.quizStarted = true;
    $('main').html(grabQuestion(0))
  })
}

const restartQuiz = () => {
  $('main').on('click', '#restartQuiz', event => {
    index = 0;
    store.quizStarted = false;
    store.score = 0;
    store.questionNumber = 0;
    renderQuiz(grabStart());
  })
}

const main = () => {
  renderQuiz();
  beginQuiz();
  tally();
  nextQuestion();
  restartQuiz();
}

$(main);