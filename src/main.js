import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    createGallery(data.hits);

    scrollToNewImages();

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
});

function scrollToNewImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
