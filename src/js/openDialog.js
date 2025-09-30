/**
 * @Authors:            Jop Molenaar
 * @Date created:       29-01-2024
 * @Date updated:       29-01-2024
 * @Description:
 */

const body = document.querySelector("body");
const dialogs = document.querySelectorAll("dialog");

// projects.forEach((project) => {
//     project.addEventListener("click", () => {
//         dialogs.forEach((dialog) => {
//             if (dialog.id === `dialog_${project.dataset.project}`) {
//                 dialog.showModal();
//                 body.classList.add("modal-open");
//                 const closeBtn = dialog.querySelector("button");
//                 closeBtn.addEventListener("click", () => {
//                     body.classList.remove("modal-open");
//                 });
//             } 
//         });
//     });
// });

// function handleUnknownProject(element) {
//     // Add the 'unknown-project' class to the element
//     element.classList.add("unknown-project");

//     // Remove the 'unknown-project' class after 1000 milliseconds (1 second)
//     setTimeout(() => {
//         element.classList.remove("unknown-project");
//     }, 600);
// }
