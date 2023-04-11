function back(){
    window.location= "index.html"; 
 }

model__status = "";
object = [];

function preload()
 {
    kitchen_pic = loadImage("kitchen.jpg");
 }

 function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
//document.getElementById("status").innerHTML = " detecting objects"
    // video = createCapture(VIDEO);
 }

 function modelLoaded(){
    console.log("model is Loaded");
    model__status = true;
    objectDetector.detect(kitchen_pic,gotResults);
}

function gotResults(error,results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
    
}



 function draw(){
    image(kitchen_pic,0,0,500,400);

    if(model__status != ""){
        for(var i = 0;i<object.length;i++){
            noFill();
            stroke("red");
            strokeWeight(2);
            textSize(20);
    rect(object[i].x,object[i].y,object[i].width,object[i].height)
    fill("white");
    text(object[i].label,object[i].x,object[i].y-3);
    percent =round(object[i].confidence*100)+"%"; 
    width = object[i].width;
    text(percent,object[i].x+width,object[i].y-3);
   // document.getElementById("status").innerHTML = "  Objects detected"
        }
    }
 }