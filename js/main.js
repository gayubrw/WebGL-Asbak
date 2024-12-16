let gl;
let programInfo;
let buffers;
let canvas;
let rotationX = Math.PI / 6;
let rotationY = 0;
let distance = -6.0;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

const ZOOM_SENSITIVITY = 0.001;
const ROTATION_SENSITIVITY = 0.01;
const MIN_DISTANCE = -15.0;
const MAX_DISTANCE = -2.0;

window.onload = function () {
  if (!initWebGL()) return;

  window.addEventListener("resize", handleResize);

  // Mouse events
  canvas.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("wheel", handleMouseWheel);
  canvas.addEventListener("dblclick", resetView);

  // Touch events
  canvas.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", handleTouchEnd);

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  if (!shaderProgram) return;

  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      lightPosition: gl.getUniformLocation(shaderProgram, "uLightPosition"),
      ambientLight: gl.getUniformLocation(shaderProgram, "uAmbientLight"),
      isBackground: gl.getUniformLocation(shaderProgram, "uIsBackground"),
    },
  };

  buffers = initBuffers(gl);
  drawScene(gl, programInfo, buffers);
};
