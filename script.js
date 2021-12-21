//define color palette
let avgballcolor = '#9381FF'
let sampleballcolor = '#FFD8BE'
let samplebarcolor = '#B8B8FF'
let populationbarcolor = '#FFD6AD'

//class to handle sample graphic
class SampleBall {
  constructor (sample, c) {
    this.sampleNum = sample
    this.y = 0
    this.x =
      this.getXpos() * (SampleCanvasWidth / 10) + SampleCanvasWidth / 10 / 2
    this.color = c
    this.dead = false
  }

  getXpos () {
    if (this.sampleNum < 1) {
      return 0
    }
    if (this.sampleNum < 2 && this.sampleNum >= 1) {
      return 1
    }
    if (this.sampleNum < 3 && this.sampleNum >= 2) {
      return 2
    }
    if (this.sampleNum < 4 && this.sampleNum >= 3) {
      return 3
    }
    if (this.sampleNum < 5 && this.sampleNum >= 4) {
      return 4
    }
    if (this.sampleNum < 6 && this.sampleNum >= 5) {
      return 5
    }
    if (this.sampleNum < 7 && this.sampleNum >= 6) {
      return 6
    }
    if (this.sampleNum < 8 && this.sampleNum >= 7) {
      return 7
    }
    if (this.sampleNum < 9 && this.sampleNum >= 8) {
      return 8
    }
    if (this.sampleNum >= 9) {
      return 9
    }
  }

  show (canvas) {
    var c = document.getElementById(canvas)
    var ctx = c.getContext('2d')
    ctx.beginPath()
    ctx.arc(this.x, this.y, 7, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  move () {
    this.y += 20
  }

  movetoMean (location) {
    if (!this.dead) {
      if (this.x < location) {
        this.x += 20
      } else {
        this.x -= 20
      }

      //move to location if distance is close enough
      if (Math.abs(this.x - location) < 20) {
        this.x = location
        this.dead = true
      }
    }
  }
}

//class to create sample list
class SampleList {
  constructor (sampleListt) {
    this.samplelist = sampleListt
    this.ballList = []
    this.averaging = false
    this.leftover = []
    this.averageSample
    this.displayAvg = false
  }

  initilize () {
    for (let i = 0; i < this.samplelist.length; i++) {
      this.ballList.push(new SampleBall(this.samplelist[i], sampleballcolor))
    }
  }

  display () {
    if (this.displayAvg) {
      this.averageSample.show('sampleCanvas')
    } else {
      for (let i = 0; i < this.ballList.length; i++) {
        this.ballList[i].show('sampleCanvas')
      }
    }
  }

  update () {
    if (this.averaging) {
      for (let i = 0; i < this.ballList.length; i++) {
        this.ballList[i].movetoMean(this.averageSample.x + 5)
      }

      //check if time to unleash mean
      if (!this.displayAvg) {
        let temp = true
        for (let i = 0; i < this.ballList.length; i++) {
          if (!this.ballList[i].dead) {
            temp = false
            break
          }
        }

        if (temp) {
          this.displayAvg = true
        }
      }

      //show mean if time
      if (this.displayAvg) {
        this.averageSample.move()
      }
    } else {
      for (let i = 0; i < this.ballList.length; i++) {
        this.ballList[i].move()
      }
    }
  }

  checkMidBoundary () {
    for (let i = 0; i < this.ballList.length; i++) {
      if (this.ballList[i].y > SampleCanvasHeight / 2.5) {
        return true
      }
    }
    return false
  }

  checkEndBoundary () {
    if (!this.averageSample) {
      return false
    }

    if (this.averageSample.y > SampleCanvasHeight) {
      addtograph(this.averageSample.sampleNum)
      return true
    }

    return false
  }

  averageList () {
    let mean = 0
    for (let i = 0; i < this.ballList.length; i++) {
      mean += this.ballList[i].sampleNum
    }
    mean = mean / this.ballList.length
    let averageBall = new SampleBall(mean, avgballcolor)
    averageBall.y = SampleCanvasHeight / 2.5

    //empty list and replace with just the sample
    this.leftover = this.ballList
    this.averageSample = averageBall
    this.averaging = true
  }
}

//declare global variables
let button
let heights
let run = false

//set canvas element to porportion of browser height
document.getElementById('sampleCanvas').width = window.innerWidth * 0.5
document.getElementById('sampleCanvas').height = window.innerHeight * 0.57
document.getElementById('populationCanvas').width = window.innerWidth * 0.5
document.getElementById('populationCanvas').height = window.innerHeight * 0.2
document.getElementById('avgline').width = window.innerWidth * 0.5
document.getElementById('avgline').height = window.innerHeight * 0.57

let SampleCanvasWidth = document.getElementById('sampleCanvas').width
let SampleCanvasHeight = document.getElementById('sampleCanvas').height
let PopulationCanvasWidth = document.getElementById('populationCanvas').width
let PopulationCanvasHeight = document.getElementById('populationCanvas').height

//resize canvas and update variables when window resizes
function resizeCanvas () {
  document.getElementById('sampleCanvas').width = window.innerWidth * 0.5
  document.getElementById('sampleCanvas').height = window.innerHeight * 0.35
  document.getElementById('populationCanvas').width = window.innerWidth * 0.5
  document.getElementById('populationCanvas').height = window.innerHeight * 0.35

  SampleCanvasWidth = document.getElementById('sampleCanvas').width
  SampleCanvasHeight = document.getElementById('sampleCanvas').height
  PopulationCanvasWidth = document.getElementById('populationCanvas').width
  PopulationCanvasHeight = document.getElementById('populationCanvas').height

  //redisplay pop graph
  for (let i = 0; i < populationheights.length; i++) {
    rect(
      i * (PopulationCanvasWidth / 10),
      PopulationCanvasHeight,
      PopulationCanvasWidth / 10,
      -populationheights[i],
      '#000000',
      'populationCanvas'
    )
  }
}

window.addEventListener('resize', resizeCanvas)

//setup
document.getElementById('button').onclick = function () {
  run = !run
  if (run) {
    document.getElementById('button').innerHTML = 'Stop Sampling'
  } else {
    document.getElementById('button').innerHTML = 'Start Sampling'
  }
}

//create weighted basket to generate pop numbers
let weightednums = []
let weight = 1;
for (let i = 1; i < 11; i++) {
  weightednums.push(i)
}

//add extra numbers for weight and around weight
for (let i = 0; i < 10; i++) {
  weightednums.push(weight)
}

if (weight > 1) {
    weightednums.push(weight - 1)
    weightednums.push(weight - 1)
    weightednums.push(weight - 1)
}

if (weight < 10) {
    weightednums.push(weight + 1)
    weightednums.push(weight + 1)
    weightednums.push(weight + 1)
}

if (weight <= 8) {
    weightednums.push(weight + 2)
    weightednums.push(weight + 2)
}

if (weight > 2) {
    weightednums.push(weight - 2)
    weightednums.push(weight - 2)
}

//setup population
let population = []
for (let i = 0; i < 1000; i++) {
  population.push(weightednums[Math.floor(random(0, weightednums.length))])
}

//graph population
//setup population heights
populationheights = []

for (let i = 0; i < 10; i++) {
  populationheights.push(0)
}

//setup population heights
for (let i = 0; i < population.length; i++) {
  if (population[i] == 1) {
    populationheights[0] += 1
  }
  if (population[i] == 2) {
    populationheights[1] += 1
  }
  if (population[i] == 3) {
    populationheights[2] += 1
  }
  if (population[i] == 4) {
    populationheights[3] += 1
  }
  if (population[i] == 5) {
    populationheights[4] += 1
  }
  if (population[i] == 6) {
    populationheights[5] += 1
  }
  if (population[i] == 7) {
    populationheights[6] += 1
  }
  if (population[i] == 8) {
    populationheights[7] += 1
  }
  if (population[i] == 9) {
    populationheights[8] += 1
  }
  if (population[i] == 10) {
    populationheights[9] += 1
  }
}

//display graph
for (let i = 0; i < populationheights.length; i++) {
  rect(
    i * (PopulationCanvasWidth / 10),
    PopulationCanvasHeight,
    PopulationCanvasWidth / 10,
    -populationheights[i],
    populationbarcolor,
    'populationCanvas'
  )
}

let framesPerSecond = 60
let interval

//always avg display line
rect(
  0,
  SampleCanvasHeight / 2.5 + 20,
  SampleCanvasWidth,
  2,
  '#000000',
  'avgline'
)

//add avg text
var canvas = document.getElementById('avgline')
var context = canvas.getContext('2d')
console.log(canvas)
context.fillStyle = 'black'
context.font = '18px Arial'
console.log(SampleCanvasHeight)
context.fillText('Average', 0, SampleCanvasHeight / 2.5 + 40)
context.fillText('Population', 0, 18)

function animate () {
  setTimeout(function () {
    requestAnimationFrame(animate)

    // animating/drawing code goes here
    if (run) {
      CentralLimitTheorem()
    }
  }, 1000 / framesPerSecond)
}

animate()

let BallList = []
let sampleSize = 3
//change input value
document.getElementById('sampleSize').value = sampleSize

function CentralLimitTheorem () {
  //clear background
  rect(0, 0, SampleCanvasWidth, SampleCanvasHeight, '#FFFFFF', 'sampleCanvas')

  if (BallList.length == 0) {
    newSample()
  }

  updateSamples()
  updateGraph()
}

function newSample () {
  //clear background
  rect(0, 0, SampleCanvasWidth, SampleCanvasHeight, '#FFFFFF', 'sampleCanvas')

  //get random samples from population
  let nums = []
  for (let i = 0; i < sampleSize; i++) {
    //get random index from population arr
    let index = random(0, 100)
    nums.push(population[index])
  }

  //create sample list
  let SampleBallList = new SampleList(nums)
  SampleBallList.initilize()

  //add sampleballlist to a list to keep track and update sample graphic
  BallList.push(SampleBallList)

  //update and display all balls
  updateSamples()

  //graph distribution
  updateGraph()
}

function addtograph (mean) {
  //declare bar array
  if (heights == null) {
    heights = []
    for (let i = 0; i < 10; i++) {
      heights.push(0)
    }
  }

  console.log(mean)

  //get freq
  if (mean < 1) {
    heights[0] += 1
  }
  if (mean < 2 && mean >= 1) {
    heights[1] += 1
  }
  if (mean < 3 && mean >= 2) {
    heights[2] += 1
  }
  if (mean < 4 && mean >= 3) {
    heights[3] += 1
  }
  if (mean < 5 && mean >= 4) {
    heights[4] += 1
  }
  if (mean < 6 && mean >= 5) {
    heights[5] += 1
  }
  if (mean < 7 && mean >= 6) {
    heights[6] += 1
  }
  if (mean < 8 && mean >= 7) {
    heights[7] += 1
  }
  if (mean < 9 && mean >= 8) {
    heights[8] += 1
  }
  if (mean >= 9) {
    heights[9] += 1
  }
}

function updateGraph () {
  if (!heights) {
    return
  }

  //get max
  let max = 0
  for (let i = 0; i < heights.length; i++) {
    //get max for mapping later
    if (heights[i] > max) {
      max = heights[i]
    }
  }

  //graph distribution
  for (let i = 0; i < heights.length; i++) {
    //map barheight to canvas height
    let barheight = heights[i]
    barheight = map(barheight, 0, max + 20, SampleCanvasHeight / 2)
    rect(
      i * (SampleCanvasWidth / 10),
      SampleCanvasHeight,
      SampleCanvasWidth / 10,
      -barheight,
      samplebarcolor,
      'sampleCanvas'
    )
  }
}

function updateSamples () {
  //update and display all balls
  for (let i = 0; i < BallList.length; i++) {
    //check if need to shift to mean
    if (BallList[i].checkMidBoundary() && !BallList[i].averaging) {
      BallList[i].averageList()
    }

    //check if out of bounds
    if (BallList[i].checkEndBoundary()) {
      BallList.splice(i, 1)
    }
    BallList[i].update()
    BallList[i].display()
  }
}

function map (x, current_min, current_max, new_max) {
  return ((x - current_min) / (current_max - current_min)) * new_max
}

function rect (x, y, w, h, color, canvas) {
  var c = document.getElementById(canvas)
  var ctx = c.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = '#FFF'
  ctx.rect(x, y, w, h)
  ctx.stroke()
}

function random (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function newSampleSize () {
  //change sample size
  sampleSize = document.getElementById('sampleSize').value

  //restart entire CLT
  BallList = []
  heights = null
}

function newFrameRate () {
  //change sample size
  framesPerSecond = document.getElementById('framerate').value
}
