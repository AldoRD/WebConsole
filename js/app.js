const output = document.getElementById('output');
const input = document.getElementById('input');
const suggestions = document.getElementById('suggestions');

let isCorrectCommand = false;
let isWaitingUser = false;
let isCtrlPress = false;

let actualParams = [];
let historyArray = [];
let actualSuggestions = [];

let actualCallback = null;
let actualCommand = null;

let actualConsoleMessage = '';
let responseMessage = '';

let indexHistory = -1;

window.addEventListener('keydown', (e) => {
  if (e.key == 'c' && isCtrlPress && isWaitingUser) {
    isWaitingUser = false;
    createLine(`(${colors.error}):Cancel`);
  }
  if (e.key == 'l' && isCtrlPress) {
    e.preventDefault();
    output.textContent = '';
  }
  if (e.key == 'Control') isCtrlPress = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key == 'Control') isCtrlPress = false;
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement === input) handleInput();
  if (document.activeElement === input) autocompleteHistory(e);
  if (e.key === 'ArrowRight' && document.activeElement === input)
    completeSuggestions();
});

input.addEventListener('input', () => {
  if (input.value === '') indexHistory = historyArray.length;
  if (input.value && input.value.split(' ').length === 1) getSuggestions();
  else {
    actualSuggestions = [];
    suggestions.value = '';
  }
});

function autocompleteHistory(e) {
  if (historyArray.length <= 0) return;
  if (e.key === 'ArrowUp') {
    indexHistory = indexHistory <= 0 ? 0 : indexHistory - 1;
    input.value = historyArray[indexHistory];
    setCursorEnd();
  }
  if (e.key === 'ArrowDown') {
    indexHistory =
      indexHistory >= historyArray.length
        ? historyArray.length
        : indexHistory + 1;
    input.value = historyArray[indexHistory] || '';
    setCursorEnd();
  }
}

function completeSuggestions() {
  if (actualSuggestions.length <= 0) return;
  let word = input.value.split(' ')[0];
  let string = input.value.slice(0, input.value.length - word.length);

  input.value = string + actualSuggestions.pop();
  suggestions.value = '';
}

function getSuggestions() {
  let word = input.value.trim().split(' ')[0];
  let string = input.value.slice(0, input.value.length - word.length);
  actualSuggestions = [];

  listCommands.forEach((s) => {
    if (s.name.startsWith(word)) actualSuggestions.push(s.name);
  });

  suggestions.value =
    actualSuggestions.length > 0
      ? string + actualSuggestions[actualSuggestions.length - 1]
      : (suggestions.value = '');
}

function setCursorEnd() {
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = input.value.length;
    input.focus();
  }, 0);
}

function handleInput() {
  if (!input.value) return;

  if (!isWaitingUser) {
    if ((isCorrectCommand = verifyCommandExist()))
      isCorrectCommand = verifyCommandParameters();

    historyArray =
      historyArray[historyArray.length - 1] === input.value
        ? historyArray
        : [...historyArray, input.value];
    indexHistory = historyArray.length;
    createLine(actualConsoleMessage);
    createLine(responseMessage);

    if (isCorrectCommand) executeCommand();
  } else isWaitingUser = actualCallback(input.value);

  input.value = '';
  reset();
}

function reset() {
  actualCommand = null;
  isCorrectCommand = false;
  actualParams = [];
  actualConsoleMessage = '';
  responseMessage = '';
  suggestions.value = '';
  actualSuggestions = [];
}

function executeCommand() {
  actualCommand.action(actualParams);
}

function verifyCommandExist() {
  let commandoSplit = splitForQuotesAndSpaces(input.value);
  for (let i = 0; i < listCommands.length; i++) {
    if (commandoSplit[0] === listCommands[i].name) {
      actualCommand = listCommands[i];
      actualConsoleMessage = `> (${colors.command}):${commandoSplit.shift()}`;
      actualParams = commandoSplit;
      return true;
    }
  }
  actualConsoleMessage = '> ' + commandoSplit.join(' ');
  responseMessage = `(${colors.error}):${messages.error}`;
  return false;
}

function verifyCommandParameters() {
  let params = actualCommand.params;
  isCorrectCommand = false;

  if (
    actualParams.length > params.length ||
    actualParams.length < params.length
  ) {
    responseMessage =
      actualParams.length > params.length
        ? `(${colors.warning}):${messages.extraParams}`
        : `(${colors.warning}):${messages.missingParams}`;

    actualConsoleMessage += ` (${colors.error}):${actualParams.join(' ')}`;
    return false;
  }

  for (let i = 0; i < params.length; i++)
    if (!params[i](actualParams[i])) {
      responseMessage = `(${colors.warning}):${messages.wrongParameters}`;
      actualConsoleMessage += ` (${colors.error}):${actualParams.join(' ')}`;
      return false;
    }

  actualConsoleMessage += ` (${colors.params}):${actualParams.join(' ')}`;
  isCorrectCommand = true;
  return true;
}

function createLine(string) {
  if (!string) return false;
  let newline = document.createElement('div');
  let color = '';
  string
    .split(patternColorSearch)
    .filter(Boolean)
    .forEach((s) => {
      if (!patternColorOnly.test(s)) newline.appendChild(textColor(s, color));
      else color = s.slice(1, -2);
    });
  output.appendChild(newline);
  newline.scrollIntoView({ behavior: 'smooth' });
}

function textColor(string, color = colors.normal) {
  if (!color) color = colors.normal;
  let span = document.createElement('span');
  span.textContent = string;
  span.style.color = color;
  return span;
}
