export const createCards = () => {

    const gameContainer = document.querySelector('.game-container');
    const gameCards = document.createElement('div');

    const cardsIcons = [
        'compass',
        'cloud',
        'sun',
        'moon',
        'play',
        'stop',
        'atom',
        'basketball-ball'
    ];

    const dubledCardsIcons = cardsIcons.reduce((acc, current) => {
        return acc.concat([current, current]);
    }, []);

    
    
    shuffle(dubledCardsIcons);
    
    return dubledCardsIcons;
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

 export function createCardElement(defaultIcon, flippedIcon) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const notFlippedIcon = document.createElement('i');
    const flipedIcon = document.createElement('i');

    notFlippedIcon.classList.add('fa', `fa-${defaultIcon}`);
    flipedIcon.classList.add('fa', `fa-${flippedIcon}`);
    
    card.append(flipedIcon, notFlippedIcon);
    
    return card;
}
