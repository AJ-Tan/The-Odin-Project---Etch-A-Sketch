import { Sketch } from './sketchClass.js'

const newSketch = new Sketch(16);

newSketch.generateSketchGrid();

// Sketch Buttons
const changeGridBtn = document.getElementById('btn-change-grid');
changeGridBtn.addEventListener('click', () => {
  newSketch.promptSketchGrid();
});

const resetGridBtn = document.getElementById('btn-reset');
resetGridBtn.addEventListener('click', () => {
  newSketch.resetSketch()
});

// Sketch Mode
const modeBtn = document.getElementById('btn-mode');

modeBtn.addEventListener('click', (e) => {
  const currentMode = e.currentTarget.dataset['sketchMode'];
  let newMode = null;
  if(currentMode === 'solid') {
    newMode = 'fade-start';
    e.currentTarget.textContent = 'Fade Start';
  } else {
    e.currentTarget.textContent = 'Solid';
    newMode = 'solid';
  }

  e.currentTarget.dataset['sketchMode'] = newMode;
  newSketch.setSketchMode(newMode);
})

// Color Buttons
const selectionColorBtns = document.querySelectorAll('.selection-color');
const selectedColorDiv = document.getElementById('selected-color');

selectionColorBtns.forEach(colorBtn => {
  colorBtn.addEventListener('click', e => {
    const selectedColor = e.currentTarget.dataset['color'];
    selectionColorBtns.forEach(btn => {
      btn.setAttribute('aria-checked', 'false');
    })
    e.currentTarget.setAttribute('aria-checked', 'true');

    if(selectedColor !== 'random') {
      selectedColorDiv.style.color = selectedColor;
      let rgbColor = getComputedStyle(selectedColorDiv).color;
      rgbColor = rgbColor.slice(rgbColor.indexOf('(') + 1, rgbColor.indexOf(')')).split(', ');
      newSketch.setSketchColor(rgbColor);
    } else {
      newSketch.setSketchColor(selectedColor);
    }
  })
})