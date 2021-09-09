/* global data */
/* exported data */

/* Content loaded and view set */
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  loadEntries(data);

  console.log('data.view', data.view);
  if (data.view === 'entries') {
    showEntries();
  } else {
    data.view = 'entry-form';
    showEntryForm();
  }
  console.log('data.view', data.view);
});

/* Sets img on entry form before submit */
var imgUrl = document.getElementById('photo');
console.log('imgUrl', imgUrl);

var placeholderImg = document.getElementById('placed-image');
console.log('placeholderImg', placeholderImg);

function validURL(str) {
  console.log('validURL()');

  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}
imgUrl.addEventListener('input', function (e) {
  console.log('img url input');
  if (validURL(imgUrl.value)) {
    placeholderImg.src = imgUrl.value;
    console.log(imgUrl.value);
  }
});

/* getting form elements */
var title = document.getElementById('title');
console.log(title);
var notes = document.getElementById('notes');
console.log(notes);

/* adding event listener for submit and setting input values */
document.addEventListener('submit', function (event) {
  console.log('Submit Event');

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
  console.log('userInput.title', userInput.title);
  console.log('title.value', title.value);

  userInput.notes = notes.value;
  console.log('userInput.notes', userInput.notes);
  console.log('notes.value', notes.value);

  userInput.image = imgUrl.value;
  console.log('userInput.image', userInput.image);
  console.log('imgUrl.value', imgUrl.value);

  userInput.entryId = data.nextEntryId;
  console.log('userInput.entryId', userInput.entryId);
  console.log('data.nextEntryId', data.nextEntryId);

  /* if an entry is being edited, match the id and change the values to user input */
  console.log('data.editing', data.editing);
  if (data.editing !== null) {
    console.log('data.editing', data.editing);
    for (var i = 0; i < data.entries.length; i++) {
      console.log('data.entries.length', data.entries.length);
      console.log('data.entries[i].entryId', data.entries[i].entryId);

      if (data.editing === data.entries[i].entryId) {
        data.entries[i].title = title.value;
        console.log('data.entries[i].title', data.entries[i].title);
        console.log('title.value', title.value);

        data.entries[i].notes = notes.value;
        console.log('data.entries[i].notes', data.entries[i].notes);
        console.log('notes.value', notes.value);

        data.entries[i].image = imgUrl.value;
        console.log('data.entries[i].image', data.entries[i].image);
        console.log('imgUrl.value', imgUrl.value);
      }
    }
    return;
  } else {
  /* data object is updated with the new entry */
    console.log('data.nextEntryId', data.nextEntryId);
    data.nextEntryId++;
    console.log('data.nextEntryId', data.nextEntryId);

    console.log('data.entries', data.entries);
    data.entries.unshift(userInput);
    console.log('data.entries', data.entries);
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
var placeholder = document.getElementById('no-entry');

function loadEntries(data) {
  console.log('loadEntries()');

  console.log('data.entries.length', data.entries.length);
  if (data.entries.length === 0) {
    console.log('data.entries.length', data.entries.length);
    entryContainer.style.display = 'none';
    placeholder.style.display = '';
  } else {
    entryContainer.style.display = '';
    placeholder.style.display = 'none';
  }
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var newEntry = addEntry(data.entries[i]);
    console.log('data.entries[i]', data.entries[i]);
    console.log('newEntry', newEntry);

    console.log('entryContainer', entryContainer);
    entryContainer.prepend(newEntry);
    console.log('entryContainer', entryContainer);
  }
}

/* This function turns UserInput into a DOM elements */
function addEntry(entry) {
  console.log('addEntry()');

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
  console.log('title', title);

  var imgURL = document.createElement('div');
  imgURL.className = 'img-wrapper1';
  imgURL.style.backgroundImage = 'url(' + entry.image + ')';
  console.log('imgUrl', imgUrl);

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  entryNotes.className = 'entries-text';
  console.log('entryNotes', entryNotes);

  var editPen = document.createElement('img');
  editPen.src = 'images/purpPen.svg';
  editPen.className = 'absoluteImg';
  editPen.setAttribute('entryId', entry.entryId);
  console.log('editPen', editPen);

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

  console.log('newEntry', newEntry);

  if (placeholder) {
    placeholder.style.display = 'none';
  }

  return newEntry;
}

entryContainer.addEventListener('click', function (event) {
  console.log('Click Event');

  console.log('event.target.className', event.target.className);
  if (event.target.className !== 'absoluteImg') {
    return false;
  } else {
    for (var i = data.entries.length - 1; i >= 0; i--) {
      console.log('data.entries[i].entryId', data.entries[i].entryId);
      console.log(event.target.getAttribute('entryId'));

      if (data.entries[i].entryId === parseInt(event.target.getAttribute('entryId'))) {
        title.value = data.entries[i].title;
        console.log('title.value', title.value);
        console.log('data.entries[i].title', data.entries[i].title);

        imgUrl.value = data.entries[i].image;
        console.log('imgUrl.value', imgUrl.value);
        console.log('data.entries[i].image', data.entries[i].image);

        notes.value = data.entries[i].notes;
        console.log('notes.value', notes.value);
        console.log('data.entries[i].notes', data.entries[i].notes);

        showEntryForm();
        console.log('data.editing', data.editing);
        data.editing = data.entries[i];
        console.log('data.editing', data.editing);
      }
    }
  }
});

/* click event on anchor to change views to entries */
var entriesTab = document.querySelector('.entries-anchor');
console.log('entriesTab', entriesTab);

var entries = document.querySelector('[data-view="entries"]');
console.log('entries', entries);

var entryForm = document.querySelector('[data-view="entry-form"]');
console.log('entryForm', entryForm);

/* click event on nav item for entries page view */
function showEntries() {
  console.log('showEntries()');

  console.log('entryContainer', entryContainer);
  entryContainer.innerHTML = '';
  console.log('entryContainer', entryContainer);
  /*
  loadEntries(data);
  */
  console.log('loadEntries(data)', loadEntries(data));
  console.log('entryContainer', entryContainer);

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
  console.log('showEntryForm()');

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
