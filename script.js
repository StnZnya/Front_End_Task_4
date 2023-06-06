fetch('https://source.unsplash.com/collection/190727/1600x900', {
  method: 'HEAD'
})
  .then(response => {
    const imageURLs = [];
    for (let i = 0; i < 12; i++) {
      const imageURL = response.url + '/' + (i + 1);
      imageURLs.push(imageURL);
    }
    return Promise.all(imageURLs.map(url => fetch(url)));
  })
  .then(responses => {
    const images = responses.map(response => {
      const img = document.createElement('img');
      img.src = response.url;
      const div = document.createElement('div');
      div.classList.add('image-item');
      div.appendChild(img);
      return div;
    });

    const container = document.getElementById('image-grid');
    container.append(...images);
  });