// Decide the color of the nav elements
const target = document.querySelector("h1");
const header = document.querySelector("body header");

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 1287) {
    const imgs = document.querySelectorAll("#aboutMe img"); // only select the images
    const numCols = 4;
    const numRows = 2;

    const reservedCells = [
      { col: 1, row: 1 }, // title
      { col: 2, row: 1 }, // title
      { col: 2, row: 2 }, // text
      { col: 1, row: 2 }, // img on the left
    ];

    const cells = [];
    for (let col = 1; col <= numCols; col++) {
      for (let row = 1; row <= numRows; row++) {
        // skip reserved cells
        if (!reservedCells.some((c) => c.col === col && c.row === row)) {
          cells.push({ col, row });
        }
      }
    }

    // Shuffle the free cells
    const shuffledCells = cells.sort(() => Math.random() - 0.5);

    imgs.forEach((img, i) => {
      const index = i + 1;
      if (i === 4) {
        // last img is always on a fixed position
        return;
      }
      const cell = shuffledCells[i]; // assign one unique cell

      // Rotation limited to -10deg to +10deg
      const rotate = (Math.random() * 20 - 10).toFixed(1) + "deg";

      // Alignment stays random to avoid strict centering
      const alignOptions = ["start", "center", "end"];
      const justifyOptions = ["start", "center", "end"];
      const align = alignOptions[Math.floor(Math.random() * alignOptions.length)];
      const justify = justifyOptions[Math.floor(Math.random() * justifyOptions.length)];

      // Apply CSS variables
      img.style.setProperty(`--img${index}-rotate`, rotate);
      img.style.setProperty(`--img${index}-col`, `${cell.col}/${cell.col + 1}`);
      img.style.setProperty(`--img${index}-row`, `${cell.row}/${cell.row + 1}`);
      img.style.setProperty(`--img${index}-align`, align);
      img.style.setProperty(`--img${index}-justify`, justify);
    });
  }

  // Check if the page is not scrolled on, if so, add the loading class
  if (window.scrollY === 0) {
    document.body.classList.add("loading");
  } else {
    document.body.classList.remove("loading");
  }

  decideLinkColor();
});

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