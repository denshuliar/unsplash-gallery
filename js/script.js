const api = "https://api.unsplash.com";
const key = "9BsL2VVaWgrKl5BhzMdiL1Sb2qygEYUAqSOeQyd4p6Y";
const count = 30;

let imageGrid = document.querySelector('.image-grid');

const addToDom = photos => {
  photos.forEach(photo => {
    let el = document.createElement("div");
    el.classList.add('image-item');
    el.style.backgroundColor = photo.color;
    el.innerHTML =
      `<a href="${photo.links.download}" target="_blank"/>
        <img src="${photo.urls.regular}=">
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
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    loadMore();
  }
});

loadMore();