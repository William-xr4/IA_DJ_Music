var song="";
var 

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
    song=loadSound("BEETHOVEN.mp3");
}
function setup(){
    canvas=createCanvas(400, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}


function draw(){
    image(video, 0, 0, 400, 400);
    fill("blue");
    stroke("black");
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 25);
        numberLeftWristY=Number(leftWristY);
        decimaisY=floor(numberLeftWristY);
        volume=decimaisY/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }
}
function Start_Music(){
    song.play();
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}