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

function setup() {
    
  let button = createButton("reset sketch");
  button.mousePressed(resetSketch);
  createCanvas(600, 400);
  background(222)
  rectMode(CENTER)
  
  setInterval(timeIncrease,TIMEINTERVAL)

}


class Wave{
    constructor(A, period) {
    this.amplitude = A;
    this.period = period;
    this.wavelength = period
    this.angFreq = (PI*2)/this.period
    this.wave = (x)=>this.amplitude*cos(x*2*PI/this.wavelength -this.angFreq*frameCount)
    print(this.wave(5))
    waveStrings += (`f(y,t) = ${this.amplitude.toPrecision(2)}(${((2*PI)/this.wavelength).toPrecision(2)}y - ${this.angFreq.toPrecision(2)}t)    `)
}
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
    point(j,amplitude+height/2)
  }}
    text(waveStrings,10,height-10)
  
}
  

// have a function for each wave that effects each point, move the function one left until goes around 

function mousePressed(){
  if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
    timeStart = clock
}
  
function mouseReleased(){
    if (mouseX > width || mouseX <0 || mouseY < 0 || mouseY >= height){
    return
  }
  timeStop = clock
  print(timeStop - timeStart)
  
  AmplitudeTemp = abs(mouseY - height/2)
  waves.push( new Wave(AmplitudeTemp,timeStop-timeStart))
}
  
function timeIncrease(){
  clock += 1
}

function resetSketch(){
  waves = []
  waveStrings = ''
}
