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
var title = document.getElementById('title');
var notes = document.getElementById('notes');

/* adding event listener for submit and setting input values */
document.addEventListener('submit', function (event) {
  event.preventDefault();

  /* New UserInput Object */
  var userInput = {
    title: '',
    notes: '',
    image: '',
    entryId: ''
  };

  /* UserInput Object values are set by input */
  userInput.title = title.value;
  userInput.notes = notes.value;
  userInput.image = imgUrl.value;
  userInput.entryId = data.nextEntryId;

  /* if an entry is being edited, match the id and change the values to user input */
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].entryId) {
        data.entries[i].title = title.value;
        data.entries[i].notes = notes.value;
        data.entries[i].image = imgUrl.value;
      }
    }
    return;
  } else {
  /* data object is updated with the new entry */
    data.nextEntryId++;
    data.entries.unshift(userInput);
  }

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
function loadEntries(data) {
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
  title.textContent = entry.notes;

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

  var placeholder = document.getElementById('no-entry');
  placeholder.style.display = 'none';

  return newEntry;
}

entryContainer.addEventListener('click', function (event) {
  if (event.target.className !== 'absoluteImg') {
    return false;
  } else {
    for (var i = data.entries.length - 1; i >= 0; i--) {
      if (data.entries[i].entryId === parseInt(event.target.getAttribute('entryId'))) {
        title.value = data.entries[i].title;
        imgUrl.value = data.entries[i].image;
        notes.value = data.entries[i].notes;
        showEntryForm();
        data.editing = data.entries[i];
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
  loadEntries();

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
  showEntryForm();
});
