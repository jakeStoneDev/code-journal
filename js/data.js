/* exported data */
var data = {
  view: '',
  entries: [],
  editing: null,
  nextEntryId: 1
};

/* Below this line, listens for the submit event to occur */
/* read local storage for JSON */
var previousUserInput;
var previousUserInputJSON = localStorage.getItem('javascript-local-storage');
/* getting previous entry ID and incrementing */
if (previousUserInputJSON !== null) {
  previousUserInput = JSON.parse(previousUserInputJSON);
  data.entries = previousUserInput.entries;
  data.view = previousUserInput.view;
  data.nextEntryId = previousUserInput.nextEntryId;
}
