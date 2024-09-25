const search = document.querySelector('#search');
const searchbtn = document.querySelector('#search-btn');
const imgContainer = document.querySelector('.image-container');

searchbtn.addEventListener('click', async () => {
    const search_value = search.value.trim();
    console.log(search_value, "search_value");

    if (search_value === '') {
        alert('Please enter a search term');
        return;
    }

    const key = '0iDU6E4clY07SdAO-LmG0G-GUfjiZYrjeuZPwe3X2rY';
    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(search_value)}&client_id=${key}`;
    

    try {
        let response = await fetch(url);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        let data = await response.json();
        console.log(data, "data");

        disImages(data);
    } catch (error) {
        console.error("Failed to fetch images:", error);
        alert("There was a problem fetching images. Please try again later.");
    }
});

function disImages(data) {
    // Clear previous images
    imgContainer.innerHTML = '';

    data.results.forEach(element => {
        console.log(element.urls.regular, "element.urls.regular");
        const img = document.createElement('img');
        img.src = element.urls.regular;
        img.alt = element.alt_description || 'Image';  // Add alt text for accessibility
        imgContainer.appendChild(img);
    });
}
