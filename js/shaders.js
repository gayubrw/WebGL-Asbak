const vsSource = `
  precision mediump float;
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uNormalMatrix;
  
  varying vec4 vColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vTextureCoord;

  void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
      vNormal = (uNormalMatrix * vec4(aVertexNormal, 0.0)).xyz;
      vPosition = (uModelViewMatrix * aVertexPosition).xyz;
      vTextureCoord = aTextureCoord;
  }
`;

const fsSource = `
  precision mediump float;
  varying vec4 vColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vTextureCoord;

  uniform vec3 uLightPosition;
  uniform vec3 uAmbientLight;
  uniform bool uIsBackground;

  void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uLightPosition - vPosition);
      
      float diffuse = max(dot(normal, lightDir), 0.0);
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-lightDir, normal);
      float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
      
      gl_FragColor = vec4(vColor.rgb * (diffuse + uAmbientLight) + specular * 0.3, vColor.a);
  }
`;

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
