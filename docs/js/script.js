// blob code
const cursors = document.querySelectorAll("body > div.blob");

let cursorOffsetX = 0;
let cursorOffsetY = 0;

body.addEventListener("mousemove", (e) => {
    cursors.forEach((cursor) => {
        cursorOffsetY = e.clientY;

        const offsetX = cursor.offsetWidth / 2;
        const offsetY = cursor.offsetHeight / 2;
        const posX = e.pageX - offsetX;
        const posY = e.pageY - offsetY;

        cursor.style.display = "block";
        cursor.style.top = posY + "px";
        cursor.style.left = posX + "px";
    });
});

document.addEventListener("scroll", () => {
    cursors.forEach((cursor) => {
        const offsetY = cursor.offsetHeight / 2;
        const posY = cursorOffsetY - offsetY + window.scrollY;
        cursor.style.top = posY + "px";
    });
});


// Decide the color of the nav elements
const target = document.getElementById("checkTopDiv");
const header = document.querySelector("body header");

window.addEventListener("scroll", () => {
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
});