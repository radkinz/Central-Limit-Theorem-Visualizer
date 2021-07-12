console.log("yoooo")

//declare global variables
let button;
let heights;
let run = false;

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
    rect(i * 10, 200, 10, -populationheights[i], "#000000", "populationCanvas");
}

function loop() {

    window.requestAnimationFrame(loop);

    if (run) {
        CentralLimitTheorem();
    }

}

loop();

function CentralLimitTheorem() {
    //clear background
    rect(0, 0, 500, 200, "#FFFFFF", "myCanvas");

    //get random samples from population
    let nums = [];
    for (let i = 0; i < 5; i++) {
        //get random index from population arr
        let index = random(0, 100)
        nums.push(population[index])
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
    let total = 0;
    for (let i = 0; i < heights.length; i++) {
        total += heights[i];
    }

    //graph distribution
    for (let i = 0; i < heights.length; i++) {
        //get percentage
        let height = (heights[i] / total) * 500;
        rect(i * 10, 200, 10, -height, "#000000", "myCanvas");
    }
}

function rect(x, y, w, h, color, canvas) {
    var c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
