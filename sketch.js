let button;
let heights;

function setup() {
  createCanvas(innerWidth, innerHeight - 50);
  button = select("button");
  button.mouseClicked(function () {
    //clear background
    background(255);

    //get random nums
    let nums = [];
    for (let i = 0; i < 10; i++) {
      nums.push(random(100));
    }

    //declare bar heights
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

    //graph distribution
    console.log(heights)
    fill(0);
    for (let i = 0; i < heights.length; i++) {
      rect(i * 10, height, 10, -heights[i]);
    }
  });
}