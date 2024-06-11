// Add a class to the header when scrolling down to make it sticky
window.addEventListener("scroll", function() {
    const header = document.querySelector(".sticky-header");
    if (window.scrollY > 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
  