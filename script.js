let classifier;
let imageModelURL = 'Tu_Modelo'; // URL del modelo de Teachable Machine
let video, flippedVideo;
let fileInput;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  createCanvas(320, 260); // Crea un canvas de 320x260 píxeles
  fileInput = createFileInput(handleFile); // Crea un input de archivo y llama a la función handleFile cuando se selecciona un archivo
  fileInput.position(0, height); // Establece la posición del input de archivo
  video = createCapture(VIDEO); // Captura el video de la cámara
  video.size(320, 240); // Establece el tamaño del video
  video.hide(); // Oculta el video original
}

function draw() {
  background(0); // Establece el fondo negro
  if (video.loadedmetadata) { // Si se ha cargado el video
    flippedVideo = ml5.flipImage(video); // Invierte el video horizontalmente
    classifyVideo(flippedVideo); // Clasifica el video
    image(flippedVideo, 0, 0); // Muestra el video invertido
  } else {
    fill(255); // Establece el color de relleno blanco
    textSize(16); // Establece el tamaño de la fuente
    textAlign(CENTER); // Establece la alineación del texto al centro
    text("Cargando video...", width / 2, height / 2); // Muestra un mensaje en el centro del canvas si no se ha cargado el video
  }
  fill(255); // Establece el color de relleno blanco
  textSize(16); // Establece el tamaño de la fuente
  textAlign(CENTER); // Establece la alineación del texto al centro
  text(label, width / 2, height - 4); // Muestra la etiqueta de la clasificación en la parte inferior del canvas
  let emoji = { // Objeto que asocia las etiquetas de clasificación con emojis
    "Class 1": "😊",
    "Class 2": "🤣",
    "Class 3": "🖐"
  }[label];
  textSize(100); // Establece el tamaño de la fuente
  text(emoji, width / 2, height / 2); // Muestra el emoji correspondiente a la etiqueta de clasificación en el centro del canvas
}

function classifyVideo(video) {
  classifier.classify(video, gotResult); // Clasifica el video y llama a la función gotResult cuando se obtienen los resultados
}

function handleFile(file) {
  if (file.type === 'image') { // Verifica que el archivo sea una imagen
    let img = createImg(file.data, ''); // Crea un elemento de imagen y carga el archivo
    img.hide(); // Oculta la imagen original
    flippedImage = ml5.flipImage(img); // Invierte la imagen horizontalmente
    classifyVideo(flippedImage); // Clasifica la imagen
  } else {
    console.log('El archivo seleccionado no es una imagen.');
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error); // Muestra el error en la consola
    return;
  }
  label = results[0].label; // Obtiene la etiqueta de clasificación del primer resultado
}
