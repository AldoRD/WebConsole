const listOfCommands = [
  {
    name: 'help',
    action: listCommands,
    params: [],
  },
  {
    name: 'clear',
    action: clearConsole,
    params: [],
  },
  {
    name: 'greeting',
    action: greeting,
    params: [validation.isString, validation.isColor],
  },
  {
    name: 'color',
    action: getColor,
    params: [validation.isColor],
  },
  {
    name: 'math',
    action: mathOperation,
    params: [validation.allCharacters],
  },
  {
    name: 'alert',
    action: sendAlert,
    params: [validation.isStrBtwQuotes],
  },
  {
    name: 'wait',
    action: waitTest,
    params: [],
  },
  {
    name: 'circle',
    action: transformToCircle,
    params: [],
  },
  {
    name: 'rect',
    action: transformToRect,
    params: [],
  },
  {
    name: 'move',
    action: moveShape,
    params: [validation.isDirection],
  },
  {
    name: 'transform',
    action: transformColor,
    params: [validation.isColor],
  },
  {
    name: 'rotate',
    action: rotateShape,
    params: [validation.isNumber],
  },
  {
    name: 'light',
    action: toggleLight,
    params: [],
  },
];
