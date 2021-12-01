import './style.css';
import { DrawingCanvas } from './drawing-canvas';

const drawingCanvas = new DrawingCanvas('drawing-canvas');
drawingCanvas.resizeCanvasToFitScreen(); // Resizes the canvas once the window loads

registerMainEventListeners();
toolbarSetup();

function registerMainEventListeners() {
  document.addEventListener(
    'touchstart',
    drawingCanvas.startPaintingTouch,
    false
  );
  document.addEventListener('pointerdown', drawingCanvas.startPainting, false);
  document.addEventListener('touchend', drawingCanvas.stopPainting, false);
  document.addEventListener('pointerup', drawingCanvas.stopPainting, false);
  document.addEventListener('touchmove', drawingCanvas.drawFromTouch, false);
  document.addEventListener('pointermove', drawingCanvas.draw, false);
  window.addEventListener('resize', drawingCanvas.resizeCanvasToFitScreen);
}

function toolbarSetup() {
  document
    .getElementById('clear-btn')
    .addEventListener('click', drawingCanvas.clearCanvas, false);

  document
    .getElementById('size-group-btns')
    .addEventListener('click', sizeToolbar, false);
}

function sizeToolbar(event) {
  if (event.target.className.includes('btn')) {
    drawingCanvas.setDrawingContext({ lineWidth: +event.target.innerText });
  }
}

function cleanUp() {
  document.removeEventListener(
    'touchstart',
    drawingCanvas.startPaintingTouch,
    false
  );
  document.removeEventListener(
    'pointerdown',
    drawingCanvas.startPainting,
    false
  );
  document.removeEventListener('touchend', drawingCanvas.stopPainting, false);
  document.removeEventListener('pointerup', drawingCanvas.stopPainting, false);
  document.removeEventListener('touchmove', drawingCanvas.drawFromTouch, false);
  document.removeEventListener('pointermove', drawingCanvas.draw, false);
  window.removeEventListener('resize', drawingCanvas.resizeCanvasToFitScreen);

  document
    .getElementById('clear-btn')
    .removeEventListener('click', drawingCanvas.clearCanvas, false);

  document
    .getElementById('size-group-btns')
    .removeEventListener('click', sizeToolbar, false);
}

window.addEventListener('beforeunload', cleanUp, { once: true });
