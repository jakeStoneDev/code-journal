/* global data */
/* exported data */
/* branch2 */
/* THIS IS MY MAIN JAVASCRIPT FILE */
/* Content loaded */
document.addEventListener('DOMContentLoaded', function () {
  loadEntries(data);
  if (data.view === 'entries') {
    showEntries();
  } else {
    data.view = 'entry-form';
    showEntryForm();
  }

});

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
/* read local storage for JSON */
var newEntryId;
var nextEntryId;
var previousUserInput;
var previousUserInputJSON = localStorage.getItem('javascript-local-storage');
/* getting previous entry ID and incrementing */
if (previousUserInputJSON !== null) {
  previousUserInput = JSON.parse(previousUserInputJSON);
  newEntryId = previousUserInput.nextEntryId;
  nextEntryId = previousUserInput.nextEntryId + 1;
  /* get prior data object */
  if (previousUserInput) {
    data.entries = previousUserInput.entries;
    data.nextEntryId = nextEntryId;
    data.view = previousUserInput.view;
  }
} else {
  newEntryId = 0;
  nextEntryId = 1;
}

/* getting form elements */
var title = document.getElementById('title');
var notes = document.getElementById('notes');
/* adding event listener for submit and setting input values */
document.addEventListener('submit', function (event) {
  event.preventDefault();
  /* form object */
  var userInput = {
    title: '',
    notes: '',
    image: '',
    entryID: ''
  };
  userInput.title = title.value;
  userInput.notes = notes.value;
  userInput.image = imgUrl.value;
  userInput.entryID = newEntryId;

  /* add new data to data object */
  data.entries.unshift(userInput);
  document.getElementById('form').reset();
  placeholderImg.src = 'images/placeholder-image-square.jpg';
  /* converting input values to json string and storing locally */
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);

  entriesPage.className = 'view-hidden';
  inputForm.className = 'view';
  /* takes current user input and turns it into dom element. Prepends it to page */
  addEntry(userInput);
  /* clear form input */
  document.getElementById('form').reset();
  placeholderImg.src = 'images/placeholder-image-square.jpg';
  showEntries();
});

/* Places dom elements on page load */
function loadEntries(data) {
  /* Loops through stored data and uses data for new elements */
  for (var i = data.entries.length - 1; i >= 0; i--) {
    /* Creates new elements using DOM */
    addEntry(data.entries[i]);
  }
}

var entryContainer = document.getElementById('entry-list');
/* This function turns entry data into a DOM element */
function addEntry(entry) {
  var newEntryRow = document.createElement('div');
  newEntryRow.className = 'entries-row';

  var newEntryCol = document.createElement('div');
  newEntryCol.className = 'entries-col';

  var imgEntryCol = document.createElement('div');
  imgEntryCol.className = 'entries-col-img';

  var dividerCol = document.createElement('div');
  dividerCol.className = 'entries-divider-col';

  var title = document.createElement('h2');
  title.className = 'entries-title';
  title.textContent = entry.title;

  var imgURL = document.createElement('div');
  imgURL.className = 'img-wrapper1';
  imgURL.style.backgroundImage = 'url(' + entry.image + ')';

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  entryNotes.className = 'entries-text';

  /* appends the new elements to their parent element */
  newEntryCol.appendChild(title);
  newEntryCol.appendChild(entryNotes);
  imgEntryCol.appendChild(imgURL);
  newEntryRow.appendChild(imgEntryCol);
  newEntryRow.appendChild(dividerCol);
  newEntryRow.appendChild(newEntryCol);
  var NewEntry = document.createElement('li');
  NewEntry.className = 'entry';
  NewEntry.appendChild(newEntryRow);
  /* This container holds an entire new entry */
  var placeholder = document.getElementById('no-entry');
  placeholder.style.display = 'none';
  /* Adds entry to front of entries */
  entryContainer.prepend(NewEntry);
}

/* click event on anchor to change views to entries */
var entriesTab = document.querySelector('.entries-anchor');
var entriesPage = document.querySelector('[data-view="entries"]');
var inputForm = document.querySelector('[data-view="entry-form"]');

/* click event on nav item for entries page view */
function showEntries() {
  data.view = 'entries';

  inputForm.className = 'view-hidden';
  entriesPage.className = 'view';

  // Save view to local storage
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);

}
entriesTab.addEventListener('click', function () {
  data.view = 'entries';
  showEntries();
});

/* click event on new button to return to input form */
function showEntryForm() {
  data.view = 'entry-form';

  entriesPage.className = 'view-hidden';
  inputForm.className = 'view';

  // Save view to local storage
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);
}

var newButton = document.getElementById('newEntryButton');
newButton.addEventListener('click', function () {
  showEntryForm();
});
