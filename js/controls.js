function resetView() {
  rotationX = Math.PI / 6;
  rotationY = 0;
  distance = -6.0;
  drawScene(gl, programInfo, buffers);
}

function handleMouseWheel(event) {
  event.preventDefault();
  const delta = event.deltaY * ZOOM_SENSITIVITY;
  distance = Math.max(MIN_DISTANCE, Math.min(MAX_DISTANCE, distance + delta));
  drawScene(gl, programInfo, buffers);
}

function handleMouseDown(event) {
  isDragging = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  event.preventDefault();
}

function handleMouseMove(event) {
  if (!isDragging) return;

  const deltaX = (event.clientX - lastMouseX) * ROTATION_SENSITIVITY;
  const deltaY = (event.clientY - lastMouseY) * ROTATION_SENSITIVITY;

  rotationY += deltaX;
  rotationX += deltaY;

  rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));

  lastMouseX = event.clientX;
  lastMouseY = event.clientY;

  drawScene(gl, programInfo, buffers);
}

function handleMouseUp() {
  isDragging = false;
}

function handleTouchStart(event) {
  if (event.touches.length === 1) {
    isDragging = true;
    lastMouseX = event.touches[0].clientX;
    lastMouseY = event.touches[0].clientY;
    event.preventDefault();
  }
}

function handleTouchMove(event) {
  if (!isDragging) return;

  const deltaX = (event.touches[0].clientX - lastMouseX) * ROTATION_SENSITIVITY;
  const deltaY = (event.touches[0].clientY - lastMouseY) * ROTATION_SENSITIVITY;

  rotationY += deltaX;
  rotationX += deltaY;

  rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));

  lastMouseX = event.touches[0].clientX;
  lastMouseY = event.touches[0].clientY;

  drawScene(gl, programInfo, buffers);
  event.preventDefault();
}

function handleTouchEnd() {
  isDragging = false;
}
