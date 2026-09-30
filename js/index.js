const createApp = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    const header = document.createElement('header');
    header.classList.add('header');
    container.appendChild(header);

    const h1 = document.createElement('h1');
    h1.textContent = 'Найди пару';
    h1.classList.add('app-title');
    header.appendChild(h1);

    const buttonsData = [
        {text: 'Новая игра', className: 'new-game-button'},
        {text: 'Рейтинг', className: 'rating-button'},
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    header.appendChild(buttonsContainer);

    const buttons = buttonsData.map(data => {
        const button = document.createElement('button');
        button.textContent = data.text;
        button.classList.add(data.className);
        buttonsContainer.appendChild(button);
        return button;
    });

};
createApp();