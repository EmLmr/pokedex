// Pokemon data to display in app.
let pokemonRepository = (function() {
      const pokemonList = [{
          name: 'Bulbasaur',
          height: 2,
          types: ['grass', 'poison'],
          abilities: 'overgrow'
        },
        {
          name: 'Urshifu',
          height: 6,
          types: ['fighting', 'dark'],
          abilities: 'unseen fist'
        },
        {
          name: 'Wimpod',
          height: 1,
          types: ['bug', 'water'],
          abilities: 'wimp out'
        },
        {
          name: 'Roselia',
          height: 1,
          types: ['grass', 'poison'],
          abilities: ['poison point', 'natural cure']
        },
        {
          name: 'Infernape',
          height: 3,
          types: ['fire', 'fighting'],
          abilities: 'flame'
        },
        {
          name: 'Arcanine',
          height: 6,
          types: ['fire'],
          abilities: ['Intimidate', 'Flash Fire']
        }
      ];

      // returns an array of all the Pokemon in pokemonList
      function getAll() {
        return pokemonList;
      }

      // adds new Pokemon to the pokemonList array
      function add(pokemon) {
        pokemonList.push(pokemon);
      }

      // function that adds the list of Pokemon to the DOM, as buttons
      function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list'); // selects the HTML class "pokemon-list", which is an unordered list

        let listItem = document.createElement('li'); // creates a new list item

        let button = document.createElement('button'); // creates a new button element
        button.innerText = pokemon.name; // the button displays a pokemon name
        button.classList.add('list-item'); // adds the class name "list-item" to the button
        listItem.appendChild(button); // the button becomes a list item
        pokemonList.appendChild(listItem); // each pokemon item in the list passes their corresponding value from the IIFE object

        button.addEventListener('click', function(){ // the showDetails() function will be executed when the user clicks on the Pokemon's button
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
