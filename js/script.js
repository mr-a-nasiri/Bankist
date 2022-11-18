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
