// Pokemon data to display in app.
const pokemonList = [
  {
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
  }
];

for (let i=0; i < pokemonList.length; i++) {
  // Display looped Pokémon on the DOM, with a line break.
  document.write('<br>' + '<h1>' + pokemonList[i].name + '</h1>' + ` (height: ${pokemonList[i].height}) `);

  //Conditional loop; checks if height is greater than 5.
  if (pokemonList[i].height > 5) {
    document.write( '- WOW that\'s a big boi!');
  }
  //Add line break after each Pokemon.
  document.write('<br>')
}
