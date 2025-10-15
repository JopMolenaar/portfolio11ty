/**
 * @Authors:            Jop Molenaar
 * @Date created:       29-01-2024
 * @Date updated:       29-01-2024
 * @Description:
 */

const grid = document.querySelector('section.projects ul');
const items = document.querySelectorAll('section.projects ul li');

// wrapGrid returns helpers you can use (unwrapGrid, forceGridAnimation)
const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(grid, {
    duration: 600,      // ms
    stagger: 60,        // ms between items
    easing: 'easeInOut' // easing string from lib
});

items.forEach(item => {
    item.addEventListener('click', () => {
        const content = item.querySelector('section');

        console.log('click');

        items.forEach(item2 => {
            if (item !== item2) {
                item2.classList.remove('active');
            }
        })
        item.classList.toggle('active');
        setTimeout(() => {
            content.classList.toggle('doneLoading');
        }, 1000);
    });
});