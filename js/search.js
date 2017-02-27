'use strict';

document.addEventListener('DOMContentLoaded', changeCategory);

var database = firebase.database();

var category = null;

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
  database.goOnline();
  var text = document.querySelector('#search-text').value;
  var recipes = database.ref('recipes');

  recipes.on('value', function (snapshot) {
    var value = snapshot.val();

    list.clean();
    panel.hide();

    value.filter(filterRecipe).forEach(function (recipe) {
      list.add(recipe);
    });

    return value;
  });

  function filterRecipe(recipe) {
    /** @type {string} */
    var name = recipe.name.toLowerCase();

    var ingredients = recipe.ingredientes.filter(function (ingrediente) {
      return ingrediente.nome.toLowerCase() === text.toLowerCase();
    });

    var hasIngredient = ingredients.length >= 0;

    return ( name === text || hasIngredient);
  }
}

var list = {
  container: document.querySelector('.search-results'),
  clean: function () {
    list.container.innerHTML = null;
  },
  add: function (recipe) {
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.innerHTML = '<h4>' + recipe.name + '</h4>' +
                     '<p>' + recipe.descricao + '</p>';

    link.addEventListener('click', function () {
      panel.show(recipe);
    });
    item.appendChild(link);
    list.container.appendChild(item);
  }
};

var panel = {
  container: document.querySelector('.search-result'),
  hide: function () {
    panel.container.innerHTML = null;
  },
  show: function (recipe) {
    var ingredientsList = recipe.ingredientes.map(function (ingredient) {
      return '<li>' + ingredient.nome + '|' + ingredient.quantidade + '</li>';
    });

    panel.container.innerHTML = '<h3>' + recipe.name + '</h3>' +
                                 '<p>' + recipe.descricao + '</p>' +
                                 '<h4>Ingredientes</h4>' +
                                 '<ul>' +
                                   '<li><strong>Ingrediente</strong>|<strong>Quantidade</strong></li>' +
                                   ingredientsList.join('') +
                                 '</ul>';
  }
};
