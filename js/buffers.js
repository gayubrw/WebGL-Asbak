function initBuffers(gl) {
  const positions = [];
  const colors = [];
  const normals = [];
  const textureCoords = [];

  // Parameters
  const numSides = 8;
  const radius = 1.5;
  const height = 0.5;
  const innerRadius = radius * 0.75;
  const baseDepth = -0.2;

  // Color definitions
  const blackColor = [0.1, 0.1, 0.1, 1.0]; // Hitam untuk bagian luar
  const whiteColor = [1.0, 1.0, 1.0, 1.0]; // Putih untuk bagian dalam

  // Create top surface
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * Math.PI * 2;
    const nextAngle = ((i + 1) / numSides) * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const nx = Math.cos(nextAngle) * radius;
    const nz = Math.sin(nextAngle) * radius;

    const x1Inner = Math.cos(angle) * innerRadius;
    const z1Inner = Math.sin(angle) * innerRadius;
    const x2Inner = Math.cos(nextAngle) * innerRadius;
    const z2Inner = Math.sin(nextAngle) * innerRadius;

    // Outer rim section (flat surface)
    positions.push(
      x,
      height,
      z,
      nx,
      height,
      nz,
      x1Inner,
      height,
      z1Inner,
      x1Inner,
      height,
      z1Inner,
      nx,
      height,
      nz,
      x2Inner,
      height,
      z2Inner
    );

    // Colors for outer rim - black
    for (let j = 0; j < 6; j++) {
      colors.push(...blackColor);
    }

    // Normals for flat rim
    for (let j = 0; j < 6; j++) {
      normals.push(0, 1, 0);
    }

    // Inner depression (bottom surface)
    positions.push(
      x1Inner,
      height,
      z1Inner,
      x2Inner,
      height,
      z2Inner,
      x1Inner,
      baseDepth,
      z1Inner,
      x2Inner,
      height,
      z2Inner,
      x2Inner,
      baseDepth,
      z2Inner,
      x1Inner,
      baseDepth,
      z1Inner
    );

    // Colors for inner depression - white
    for (let j = 0; j < 6; j++) {
      colors.push(...whiteColor);
    }

    // Normals for inner depression
    const depthNormal = [0, -1, 0];
    for (let j = 0; j < 6; j++) {
      normals.push(...depthNormal);
    }
  }

  // Create outer wall
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * Math.PI * 2;
    const nextAngle = ((i + 1) / numSides) * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const nx = Math.cos(nextAngle) * radius;
    const nz = Math.sin(nextAngle) * radius;

    // Outer wall faces
    positions.push(
      x,
      0,
      z,
      x,
      height,
      z,
      nx,
      0,
      nz,
      nx,
      0,
      nz,
      x,
      height,
      z,
      nx,
      height,
      nz
    );

    // Colors for outer wall - black
    for (let j = 0; j < 6; j++) {
      colors.push(...blackColor);
    }

    // Wall normals
    const wallNormal = normalize([
      Math.cos(angle + Math.PI / numSides),
      0,
      Math.sin(angle + Math.PI / numSides),
    ]);
    for (let j = 0; j < 6; j++) {
      normals.push(...wallNormal);
    }
  }

  // Create bottom face
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * Math.PI * 2;
    const nextAngle = ((i + 1) / numSides) * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const nx = Math.cos(nextAngle) * radius;
    const nz = Math.sin(nextAngle) * radius;

    // Bottom face triangles
    positions.push(x, 0, z, nx, 0, nz, 0, 0, 0);

    // Colors for bottom - black
    for (let j = 0; j < 3; j++) {
      colors.push(...blackColor);
    }

    // Normals for bottom
    for (let j = 0; j < 3; j++) {
      normals.push(0, -1, 0);
    }
  }

  return {
    position: createBuffer(gl, positions),
    color: createBuffer(gl, colors),
    normal: createBuffer(gl, normals),
    textureCoord: createBuffer(gl, textureCoords),
    vertexCount: positions.length / 3,
  };
}

// Helper functions remain the same
function normalize(v) {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / length, v[1] / length, v[2] / length];
}

function createBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buffer;
}
