// blob code
const cursors = document.querySelectorAll("body > div.blob");
const body = document.querySelector("body")

let cursorOffsetX = 0;
let cursorOffsetY = 0;

body.addEventListener("mousemove", (e) => {
    // Only run if not a touch event
    if (e.pointerType && e.pointerType !== "mouse") return;
    if (e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
        // Modern browsers: only allow mouse
    } else if (window.matchMedia("(pointer: coarse)").matches) {
        // On touch devices, don't run
        return;
    }

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