'use strict';

///////////////////////////////////////////////////////
/////----------- Smooth Scrolling -----------/////
///////////////////////////////////////////////////////

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  const id = e.target.getAttribute('href');
  const target = document.querySelector(id);

  target.scrollIntoView({ behavior: 'smooth' });

  e.preventDefault();
});

///////////////////////////////////////////////////////
/////----------- Tabbed Component -----------/////
///////////////////////////////////////////////////////

document.querySelector('.operations__tab-container').addEventListener('click', function (e) {
  if (!e.target.closest('.operations__tab')) return;

  const targetTab = e.target.closest('.operations__tab').dataset.tab;

  // Remove active class from all content
  document.querySelectorAll('.operations__content').forEach(function (tab) {
    tab.classList.remove('operations__content--active');
  });

  // Remove active class from all tabs
  document.querySelectorAll('.operations__tab').forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });

  // Add active class to target content
  document
    .querySelector(`.operations__content--${targetTab}`)
    .classList.add('operations__content--active');

  // Add active class to target tab
  document.querySelector(`.operations__tab--${targetTab}`).classList.add('operations__tab--active');
});

///////////////////////////////////////////////////////
/////----------- Sticky Navigation -----------/////
///////////////////////////////////////////////////////

const stickyNav = function () {
  const nav = document.querySelector('.nav');
  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries;

      if (!entry.isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `${-nav.getBoundingClientRect().height}px`,
    }
  );

  const header = document.querySelector('.header');
  observer.observe(header);
};
stickyNav();

//////////////////////////////////////////////////////////////////////
/////----------- Revealing Sections on Scroll -----------/////
//////////////////////////////////////////////////////////////////////

const revealSection = function () {
  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.toggle('section--hidden');
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => observer.observe(section));
};
revealSection();

///////////////////////////////////////////////////
/////----------- Lazy Loading -----------/////
///////////////////////////////////////////////////

const lazeLoading = function () {
  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '200px',
    }
  );

  const LazyImages = document.querySelectorAll('.lazy-img');
  LazyImages.forEach(Image => observer.observe(Image));
};
