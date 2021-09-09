/* exported data */
var data = {
  view: '',
  entries: [],
  editing: null,
  nextEntryId: 1
};

/*
window.addEventListener('beforeunload', function (event) {
  var stateJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', stateJSON);
});
*/

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
