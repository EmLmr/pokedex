// Pokemon data to display in app.
let pokemonRepository = (function() {
  const pokemonList = [{
      name: 'Bulbasaur',
      height: 2,
      type: ['grass', 'poison'],
      ability: 'overgrow'
    },
    {
      name: 'Urshifu',
      height: 6,
      type: ['fighting', 'dark'],
      ability: 'unseen fist'
    },
    {
      name: 'Wimpod',
      height: 1,
      type: ['bug', 'water'],
      ability: 'wimp out'
    },
    {
      name: 'Roselia',
      height: 1,
      type: ['grass', 'poison'],
      ability: ['poison point', 'natural cure']
    },
    {
      name: 'Infernape',
      height: 3,
      type: ['fire', 'fighting'],
      ability: 'flame'
    },
    {
      name: 'Arcanine',
      height: 6,
      type: ['fire'],
      ability: ['Intimidate', 'Flash Fire']
    }
  ];

  // returns an array of all the Pokemon in pokemonList
  function getAll() {
    return pokemonList;
  }

  // adds new Pokemon to the pokemonList array with a conditional to make sure the correct type of data is entered.
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon &&
      'ability' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect Pokemon entry.');
    }
  }

  // function that adds the list of Pokemon to the DOM, as buttons in an unordered list.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-item');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function() { // the showDetails() function will be executed when the user clicks on the Pokemon's button
      showDetails(pokemon);
    })
  };

  // for now, clicking on the Pokemon's button will print its name in the console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  };

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon); // each pokemon is added to the pokemon list
});
