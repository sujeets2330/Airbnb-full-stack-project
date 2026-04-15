// const { title } = require("process");

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  });
 


  // document.addEventListener("DOMContentLoaded", function() {
  //   const tabsBox = document.querySelector(".tabs-box");
  //   const allTabs = tabsBox.querySelectorAll(".tab");
  //   const arrowIcons = document.querySelectorAll("#filters .icon i");
  
  //   let isDragging = false;
  //   let startX, scrollLeft;
  
  //   const handleIcons = () => {
  //     let scrollVal = tabsBox.scrollLeft;
  //     let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
  //     arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
  //     arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  //   };
  
  //   arrowIcons.forEach(icon => {
  //     icon.addEventListener("click", () => {
  //       let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
  //       handleIcons(scrollWidth);
  //     });
  //   });
  
  //   allTabs.forEach(tab => {
  //     tab.addEventListener("click", () => {
  //       tabsBox.querySelector(".active")?.classList.remove("active");
  //       tab.classList.add("active");
  //     });
  //   });
  
  //   const dragging = (e) => {
  //     if (!isDragging) return;
  //     e.preventDefault();
  //     let x = e.pageX || e.touches[3].pageX;
  //     let walk = (x - startX) * 5; // Adjust scroll speed
  //     tabsBox.scrollLeft = scrollLeft - walk;
  //     handleIcons(tabsBox.scrollLeft);
  //   };
  
  //   const dragStart = (e) => {
  //     isDragging = true;
  //     tabsBox.classList.add("dragging");
  //     startX = e.pageX || e.touches[3].pageX;
  //     scrollLeft = tabsBox.scrollLeft;
  //   };
  
  //   const dragStop = () => {
  //     isDragging = false;
  //     tabsBox.classList.remove("dragging");
  //   };
  
  //   tabsBox.addEventListener("mousedown", dragStart);
  //   tabsBox.addEventListener("touchstart", dragStart);
  
  //   tabsBox.addEventListener("mousemove", dragging);
  //   tabsBox.addEventListener("touchmove", dragging);
  
  //   document.addEventListener("mouseup", dragStop);
  //   tabsBox.addEventListener("touchend", dragStop);
  
  //   // Initialize arrow visibility
  //   handleIcons();
  // });
 
//   let availableKeywords = [
//     'HTML',
//     'CSS',
//     'EASY TO WRITE',
//     'DAYANANDA SAGAR COLLEGE',
//     'YELLOW COLOR SHIRT I DONT WANT',
//     'HEY WANTED WORKERS HERE',
//     'MEDICAL LIFE ENGINEERING LIFE ',
// ];

// const resultsBox = document.querySelector(".result-box");
// const inputBox = document.getElementById("input-box");

// inputBox.onkeyup = function () {
//     let result = [];
//     let input = inputBox.value;
//     if (input.length) { 
//         result = availableKeywords.filter((keyword) => {
//             return keyword.toLowerCase().includes(input.toLowerCase());
//         });
//         console.log(result);
//     }
//     display(result);

//     if (!result.length) {
//         resultsBox.innerHTML = '';
//     }
// }

// function display(result) {
//     const content = result.map((list) => {
//         return `<li onclick="selectInput(this)">${list}</li>`; 
//     });
//     resultsBox.innerHTML = `<ul>${content.join('')}</ul>`; 
// }

// function selectInput(list) {
//     inputBox.value = list.innerHTML;
//     resultsBox.innerHTML = '';
// }


// document.addEventListener("DOMContentLoaded", function () {
//   const availableKeywords = [
//       { title: 'Cozy Beachfront Cottage', url: '/listings/66af89f709ab0bfef29c17b1' },
//       { title: 'Modern Loft in Downtown', url: '/listings/66af89f709ab0bfef29c17b1' },
//       { title: 'Mountain Retreat', url: '/listings/66af89f709ab0bfef29c17b2' },
//       { title: 'Historic Villa in Tuscany', url: '/listings/66af89f709ab0bfef29c17b3' },
//       { title: 'Secluded Treehouse Getaway', url: '/listings/66af89f709ab0bfef29c17b4' },
//       { title: 'Beachfront Paradise', url: '/listings/66af89f709ab0bfef29c17b5' },
//       { title: 'Rustic Cabin by the Lake', url: '/listings66af89f709ab0bfef29c17b6' },
//   ];

//   const resultsBox = document.querySelector(".result-box");
//   const inputBox = document.getElementById("input-box");

//   inputBox.addEventListener("keyup", function () {
//       let input = inputBox.value.toLowerCase();
//       let result = availableKeywords.filter(keyword => keyword.title.toLowerCase().includes(input));
//       console.log("Filtered Results:", result); 
//       display(result);
//   });

//   function display(result) {
//       if (result.length) {
//           const content = result.map(item => `<li><a href="${item.url}">${item.title}</a></li>`);
//           resultsBox.innerHTML = `<ul>${content.join('')}</ul>`;
//       } else {
//           resultsBox.innerHTML = '';
//       }
//   }
// });


