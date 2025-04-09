function initFormatter() {
  // Initialize Packery
  const grid = document.querySelector(".grid");

  var iso = new Isotope(grid, {
    // options
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
  });

  // element argument can be a selector string
  //   for an individual element
  var iso = new Isotope(".grid", {
    masonry: {
      columnWidth: 200,
    },
  });

  // Filter items on button click
  const buttonGroup = document.querySelector(".filter-button-group");
  buttonGroup.addEventListener("click", function (event) {
    // Check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
      const filterValue = event.target.getAttribute("data-filter");
      iso.arrange({
        filter: filterValue,
      });
    }
  });
}
