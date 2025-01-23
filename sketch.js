var scrollspeed = 1;
var x =0;
var y;
const TIMEINTERVAL = 1;
var clock = 0 
var timeStart;
var waves = []
var AmplitudeTemp;
const pointDensity = 0.05;
const waveSpeed = 1;
var speedCount = 0;
var waveStrings = ''
var tempwave;
var drawing = false

function setup() {
    
  let button = createButton("reset sketch");
  button.mousePressed(resetSketch);
  createCanvas(600, 400);
  background(222)
  rectMode(CENTER)
  
  setInterval(timeIncrease,TIMEINTERVAL)

}


class Wave{
    constructor(A, period,wavelength) {
    this.amplitude = A;
    this.period = (period == 0)? 1:period;
    this.wavelength = (wavelength == 0)? 1:wavelength*2
    this.angFreq = (PI*2)/this.period
    this.wave = (x)=>this.amplitude*cos(x*2*PI/this.wavelength -this.angFreq*frameCount)
    print(this.wave(5))
    
    !drawing&&(waveStrings += (`f(z,t) = ${this.amplitude.toPrecision(2)}(${((2*PI)/this.wavelength).toPrecision(2)}z - ${this.angFreq.toPrecision(2)}t)    `)
)}
}

function draw() {
  background(255)
  line(0,height/2,width,height/2)
  line(width/2,height/4,width/2,3*height/4)
  
  speedCount += waveSpeed
  if (speedCount>width){
    speedCount = 0
  }

  if (waves.length>0){
  for (let j = 0; j < width; j+=pointDensity){
    var amplitude = 0;
    for (var i in waves){
      amplitude += waves[i].wave(j)
      
    }
    if (j<=width/2+0.5 && j>=width/2-0.5 ){
      stroke('red')
      strokeWeight(3)
    }else{stroke('black');strokeWeight(1)}
    point(j,amplitude+height/2)
  }}
    text(waveStrings,10,height-10)
  
  if (drawing){
    Amplitudetemp = abs(mouseY - height/2)
    tempwave=new Wave(Amplitudetemp,clock-timeStart,frameCount-waveStart)
  }
  
  if (tempwave){
    for (let j = 0; j < width; j+=pointDensity){
      stroke('green')
      point(j,tempwave.wave(j)+height/2)
      stroke('black')
  }}
  
}
  

// have a function for each wave that effects each point, move the function one left until goes around 

function mousePressed(){
  if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
    drawing = true
    timeStart = clock
    waveStart = frameCount
}
  
function mouseReleased(){
    if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
  timeStop = clock
  waveStop = frameCount
  print(timeStop - timeStart)
  drawing = false
  
  AmplitudeTemp = abs(mouseY - height/2)
  waves.push( new Wave(AmplitudeTemp,timeStop-timeStart,waveStop-waveStart))
  tempwave = 0
}
  
// mobile
function touchStarted(){
  print(touches)
  print('touch started')
  if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
    waveStart = frameCount
    timeStart = clock
    drawing = true
}
  
function touchEnded(){
  print('touchended')
    if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
  timeStop = clock
  waveStop = frameCount
  print(timeStop - timeStart)
  drawing = false
  tempwave = 0
  
  AmplitudeTemp = abs(mouseY - height/2)
  waves.push( new Wave(AmplitudeTemp,timeStop-timeStart,waveStop-waveStart))
}
  
function timeIncrease(){
  clock += 1
}

function resetSketch(){
  waves = []
  waveStrings = ''
}
