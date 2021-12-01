export class DrawingCanvas {
  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  coordinates = { x: 0, y: 0 };
  /*
   * @description flag to indicate we can draw
   */
  allowDrawing = false;

  constructor(canvasId: string) {
    this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  resizeCanvasToFitScreen = () => {
    this.canvasContext.canvas.width = window.innerWidth - 5;
    this.canvasContext.canvas.height = window.innerHeight - 5;
  };

  // Updates the coordianates of the cursor when
  // an event e is triggered to the coordinates where
  // the said event is triggered.
  getPosition = (event) => {
    this.coordinates.x = event.clientX - this.canvasElement.offsetLeft;
    this.coordinates.y = event.clientY - this.canvasElement.offsetTop;
  };

  // The following functions toggle the flag to start
  // and stop drawing
  startPainting = (event) => {
    this.allowDrawing = true;
    this.getPosition(event);
  };

  stopPainting = () => {
    this.allowDrawing = false;
  };

  setDrawingContext(
    options: Partial<{
      lineWidth: number;
      lineCap: 'round';
      strokeStyle: string;
    }> = {
      lineWidth: 5,
      lineCap: 'round',
      strokeStyle: 'white',
    }
  ) {
    this.canvasContext.lineWidth = options.lineWidth;
    // Sets the end of the lines drawn
    // to a round shape.
    this.canvasContext.lineCap = options.lineCap;
    this.canvasContext.strokeStyle = options.strokeStyle;
  }

  clearCanvas = () => {
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  };

  draw = (event) => {
    if (!this.allowDrawing) return;
    this.canvasContext.beginPath();

    // The cursor to start drawing
    // moves to this coordinate
    this.canvasContext.moveTo(this.coordinates.x, this.coordinates.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    this.getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    this.canvasContext.lineTo(this.coordinates.x, this.coordinates.y);

    // Draws the line.
    this.canvasContext.stroke();
  };

  startPaintingTouch = (touchEvent: TouchEvent) => {
    if (touchEvent.targetTouches.length >= 1) {
      this.startPainting(touchEvent.changedTouches.item(0));
    }
  };

  drawFromTouch = (touchEvent: TouchEvent) => {
    if (touchEvent.targetTouches.length >= 1) {
      for (let i = 0; i < touchEvent.changedTouches.length; i++) {
        const touch = touchEvent.changedTouches.item(i);
        this.draw(touch);
      }
    }
  };
}
