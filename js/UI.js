export class UI {
  ///////////////////////////////////////////////////////
  /////----------- Smooth Scrolling -----------/////
  ///////////////////////////////////////////////////////

  static smoothScrolling() {
    document.querySelector('.nav__links').addEventListener('click', function (e) {
      if (!e.target.classList.contains('nav__link')) return;

      const id = e.target.getAttribute('href');
      const target = document.querySelector(id);

      target.scrollIntoView({ behavior: 'smooth' });

      e.preventDefault();
    });
  }

  ///////////////////////////////////////////////////////
  /////----------- Tabbed Component -----------/////
  ///////////////////////////////////////////////////////

  static tabbedComponent() {
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
      document
        .querySelector(`.operations__tab--${targetTab}`)
        .classList.add('operations__tab--active');
    });
  }

  ///////////////////////////////////////////////////////
  /////----------- Sticky Navigation -----------/////
  ///////////////////////////////////////////////////////

  static stickyNav() {
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
  }

  //////////////////////////////////////////////////////////////////////
  /////----------- Revealing Sections on Scroll -----------/////
  //////////////////////////////////////////////////////////////////////

  static revealSection() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove('section--hidden');
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: [0.2, 0.8],
      }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
  }

  ///////////////////////////////////////////////////
  /////----------- Lazy Loading -----------/////
  ///////////////////////////////////////////////////

  static lazeLoading() {
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
  }

  ///////////////////////////////////////////////////
  /////----------- Slider Component -----------/////
  ///////////////////////////////////////////////////
  static sliderComponent() {
    const slides = document.querySelectorAll('.slide'),
      btnRight = document.querySelector('.slider__btn--right'),
      btnLeft = document.querySelector('.slider__btn--left'),
      dotsContainer = document.querySelector('.dots');

    let curSlide = 0,
      maxSlide = slides.length;

    // Create dots
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });

    const activeDot = function (slide) {
      const dots = document.querySelectorAll('.dots__dot'),
        targetDot = document.querySelector(`.dots__dot[data-slide ="${slide}"]`);

      dots.forEach(function (dot) {
        dot.classList.remove('dots__dot--active');
      });

      targetDot.classList.add('dots__dot--active');
    };
    activeDot(0);

    const goToSlide = function (slide) {
      slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    };
    goToSlide(0);

    const nextSlide = function () {
      curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
      goToSlide(curSlide);
      activeDot(curSlide);
    };

    const pervSlide = function () {
      curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
      goToSlide(curSlide);
      activeDot(curSlide);
    };

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', pervSlide);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') pervSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    dotsContainer.addEventListener('click', function (e) {
      if (!e.target.classList.contains('dots__dot')) return;

      curSlide = e.target.dataset.slide;

      goToSlide(curSlide);
      activeDot(curSlide);
    });
  }
}
