//? DOM
const quoteDisplayElement = document.querySelector('#quoteDisplay');
const quoteInputElement = document.querySelector('#quoteInput');
const timerElement = document.querySelector('#timer');

//? Event
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    // this will get all the span elements inside the quoteDisplayElement and return them in an array

    const arrayInput = quoteInputElement.value.split('');
    // this will get all the characters within the inputfield and return it as an array

    let checkCorrect = true;
    // This is to see if what we typed is entirely correct

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayInput[index];

        if (character === undefined) {
            // null means that we haven't typed that character yet (INPUT ARRAY)
            // WE WANT NO CLASSES ON THESE
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');

            checkCorrect = false;
            // (we didn't get all characters correct)
        }
        else if (character === characterSpan.textContent) {
            // checks if characters match between both arrays (adds correct and removes incorrect)
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');

            // correct stays true
        } else {
            // otherway around
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');

            checkCorrect = false;
            // we didn't get all correct

        }

    });

    if (checkCorrect) {
        renderNewQuote();
    }
    // if we get it all correct -> automatically get a new quote
})
// this is called every single time an "input" / change is made within the quoteInputElement
// we want to loop over all the characters inside the display array (spans) and then compare each character between the array and the INPUT and add classes depending on if they're the same or not 

//? How do we get a quote inside of our javascript 
// We use an api

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
// url for  our api

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        //we use the FETCH API  -> input the URL
        .then(response => response.json())
        // returns a promis and we get out response object -> we convert it into a JSON
        .then(data => data.content)
    // returns some data so we get the content key (data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    // clearing the innerHTML of this element (so we can put some other things inside after)

    quote.split('').forEach(quoteCharacter => {
        const characterSpan = document.createElement('span');
        characterSpan.textContent = quoteCharacter;
        quoteDisplayElement.appendChild(characterSpan);
    });
    //! This is for checking whether what we type is right or not (we can apply individual colours and stuff)
    // converting the entire string into an array using split('') -> if no character is inputted, converts every single character in the string into an array
    // loop over this array
    // for each character inside the array -> create a span element -> inside the span element is the VALUE OF EACH CHARACTER
    // these span elements are then APPENDED as children within the quoteDisplayElement

    quoteInputElement.value = '';
    console.log(quote);
    startTimer();
}
//! async functions allow them to return a PROMISE

let startTime;
// defining startTime

const startTimer = function () {
    timerElement.textContent = 0;
    startTime = new Date();
    // new Date just means getting the present time -> setting startTime to new Date
    setInterval(() => {
        timerElement.textContent = getTimerTime();
    }, 1000);
    // runs a certain function every 1000ms
    //! NOT ALWAYS REALLY ACCURATE SO WE USE DATES TO VERIFY / FIX this issue
};

const getTimerTime = function () {
    return Math.floor((new Date() - startTime) / 1000);
    // Math.floor rounds down (whole numbers)
    // new date - old date every second gives us an accurate timer.

};

renderNewQuote();

