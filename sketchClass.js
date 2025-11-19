export class Sketch {
  #sketchGrid; #selectedColor; #sketchMode;
  constructor(sketchGrid) {
    this.#sketchGrid = sketchGrid;
    this.#selectedColor = [255, 255, 255];
    this.#sketchMode = 'solid';
  }

  promptSketchGrid() {
    let sketchGridPrompt = prompt('Set the number of dimension:');
    if(sketchGridPrompt === null) return;
    this.#sketchGrid = 0;

    sketchGridPrompt = Number(sketchGridPrompt);
    if(sketchGridPrompt && sketchGridPrompt > 0 && sketchGridPrompt <= 100) {
      this.#sketchGrid = Math.round(sketchGridPrompt);
      this.generateSketchGrid();
    } else {
      alert('Invalid input.');
    }
  }

  setSketchColor(rgbColor) {
    if(rgbColor !== 'random') {
      this.#selectedColor = [...rgbColor];
    } else {
      this.#selectedColor = rgbColor;
    }
  }

  setSketchMode(mode) {
    this.#sketchMode = mode;
  }

  resetSketch() {
    const sketchBlock = document.querySelectorAll('.sketch-block');
    sketchBlock.forEach(blockEl => {
      blockEl.style.backgroundColor = '';
    })
  }

  generateSketchGrid() {
    const sketchContainer = document.querySelector('.sketch-container');
    let sketchRow, sketchBlock;
    const random0To255 = () => {
      return Math.floor(Math.random() * 256);
    }

    // Set Mouse Down Event
    let isMouseDown = false;
    let opacityColor = 0;
    document.addEventListener('mousedown', () => {
      isMouseDown = true;
    })
    document.addEventListener('mouseup', () => {
      isMouseDown = false;
      opacityColor = 0;
    })

    sketchContainer.innerHTML = '';
    for(let i = 0; i < this.#sketchGrid; i++) {
      sketchRow = document.createElement('div');
      sketchRow.className = 'sketch-row';

      for(let x = 0; x < this.#sketchGrid; x++) {
        sketchBlock = document.createElement('div');
        sketchBlock.className = 'sketch-block';

        sketchBlock.addEventListener('mouseover', (e) => {
          if(isMouseDown) {
            opacityColor += 0.1;
            if(this.#selectedColor !== 'random') {
              const [r, g, b] = this.#selectedColor;
              e.currentTarget.style.backgroundColor = `rgba(${r},${g},${b},${this.#sketchMode === 'solid' ? 1 : opacityColor})`;
            } else {
              e.currentTarget.style.backgroundColor = `rgba(${random0To255()}, ${random0To255()},${random0To255()}, ${this.#sketchMode === 'solid' ? 1 : opacityColor})`;
            }
          }
        })

        sketchBlock.addEventListener('mousedown', (e) => {
          if(this.#selectedColor !== 'random') {
            const [r, g, b] = this.#selectedColor;
            e.currentTarget.style.backgroundColor = `rgba(${r},${g},${b},${this.#sketchMode === 'solid' ? 1 : opacityColor})`;
          } else {
            e.currentTarget.style.backgroundColor = `rgba(${random0To255()}, ${random0To255()},${random0To255()}, ${this.#sketchMode === 'solid' ? 1 : opacityColor})`;
          }
        })

        sketchRow.appendChild(sketchBlock);
      }
      
      sketchContainer.appendChild(sketchRow);
    }
  }
}