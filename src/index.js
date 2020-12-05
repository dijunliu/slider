const imgContent = document.querySelector(".imgContent");
const imgList = document.querySelector(".imgList");
debugger;
const imgs = imgList.querySelectorAll("li");
const pointList = document.querySelector(".points");
const screenWidth = document.body.offsetWidth;
imgContent.style.height = imgs[0].offsetHeight + "px";

for (let index = 0; index < imgs.length; index++) {
  const point = document.createElement("li");
  if (index === 0) {
    point.classList.add("active");
  }
  pointList.appendChild(point);
}

const points = pointList.querySelectorAll("li");

let left = imgs.length - 1,
  center = 0,
  right = 1;
imgs[left].style.transform = `translateX(${-screenWidth}px)`;
imgs[center].style.transform = `translateX(0px)`;
imgs[right].style.transform = `translateX(${screenWidth}px)`;

let timer = null,
  startTime = null,
  startX = 0;

function showNext() {
  left = center;
  center = right;
  right++;
  if (right > imgs.length - 1) {
    right = 0;
  }
  imgs[left].style.transition = "transform 1s";
  imgs[center].style.transition = "transform 1s";
  imgs[right].style.transition = "none";
  imgs[left].style.transform = `translateX(${-screenWidth}px)`;
  imgs[center].style.transform = `translateX(0px)`;
  imgs[right].style.transform = `translateX(${screenWidth}px)`;
  setPoint();
}

function showPrev() {
  right = center;
  center = left;
  left--;
  if (left < 0) {
    left = imgs.length - 1;
  }
  imgs[left].style.transition = "none";
  imgs[center].style.transition = "transform 1s";
  imgs[right].style.transition = "transform 1s";
  imgs[left].style.transform = `translateX(${-screenWidth}px)`;
  imgs[center].style.transform = `translateX(0px)`;
  imgs[right].style.transform = `translateX(${screenWidth}px)`;
  setPoint();
}

function setPoint() {
  for (let index = 0; index < points.length; index++) {
    points[index].classList.remove("active");
  }
  points[center].classList.add("active");
}
timer = setInterval(showNext, 3000);
imgContent.addEventListener("touchstart", touchstartHandler);
imgContent.addEventListener("touchmove", touchmoveHandler);
imgContent.addEventListener("touchend", touchendHandler);

function touchstartHandler(e) {
  clearInterval(timer);
  startTime = Date.now();
  startX = e.changedTouches[0].clientX;
}

function touchmoveHandler(e) {
  let dx = e.changedTouches[0].clientX - startX;
  imgs[left].style.transition = "none";
  imgs[center].style.transition = "none";
  imgs[right].style.transition = "none";
  imgs[left].style.transform = `translateX(${-screenWidth + dx}px)`;
  imgs[center].style.transform = `translateX(${dx}px)`;
  imgs[right].style.transform = `translateX(${screenWidth + dx}px)`;
}

function touchendHandler(e) {
  let dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > screenWidth / 3) {
    if (dx > 0) {
      showPrev();
    } else {
      showNext();
    }
  } else {
    imgs[left].style.transition = "transform 1s";
    imgs[center].style.transition = "transform 1s";
    imgs[right].style.transition = "transform 1s";
    imgs[left].style.transform = `translateX(${-screenWidth}px)`;
    imgs[center].style.transform = `translateX(0px)`;
    imgs[right].style.transform = `translateX(${screenWidth}px)`;
  }
  timer = setInterval(showPrev, 3000);
}
