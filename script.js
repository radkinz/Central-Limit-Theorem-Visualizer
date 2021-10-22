//class to handle sample graphic
class SampleBall {
    constructor(sample, c) {
        this.sampleNum = sample;
        this.y = 0;
        this.x = (this.getXpos() * (SampleCanvasWidth / 10)) + ((SampleCanvasWidth / 10)/2);
        this.color = c;
    }

    getXpos() {
        if (this.sampleNum < 10) {
            return 0;
        }
        if (this.sampleNum < 20 && this.sampleNum >= 10) {
            return 1;
        }
        if (this.sampleNum < 30 && this.sampleNum >= 20) {
            return 2;
        }
        if (this.sampleNum < 40 && this.sampleNum >= 30) {
            return 3;
        }
        if (this.sampleNum < 50 && this.sampleNum >= 40) {
            return 4;
        }
        if (this.sampleNum < 60 && this.sampleNum >= 50) {
            return 5;
        }
        if (this.sampleNum < 70 && this.sampleNum >= 60) {
            return 6;
        }
        if (this.sampleNum < 80 && this.sampleNum >= 70) {
            return 7;
        }
        if (this.sampleNum < 90 && this.sampleNum >= 80) {
            return 8;
        }
        if (this.sampleNum >= 90) {
            return 9;
        }
    }

    show(canvas) {
        var c = document.getElementById(canvas);
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move() {
        this.y += 6;
    }
}

//class to create sample list
class SampleList {
    constructor(sampleListt) {
        this.samplelist = sampleListt;
        this.ballList = [];
    }

    initilize() {
        for (let i = 0; i < this.samplelist.length; i++) {
            this.ballList.push(new SampleBall(this.samplelist[i], '#2793ef'));
        }
    }

    display() {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].show("sampleCanvas");
        }
    }

    update() {
        for (let i = 0; i < this.ballList.length; i++) {
            this.ballList[i].move();
        }
    }

    checkMidBoundary() {
        for (let i = 0; i < this.ballList.length; i++) {
            if (this.ballList[i].y > (SampleCanvasHeight/2.5)) {
                return true
            }
        }

        return false
    }

    checkEndBoundary() {
        for (let i = 0; i < this.ballList.length; i++) {
            if (this.ballList[i].y > SampleCanvasHeight) {
                return true
            }
        }

        return false
    }

    averageList() {
        let mean = 0;
        for (let i = 0; i < this.ballList.length; i++) {
            mean += this.ballList[i].sampleNum;
        }
        mean = mean/this.ballList.length;
        let averageBall = new SampleBall(mean, "#FF0000");
        averageBall.y = (SampleCanvasHeight/2.5);

        //empty list and replace with just the sample
        this.ballList = [];
        this.ballList.push(averageBall);
    }
}

//declare global variables
let button;
let heights;
let run = false;

//set canvas element to porportion of browser height
document.getElementById("sampleCanvas").width = (window.innerWidth * 0.50);
document.getElementById("sampleCanvas").height = (window.innerHeight * 0.55);
document.getElementById("populationCanvas").width = (window.innerWidth * 0.50);
document.getElementById("populationCanvas").height = (window.innerHeight * 0.25);

let SampleCanvasWidth = document.getElementById("sampleCanvas").width;
let SampleCanvasHeight = document.getElementById("sampleCanvas").height;
let PopulationCanvasWidth = document.getElementById("populationCanvas").width;
let PopulationCanvasHeight = document.getElementById("populationCanvas").height;

//resize canvas and update variables when window resizes
function resizeCanvas() {
    document.getElementById("sampleCanvas").width = (window.innerWidth * 0.50);
    document.getElementById("sampleCanvas").height = (window.innerHeight * 0.35);
    document.getElementById("populationCanvas").width = (window.innerWidth * 0.50);
    document.getElementById("populationCanvas").height = (window.innerHeight * 0.35);

    SampleCanvasWidth = document.getElementById("sampleCanvas").width;
    SampleCanvasHeight = document.getElementById("sampleCanvas").height;
    PopulationCanvasWidth = document.getElementById("populationCanvas").width;
    PopulationCanvasHeight = document.getElementById("populationCanvas").height;

    //redisplay pop graph
    for (let i = 0; i < populationheights.length; i++) {
        rect(i * (PopulationCanvasWidth / 10), PopulationCanvasHeight, PopulationCanvasWidth / 10, -populationheights[i], "#000000", "populationCanvas");
    }
}

window.addEventListener("resize", resizeCanvas);

//setup
document.getElementById("button").onclick = function () {
    run = !run;
    if (run) {
        document.getElementById("button").innerHTML = "Stop Sampling";
    } else {
        document.getElementById("button").innerHTML = "Start Sampling";
    }
};

//setup population
let population = []
for (let i = 0; i < 1000; i++) {
    population.push(random(0, 100))
}

//graph population
//setup population heights
populationheights = []

for (let i = 0; i < 10; i++) {
    populationheights.push(0)
}

//setup population heights 
for (let i = 0; i < population.length; i++) {
    if (population[i] < 10) {
        populationheights[0] += 1;
    }
    if (population[i] < 20 && population[i] >= 10) {
        populationheights[1] += 1;
    }
    if (population[i] < 30 && population[i] >= 20) {
        populationheights[2] += 1;
    }
    if (population[i] < 40 && population[i] >= 30) {
        populationheights[3] += 1;
    }
    if (population[i] < 50 && population[i] >= 40) {
        populationheights[4] += 1;
    }
    if (population[i] < 60 && population[i] >= 50) {
        populationheights[5] += 1;
    }
    if (population[i] < 70 && population[i] >= 60) {
        populationheights[6] += 1;
    }
    if (population[i] < 80 && population[i] >= 70) {
        populationheights[7] += 1;
    }
    if (population[i] < 90 && population[i] >= 80) {
        populationheights[8] += 1;
    }
    if (population[i] >= 90) {
        populationheights[9] += 1;
    }
}

//display graph
for (let i = 0; i < populationheights.length; i++) {
    rect(i * (PopulationCanvasWidth / 10), PopulationCanvasHeight, PopulationCanvasWidth / 10, -populationheights[i], "#000000", "populationCanvas");
}

function loop() {

    window.requestAnimationFrame(loop);

    if (run) {
        CentralLimitTheorem();
    }

}

loop();

let BallList = [];
function CentralLimitTheorem() {
    //clear background
    rect(0, 0, SampleCanvasWidth, SampleCanvasHeight, "#FFFFFF", "sampleCanvas");

    //get random samples from population
    let nums = [];
    for (let i = 0; i < 5; i++) {
        //get random index from population arr
        let index = random(0, 100)
        nums.push(population[index])
    }

    //create sample list
    //clear background of sample canvas
    let SampleBallList = new SampleList(nums);
    SampleBallList.initilize();

    //add sampleballlist to a list to keep track and update sample graphic
    BallList.push(SampleBallList);

    //update and display all balls
    for (let i = 0; i < BallList.length; i++) {
        BallList[i].update();

        //check if need to shift to mean
        if (BallList[i].checkMidBoundary() && BallList[i].ballList.length > 1) {
            BallList[i].averageList();
        }

        //check if out of bounds
        if (BallList[i].checkEndBoundary() && BallList[i].ballList.length == 1) {
            BallList.splice(i, 1);
        }
        
        BallList[i].display();
    }

    //declare bar array
    if (heights == null) {
        heights = [];
        for (let i = 0; i < 10; i++) {
            heights.push(0);
        }
    }

    //get mean
    let mean = 0;
    for (let i = 0; i < nums.length; i++) {
        mean += nums[i];
    }
    mean = mean / nums.length;

    //get freq
    if (mean < 10) {
        heights[0] += 1;
    }
    if (mean < 20 && mean >= 10) {
        heights[1] += 1;
    }
    if (mean < 30 && mean >= 20) {
        heights[2] += 1;
    }
    if (mean < 40 && mean >= 30) {
        heights[3] += 1;
    }
    if (mean < 50 && mean >= 40) {
        heights[4] += 1;
    }
    if (mean < 60 && mean >= 50) {
        heights[5] += 1;
    }
    if (mean < 70 && mean >= 60) {
        heights[6] += 1;
    }
    if (mean < 80 && mean >= 70) {
        heights[7] += 1;
    }
    if (mean < 90 && mean >= 80) {
        heights[8] += 1;
    }
    if (mean >= 90) {
        heights[9] += 1;
    }

    //get total
    let max = 0;
    let total;
    for (let i = 0; i < heights.length; i++) {
        total += heights[i];

        //get max for mapping later
        if (heights[i] > max) {
            max = heights[i];
        }
    }

    //graph distribution
    for (let i = 0; i < heights.length; i++) {
        //map barheight to canvas height
        let barheight = heights[i];
        barheight = map(barheight, 0, max + 20, SampleCanvasHeight/2);
        rect(i * (SampleCanvasWidth/ 10), SampleCanvasHeight, SampleCanvasWidth / 10, -barheight, "#000000", "sampleCanvas");
    }
}

function map(x, current_min, current_max, new_max) {
    return ((x - current_min) / (current_max - current_min)) * new_max;
}

function rect(x, y, w, h, color, canvas) {
    var c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#FFF";
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
