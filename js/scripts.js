// Pokemon data to display in app.
let pokemonRepository = (function() {

  // Creates the modal
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');

  // Content to be displayed in the modal
  let modalClose = document.createElement('button');
  modalClose.classList.add('modal-close');

  let pokeName = document.createElement('h1');
  pokeName.classList.add('PokeName');

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  let pokeImage = document.createElement('img');
  pokeImage.classList.add('PokeImage');

  let pokeHeight = document.createElement('p');
  pokeHeight.classList.add('PokeHeight');

  let pokeType = document.createElement('p');
  pokeType.classList.add('PokeType');

  let pokeAbility = document.createElement('p');
  pokeAbility.classList.add('PokeAbility');



  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // displays a loading message until the content has loaded
  function showLoadingMessage() {
    document.querySelector('.loading-message').classList.add('visible');
  }

  // hides the loading message as soon as the content is loaded
  function hideLoadingMessage() {
    document.querySelector('.loading-message').classList.add('hidden');
  }

  // returns an array of all the Pokemon in pokemonList
  function getAll() {
    return pokemonList;
  }

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

  // function that adds the list of Pokemon to the DOM, as buttons in an unordered list.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');
    pokemonButton.id = 'open-modal';
    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);

    pokemonButton.addEventListener('click', function() { // the showDetails() function will be executed when the user clicks on the Pokemon's button
      showDetails(pokemon);
    })
  };



  // loads the Pokémon list from the API (name + url to details)
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      hideLoadingMessage();
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
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      hideLoadingMessage();
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
      pokeName.innerHTML = pokemon.name;
      pokeImage.src = pokemon.imageUrl;
      pokeHeight.innerHTML = 'Height: ' + pokemon.height;
      pokeType.innerHTML = 'Type: ' + pokemon.types.join(', ');
      pokeAbility.innerHTML = 'Ability: ' + pokemon.abilities.join(', ');
      modalClose.innerHTML = "X";
      showModal();
    });
  }

  // opens the modal by making it visible
  function showModal() {
    modalContainer.classList.add('is-visible');
  }

  // closes the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click', hideModal);

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });



  modal.appendChild(modalClose);
  modal.appendChild(pokeName);
  modal.appendChild(imageContainer);
  imageContainer.appendChild(pokeImage);
  modal.appendChild(pokeHeight);
  modal.appendChild(pokeType);
  modal.appendChild(pokeAbility);

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
