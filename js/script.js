const api = "https://api.unsplash.com";
const key = "XNMHBANvtC9AdY6629KyMvqu0sYwzD83JqY1Azfw8TA";
const count = 30;

let imageGrid = document.querySelector('.image-grid');

const addToDom = photos => {
  photos.forEach(photo => {
    let el = document.createElement("div");
    el.classList.add('image-item');
    el.style.backgroundColor = photo.color;
    el.innerHTML =
      `<a href="${photo.links.download}" target="_blank"/>
        <img src="${photo.urls.regular}=" loading="lazy">
      </a>`;
    imageGrid.appendChild(el);
  });
};

const loadMore = () => {
  let photos = [];
  fetch(`${api}/photos/random?client_id=${key}&count=${count}`)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      // console.log(data);
      photos.push(...data);
      addToDom(photos);
    })
    .catch(err => {
      console.log(err);
    });
};

window.addEventListener('scroll', function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
    loadMore();
  }
});

loadMore();