Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

    });
}

console.log("ml5 version using "+ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2YWCA2WLG/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

prediction_1="";

function speak(){
    var synth= window.speechSynthesis;
    speakdata_1="The first prediction is "+prediction_1;
    var utterThis= new SpeechSynthesisUtterance(speakdata_1);
    synth.speak(utterThis);
}

function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1= results[0].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        speak();
        
        if (prediction_1 == "amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
         if (prediction_1 == "best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if (prediction_1 == "victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
    }
}