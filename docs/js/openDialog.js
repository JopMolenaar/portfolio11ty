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
    item.classList.add("clicked");
    let itemStorage; 
    let itemStorage2; 

    items.forEach((item2) => {
      if (item !== item2 && item2.classList.contains("enlarge")) {
        item2.classList.add("transition-back");
        itemStorage = item2;
        setTimeout(() => {
            item2.classList.remove("enlarge");
        }, 200);
      }
    });

    if(item.classList.contains("enlarge")) {
        item.classList.add("transition-back");
        itemStorage2 = item;
        setTimeout(() => {
            item.classList.remove("enlarge");
        }, 200);
    } else {
        item.classList.add("transition");
        setTimeout(() => {
            item.classList.add("enlarge");
        }, 200);
    }


    // TODO when clicked and in animtion, remove clickable events on these
    setTimeout(() => {
        content.classList.toggle("doneLoading");
        grid.classList.remove("loading");
        item.classList.remove("clicked");
        item.classList.add("content-active");

        itemStorage ? itemStorage.classList.remove("content-active"): null;
        itemStorage2 ? itemStorage2.classList.remove("content-active"): null;
    }, 1200);

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