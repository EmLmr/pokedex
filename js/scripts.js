// Pokemon data to display in app.
let pokemonRepository = (function() {
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // adds new Pokemon to the pokemonList array with a conditional to make sure the correct type of data is entered.
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect Pokemon entry.');
    }
  }

  // returns an array of all the Pokemon in pokemonList
  function getAll() {
    return pokemonList;
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

  // loads the Pokémon list from the API (name + url to details)
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // loads Pokémon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // specifies the details we want to see
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
    }).catch(function(e) {
      console.error(e);
    });
  }

  // for now, clicking on the Pokemon's button will print its details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
