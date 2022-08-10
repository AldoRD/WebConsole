const timeout = async (ms) => new Promise((res) => setTimeout(res, ms));

async function waitUserInput() {
  isWaitingUser = true;
  while (isWaitingUser == true) await timeout(50);
  isWaitingUser = false;
  actualCallback = null;
}

async function setWaitUser(callback) {
  actualCallback = callback;
  return await waitUserInput();
}

const waitTest = async (parameters) => {
  createLine(`(${colors.warning}):Ingrese la contraseña:`);
  await setWaitUser((value) => {
    if (value === '12345') {
      createLine(`(${colors.success}):Exito`);
      return false;
    }
    createLine(`(${colors.error}):Incorrecto`);
    return true;
  });
};

const greeting = (parameters) => {
  let randomColor = ((Math.random() * 0xffffff) << 0)
    .toString(16)
    .padStart(6, '0');
  let string = `Hola (#${randomColor}):${parameters[0]}`;
  createLine(string);
};

const sendAlert = (parameters) => {
  alert(parameters[0]);
  createLine(`(${colors.success}):Success`);
};

const getColor = (parameters) => {
  createLine(`Muesta del color (${parameters[0]}):${parameters[0]}`);
};

const clearConsole = () => {
  output.textContent = '';
};

const listCommands = () => {
  createLine(`(${colors.warning}): Try to use this commands:`);
  listOfCommands.forEach((c) => {
    createLine(`(${colors.normal}):${c.name}`);
  });
};

const mathOperation = (parameters) => {
  try {
    createLine(`(${colors.success}):Resultado ${eval(parameters[0])}`);
  } catch (error) {
    createLine(`(${colors.error}):${error}`);
  }
};
