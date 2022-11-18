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
/////----------- Smooth Scrolling -----------/////
///////////////////////////////////////////////////////
