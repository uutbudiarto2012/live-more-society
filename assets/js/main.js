const illRound1 = document.querySelector(".ill-round-1")
const titleContent = document.querySelector(".tth")
const titleContent2 = document.querySelector(".tth-2")
window.addEventListener("scroll", function () {
    const yValue = window.scrollY;
    titleContent.style.marginTop = yValue * - .5 + "px";
  });