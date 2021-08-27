/* global data */
/* exported data */

/* THIS IS MY MAIN JAVASCRIPT FILE */
/* This bit of code sets the image url to the match the valid url input of the user */
var imgUrl = document.getElementById('photo');

var placeholderImg = document.getElementById('placed-image');

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

imgUrl.addEventListener('input', function (e) {
  if (validURL(imgUrl.value)) {
    placeholderImg.src = imgUrl.value;
  }
});

/* Below this line, listens for the submit event to occur */
var userInput = {
  title: '',
  notes: '',
  image: '',
  nextEntryID: ''
};

/* read local storage for JSON */
var nextEntryID;
var previousUserInput;
var previousUserInputJSON = localStorage.getItem('javascript-local-storage');

/* getting previous entry ID and incrementing */
if (previousUserInputJSON !== null) {
  previousUserInput = JSON.parse(previousUserInputJSON);
  nextEntryID = previousUserInput.nextEntryID + 1;
} else {
  nextEntryID = 1;
}

/* getting form elements */
var title = document.getElementById('title');
var notes = document.getElementById('notes');

/* adding event listener for submit and setting input values */
document.addEventListener('submit', function (event) {

  userInput.title = title.value;
  userInput.notes = notes.value;
  userInput.image = imgUrl.value;
  userInput.nextEntryID = nextEntryID;

  /* converting input values to json string and storing locally */
  var inputToJSON = JSON.stringify(userInput);
  localStorage.setItem('javascript-local-storage', inputToJSON);
});
