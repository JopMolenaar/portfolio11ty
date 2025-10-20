// blob code
const cursors = document.querySelectorAll("body > div.blob");
const body = document.querySelector("body")

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