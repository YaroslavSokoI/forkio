const burger = document.querySelector('.header__burger');
const list = document.querySelector('.header__list');

burger.addEventListener('click', function() {
  list.classList.toggle('active');
  burger.classList.toggle('active');
});