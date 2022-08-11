const box = document.querySelector('.box');

let actualShapeAnim = null;
let actualChangeAnim = null;
let isLightOn = false;

const transformToCircle = (parameters) => {
  actualShapeAnim && actualShapeAnim.remove('.box');
  actualShapeAnim = anime({
    targets: '.box',
    borderRadius: '50%',
    duration: 1000,
  });
};

const transformToRect = (parameters) => {
  actualShapeAnim && actualShapeAnim.remove('.box');
  actualShapeAnim = anime({
    targets: '.box',
    borderRadius: '10px',
    duration: 1000,
  });
};

const moveShape = (parameters) => {
  let param = parameters[0];
  actualShapeAnim && actualShapeAnim.remove('.box');
  if (param === 'up' || param === 'down')
    actualShapeAnim = anime({
      targets: '.box',
      translateY: param === 'up' ? -150 : 150,
      duration: 1000,
    });
  if (param === 'right' || param === 'left')
    actualShapeAnim = anime({
      targets: '.box',
      translateX: param === 'left' ? -150 : 150,
      duration: 1000,
    });

  actualShapeAnim.finished.then(resetTransformsShape);
};

const rotateShape = (parameters) => {
  actualShapeAnim && actualShapeAnim.remove('.box');
  actualShapeAnim = anime({
    targets: '.box',
    rotate: parameters[0],
    duration: 3000,
  });

  actualShapeAnim.finished.then(resetTransformsShape);
};

const transformColor = async (parameters) => {
  actualChangeAnim && actualChangeAnim.remove(box);
  await animChangeColorLight(parameters[0]);
};

const toggleLight = () => {
  actualChangeAnim && actualChangeAnim.remove(box);
  isLightOn = !isLightOn;
  isLightOn ? animTurnOnLight() : animTurnOffLight();
};

const resetTransformsShape = () => {
  actualShapeAnim = anime({
    targets: '.box',
    translateY: 0,
    translateX: 0,
    rotate: 0,
    duration: 1000,
  });
};

const animTurnOnLight = () => {
  let colorOn = anime.get(box, 'backgroundColor');
  let colorOff = 'rgb(0,0,0)';
  actualChangeAnim = anime({
    targets: box,
    boxShadow: [
      `0 0 10px ${colorOff}, 0 0 20px ${colorOff}, 0 0 40px ${colorOff}`,
      `0 0 10px ${colorOn}, 0 0 20px ${colorOn}, 0 0 40px ${colorOn},0 0 80px ${colorOn}, 0 0 120px ${colorOn}`,
    ],
    duration: 1000,
  });
  createLine('Turn On');
};

const animTurnOffLight = () => {
  let colorOn = anime.get(box, 'backgroundColor');
  let colorOff = 'rgb(0,0,0)';
  actualChangeAnim = anime({
    targets: box,
    boxShadow: [
      `0 0 10px ${colorOn}, 0 0 20px ${colorOn}, 0 0 40px ${colorOn},0 0 80px ${colorOn}, 0 0 120px ${colorOn}`,
      `0 0 10px ${colorOff}, 0 0 20px ${colorOff}, 0 0 40px ${colorOff}`,
    ],
    duration: 1000,
  });
  createLine('Turn Off');
};

const animChangeColorLight = (color) => {
  let lastColor = anime.get(box, 'backgroundColor');
  actualChangeAnim = anime({
    targets: box,
    backgroundColor: color,
    duration: 100,
    easing: 'linear',
  });
  actualChangeAnim.finished.then(() => {
    if (isLightOn) {
      let colorOn = anime.get(box, 'backgroundColor');
      actualChangeAnim = anime({
        targets: box,
        boxShadow: [
          `0 0 10px ${lastColor}, 0 0 20px ${lastColor}, 0 0 40px ${lastColor},0 0 80px ${lastColor}, 0 0 120px ${lastColor}`,
          `0 0 10px ${colorOn}, 0 0 20px ${colorOn}, 0 0 40px ${colorOn},0 0 80px ${colorOn}, 0 0 120px ${colorOn}`,
        ],
        duration: 1000,
      });
    }
  });
};
