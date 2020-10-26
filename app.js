const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn= document.getElementById("jsSave");
const loadBtn= document.getElementById("loadImg");
const loadBtn2= document.getElementById("loadImg2");
const loadBtn3= document.getElementById("loadImg3");


const INITIAL_COLOR =""
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function inputImg(event){
  const a= event.target.name;
  console.log(a);
  const img = document.getElementById(`img${a}`);
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 600, 600);
  }
  img.src =`imgFolder/${a}.jpg`
}

function deleteImg() {
  
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); //path 만들지만 사용되지는 않음
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //여기부터 만들어져
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size =event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling===true){
    filling = false;
    mode.innerText="Fill"
  } else{
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick(){
  if (filling){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSave(){
  const imagereal = canvas.toDataURL('download/jpeg'); //이게 이미지야ㅑㅣ!!
  const link = document.createElement("a");
  link.href = imagereal
  link.download = "painJs_Export";
  link.click();
}



if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick); 
  //원하면 마우스 우클릭 방지가능  #2.6 canvas.addEventListener("contextmenu", handleCM); > function으로 event.preventDefault()
}

Array.from(colors).forEach(aa => aa.addEventListener("click", handleColor)); //aa는 each div를 말함

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSave);
}

if(loadBtn){
  loadBtn.addEventListener("click", inputImg);
}
if(loadBtn2){
  loadBtn2.addEventListener("click", inputImg);
}
if(loadBtn3){
  loadBtn3.addEventListener("click", inputImg);
}
