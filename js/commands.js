const listCommands = [
  {
    name: 'clear',
    action: clearConsole,
    params: [],
  },
  {
    name: 'saludo',
    action: saludo,
    params: [validation.isString, validation.isNumber],
  },
  {
    name: 'color',
    action: colores,
    params: [validation.isColor],
  },
  {
    name: 'operacion',
    action: operacion,
    params: [validation.allCharacters],
  },
  {
    name: 'alerta',
    action: sendAlert,
    params: [validation.isStrBtwQuotes],
  },
  {
    name: 'wait',
    action: waitTest,
    params: [],
  },
];
