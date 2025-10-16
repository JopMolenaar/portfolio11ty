/**
 * @Authors:            Jop Molenaar
 * @Date created:       29-01-2024
 * @Date updated:       29-01-2024
 * @Description:
 */

const grid = document.querySelector("section.projects > ul");
const items = document.querySelectorAll("section.projects > ul > li");

// wrapGrid returns helpers you can use (unwrapGrid, forceGridAnimation)
const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(grid, {
  duration: 600, // ms
  stagger: 60, // ms between items
  easing: "easeInOut", // easing string from lib
});

items.forEach((item) => {
  item.addEventListener("click", async () => {
    const content = item.querySelector("section");
    grid.classList.add("loading");
    let itemStorage; 
    let itemStorage2; 

    items.forEach((item2) => {
      if (item !== item2 && item2.classList.contains("enlarge")) {
        item2.classList.remove("enlarge");
        item2.classList.add("transition-back");
        itemStorage = item2;
      }
    });

    if(item.classList.contains("enlarge")) {
        item.classList.remove("enlarge");
        item.classList.add("transition-back");
        itemStorage2 = item;
    } else {
        item.classList.add("enlarge");
        item.classList.add("transition");
    }


    // TODO when clicked and in animtion, remove clickable events on these
    setTimeout(() => {
        content.classList.toggle("doneLoading");
        grid.classList.remove("loading");
        item.classList.add("content-active");

        itemStorage ? itemStorage.classList.remove("content-active"): null;
        itemStorage2 ? itemStorage2.classList.remove("content-active"): null;
    }, 1000);

    setTimeout(() => {
        content.classList.toggle("doneLoading");
        grid.classList.remove("loading");

        items.forEach((item2) => {
            item2.classList.remove("transition-back");
            item2.classList.remove("transition");
        });
        

    }, 1300);
  });
});