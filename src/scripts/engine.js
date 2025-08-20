


//
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        ScoreBox: document.getElementById('score_points'),

    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),

    },
    filedCards : {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card')
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
};

// inumerando as cartas.
const pathImages =  ".src/assets/icons/"; // caminho das imagens
const cardDate = [ // poderia esta vindo de uma API (bancos de dados)
     {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: ` ${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2]
     },
          {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: ` ${pathImages}magicion.png`,
        WinOf: [1],
        LoseOf: [0]
     },
          {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: ` ${pathImages}exodia.png`,
        WinOf: [1],
        LoseOf: [1]
     },

]

function init(){

}

init(); // estado incial do jogo state 