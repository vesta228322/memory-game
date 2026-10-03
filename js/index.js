import { createCards, createCardElement } from './createCards.js';
import { createModal } from './createModal.js';
import { gameState } from './gameState.js';

const createApp = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    const header = document.createElement('header');
    header.classList.add('header');
    container.append(header);

    const h1 = document.createElement('h1');
    h1.textContent = 'Найди пару';
    h1.classList.add('app-title');
    header.append(h1);

    const buttonsData = [
        { text: 'Новая игра', className: 'header-btn new-game-button' },
        { text: 'Таблица лидеров', className: 'header-btn rating-button' },
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    header.append(buttonsContainer);

    const buttons = buttonsData.map(btn => {

        const button = document.createElement('button');
        button.textContent = btn.text;
        button.classList.add(...btn.className.split(' '));
        buttonsContainer.append(button);
        return button;
    });


    const main = document.createElement('main');
    main.classList.add('main');
    container.append(main);

    const section = document.createElement('section');
    section.classList.add('game-section');
    main.append(section);

    const counters = document.createElement('div');
    counters.classList.add('counter-container');
    section.append(counters);

    const counterData = [
        { className: 'counter counter-move', text: 'Ходы' },
        { className: 'counter counter-found-pairs', text: 'Найденые пары' }
    ]

    counterData.forEach(data => {
        const counter = document.createElement('span');
        counter.classList.add(...data.className.split(' '));
        counter.dataset.label = data.text;
        counters.append(counter);
    });

    function updateCounter() {
        const counterMove = document.querySelector('.counter-move');
        const counterPairs = document.querySelector('.counter-found-pairs');
        counterMove.textContent = `${counterMove.dataset.label}: ${gameState.move}`;
        counterPairs.textContent = `${counterPairs.dataset.label}: ${gameState.foundPairs}`;
    }
    updateCounter();

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');
    section.append(gameContainer);

    const shuffledCards = createCards();

    shuffledCards.forEach(icon => gameContainer.append(createCardElement('question-circle', icon)));

    const cards = document.querySelectorAll('.game-card');

    cards.forEach((card, i) => {


        card.addEventListener('click', () => {
            if (gameState.clickable === true && !card.classList.contains('success')) {
                card.classList.add('flip');

                if (gameState.firstCard === null) {
                    gameState.firstCard = i;
                } else if (i !== gameState.firstCard) {
                    gameState.secondCard = i;
                    gameState.clickable = false;
                    gameState.move += 1;
                    updateCounter();
                }

                if (gameState.firstCard !== null && gameState.secondCard !== null && gameState.firstCard !== gameState.secondCard) {
                    if (cards[gameState.firstCard].firstElementChild.className === cards[gameState.secondCard].firstElementChild.className) {
                        setTimeout(() => {
                            cards[gameState.firstCard].classList.add('success');
                            cards[gameState.secondCard].classList.add('success');
                            gameState.foundPairs += 1;
                            updateCounter();

                            gameState.firstCard = null;
                            gameState.secondCard = null;
                            gameState.clickable = true;

                            if (gameState.foundPairs === 8) {
                                modal.setContent(createWinContent(gameState.move, () => {}));
                                modal.openModal();
                                gameState.clickable = false;
                            }
                        }, 300);
                    } else {
                        setTimeout(() => {
                            cards[gameState.firstCard].classList.remove('flip');
                            cards[gameState.secondCard].classList.remove('flip');
                            gameState.firstCard = null;
                            gameState.secondCard = null;
                            gameState.clickable = true;
                        }, 700);
                    }
                }
            }
        });
    });

    const modal = createModal();

    function createWinContent(moves, onNewGame) {
        const container = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const newGameBtn = document.createElement('button');
        newGameBtn.classList.add('modal-btn');
        newGameBtn.textContent = 'Новая игра';
        newGameBtn.addEventListener('click', onNewGame);
        h2.textContent = 'Ты большой(ая) молодец!';
        p.textContent = `Это невероятно, что ты прошёл(ла) игру за ${moves} ходов`;

        container.append(h2, p, newGameBtn);


        return container;
    }
};
createApp();