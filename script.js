createGrid(16); // Create a 16x16 grid on page load

// Create a grid of divs with the specified number of rows and columns
function createGrid(size) {
    // Set the grid container to have the correct number of rows and columns
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = 'repeat(${size}, 1fr)';


    // Create the divs
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item'); 
        gridItem.addEventListener('mouseover', 'changeColor'); // Add event listener to change color on mouseover
        gridContainer.appendChild(gridItem); // Add the div to the grid container
    }
}

