const API_KEY = 'LrwazfYo9ZVlcTIMr7ff09JBeeLkYzuvDChR2GmTkYdHUOOUfYq2udAq'; // Replace with your actual Pexels API key
const API_URL = 'https://api.pexels.com/v1/search?query=nature';

async function fetchImages() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images from Pexels API');
    }

    const data = await response.json();
    updateCarousel(data.photos);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function updateCarousel(photos) {
  const carouselIndicators = document.getElementById('carousel-indicators');
  const carouselInner = document.getElementById('carousel-inner');

  photos.forEach((photo, index) => {
    // Create carousel indicator
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = '#carouselExampleCaptions';
    indicator.dataset.bsSlideTo = index;
    indicator.ariaLabel = `Slide ${index + 1}`;
    if (index === 0) {
      indicator.classList.add('active');
      indicator.ariaCurrent = 'true';
    }
    carouselIndicators.appendChild(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    carouselItem.innerHTML = `
      <img src="${photo.src.landscape}" class="d-block w-100" alt="${photo.alt || 'Image'}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${photo.alt || 'Slide ' + (index + 1)}</h5>
      </div>
    `;
    carouselInner.appendChild(carouselItem);
  });
}

// Fetch images when the page loads
fetchImages();
