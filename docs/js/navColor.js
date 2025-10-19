// Decide the color of the nav elements
const target = document.querySelector("h1");
const header = document.querySelector("body header");

window.addEventListener("scroll", () => {
  decideLinkColor();
});
window.onload = () => {
  decideLinkColor();
};

const decideLinkColor = () => {
  const headerHeight = header.offsetHeight / 2;
  const rect = target.getBoundingClientRect();
  const links = header.querySelectorAll("a");
  let color = "black";

  if (rect.top <= headerHeight) {
    color = "white";
  } else {
    color = "black";
  }

  links.forEach((link) => {
    link.style.color = color;
  });
};