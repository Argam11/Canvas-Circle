const button = document.getElementById("button");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const oneDeg = Math.PI / 180;
let deg = 0;
let timer = null;

const lineData = [
  { id: 1, color: "#ff0000", initialDeg: 0 },
  { id: 2, color: "#00ff00", initialDeg: 45 },
  { id: 3, color: "#0000ff", initialDeg: 90 },
  { id: 4, color: "orange", initialDeg: 135 },
];
const circleData = [
  { id: 1, color: "orange", initialRadius: 100 },
  { id: 2, color: "orange", initialRadius: 50 },
  { id: 3, color: "orange", initialRadius: 0 },
];

button.addEventListener("click", function () {
  if (timer) clearInterval(timer), (timer = null);
  else run();

  const buttonText = this.innerText;
  if (buttonText === "START") this.innerText = "Stop";
  if (buttonText === "STOP") this.innerText = "Start";
});

function run() {
  timer = setInterval(() => {
    mainFunc();
  }, 10);
}

function mainFunc() {
  deg++;
  context.clearRect(0, 0, 300, 300);

  lineData.forEach((lineObj) => {
    context.save();
    context.beginPath();
    context.translate(150, 150);
    context.rotate(oneDeg * (deg + lineObj.initialDeg));
    context.moveTo(-150, -150);
    context.lineTo(150, 150);
    context.strokeStyle = lineObj.color;
    context.stroke();
    context.restore();
  });
  
  circleData.forEach((circleObj) => {
    circleObj.initialRadius++
    if (circleObj.initialRadius > 150) circleObj.initialRadius = 0;
    context.beginPath();
    context.arc(150, 150, circleObj.initialRadius, 0, 2 * Math.PI, false);
    context.strokeStyle = circleObj.color;
    context.stroke();
  });
}

mainFunc();
