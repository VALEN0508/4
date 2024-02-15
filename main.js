img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
    console.log("Modelo cargado");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) 
{
    if (error)
     {
        console.log(error);
    }
    else 
    {
        console.log(results);
        objects = results;
    }
}

function preload() 
{
    img = loadImage('dog_cat.jpg');
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
       for(i=0; i < objects.legth; i++) 
       {
          document.getElementById("status").innerHTML = "Estado: objetos detectados";

          fill("#24873f");
          percent = floor( objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
          noFill();
          stroke("#165928");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}