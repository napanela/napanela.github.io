'use strict';

document.addEventListener('DOMContentLoaded', changeCategory);

var category = null;
var database = firebase.database();

function changeCategory() {
  category = params.category || 'breakfast';
  var container = document.querySelector('.search-container');

  switch (category) {
    case 'breakfast':
      container.id = 'intro1';
      container.classList.add('intro1');
      break;
    case 'lunch':
      container.id = 'intro2';
      container.classList.add('intro2');
      break;
    case 'dessert':
      container.id = 'intro3';
      container.classList.add('intro3');
      break;
  }
}

function searchRecipe() {
  var text = document.querySelector('#search-text').value;

  console.log(text);
}
