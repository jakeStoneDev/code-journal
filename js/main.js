/* global data */
/* exported data */
/* Content loaded and view set */
document.addEventListener('DOMContentLoaded', function () {
  loadEntries(data);

  if (data.view === 'entries') {
    showEntries();
  } else {
    data.view = 'entry-form';
    showEntryForm();
  }
});

/* Sets img on entry form before submit */
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

/* getting form elements */

var form = document.getElementById('form');

/* adding event listener for submit and setting input values */
form.addEventListener('submit', function (event) {

  event.preventDefault();

  /* if an entry is being edited, match the id and change the values to user input */
  if (data.editing !== null) {

    for (var i = 0; i < data.entries.length; i++) {

      if (data.editing.entryId === data.entries[i].entryId) {

        data.editing.title = form.elements.title.value;

        data.editing.notes = form.elements.notes.value;

        data.editing.image = imgUrl.value;

      }
    }
    showEntries();
    return data.editing;
  }
  /* New UserInput Object */
  var userInput = {
    title: '',
    notes: '',
    image: '',
    entryId: ''
  };

  /* UserInput Object values are set by input */
  userInput.title = form.elements.title.value;

  userInput.notes = form.elements.notes.value;

  userInput.image = imgUrl.value;

  userInput.entryId = data.nextEntryId;

  /* data object is updated with the new entry */
  data.nextEntryId++;

  data.entries.unshift(userInput);

  /* storing input values locally */
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);

  /* reset form */
  document.getElementById('form').reset();
  placeholderImg.src = 'images/placeholder-image-square.jpg';

  showEntries();
});

/* Loops through data.entries and prepends each index to page */
var entryContainer = document.getElementById('entry-list');
var placeholder = document.getElementById('no-entry');

function loadEntries(data) {

  if (data.entries.length === 0) {

    entryContainer.style.display = 'none';
    placeholder.style.display = '';
  } else {
    entryContainer.style.display = '';
    placeholder.style.display = 'none';
  }
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var newEntry = addEntry(data.entries[i]);

    entryContainer.prepend(newEntry);
  }
}

/* This function turns UserInput into a DOM elements */
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

  var editPen = document.createElement('img');
  editPen.src = 'images/purpPen.svg';
  editPen.className = 'absoluteImg';
  editPen.setAttribute('entryId', entry.entryId);
  /* appends the new elements to their parent element */
  newEntryCol.appendChild(title);
  newEntryCol.appendChild(editPen);
  newEntryCol.appendChild(entryNotes);
  imgEntryCol.appendChild(imgURL);
  newEntryRow.appendChild(imgEntryCol);
  newEntryRow.appendChild(dividerCol);
  newEntryRow.appendChild(newEntryCol);
  var newEntry = document.createElement('li');
  newEntry.className = 'entry';
  newEntry.appendChild(newEntryRow);

  if (placeholder) {
    placeholder.style.display = 'none';
  }

  return newEntry;
}

entryContainer.addEventListener('click', function (event) {

  if (event.target.className !== 'absoluteImg') {
    return false;
  } else {
    for (var i = data.entries.length - 1; i >= 0; i--) {

      if (data.entries[i].entryId === parseInt(event.target.getAttribute('entryId'))) {
        form.elements.title.value = data.entries[i].title;

        placeholderImg.src = data.entries[i].image;
        imgUrl.value = data.entries[i].image;

        form.elements.notes.value = data.entries[i].notes;

        data.editing = data.entries[i];
        var inputToJSON = JSON.stringify(data);
        localStorage.setItem('javascript-local-storage', inputToJSON);
        showEntryForm();

      }
    }
  }
});

/* click event on anchor to change views to entries */
var entriesTab = document.querySelector('.entries-anchor');

var entries = document.querySelector('[data-view="entries"]');

var entryForm = document.querySelector('[data-view="entry-form"]');

/* click event on nav item for entries page view */
function showEntries() {

  entryContainer.innerHTML = '';

  loadEntries(data);

  data.view = 'entries';
  entryForm.className = 'view-hidden';
  entries.className = 'view';

  // Save view to local storage
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);
}

/* when user clicks entries, show entries page */
entriesTab.addEventListener('click', function () {
  data.view = 'entries';
  showEntries();
});

/* click event on new button to return to input form */
function showEntryForm() {

  data.view = 'entry-form';

  entries.className = 'view-hidden';
  entryForm.className = 'view';

  // Save view to local storage
  var inputToJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', inputToJSON);
}

/* When user clicks new button, show entry form */
var newButton = document.getElementById('newEntryButton');

newButton.addEventListener('click', function () {
  form.reset();
  placeholderImg.src = 'images/placeholder-image-square.jpg';
  showEntryForm();
});
