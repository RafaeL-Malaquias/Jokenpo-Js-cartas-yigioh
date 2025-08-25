


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
    playerSides: {
        player1:  'player-card',
        player1BOX: document.querySelector("#player-card"),
        computer: 'computer-card',
        computerBOX: document.querySelector("#computer-card"),
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
};

const playerSides = {
    player1:  'player-card',
    computer: 'computer-card',
};

// inumerando as cartas.
const pathImages =  "./src/assets/icons/"; // caminho das imagens
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
        img: ` ${pathImages}magician.png`,
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

// cria id aleatorio 
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardDate.length)
    return cardDate[randomIndex].id // retorna a id
}


async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', IdCard);
    cardImage.classList.add('card');


    if(fieldSide === playerSides.player1 ){
            cardImage.addEventListener('mouseover', () => {
            drawSelectedCard(IdCard);
        })
            cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'));
        })
    }


    return cardImage
}

// function para setar as cartas no campo
async function setCardsField(cardId) {

    // remove todas cartas antes.
    await  removeAllCarsImages();

    let computerCardId = await getRandomCardId();

    state.filedCards.player.style.display = 'block';
    state.filedCards.computer.style.display = 'block';

    // 'set' as img, passando img
    state.filedCards.player.src = cardDate[cardId].img;
    state.filedCards.computer.src = cardDate[computerCardId].img;

     let duelResult = await checkDuelResult(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult);
}

async function drawButton(text) {
    state.actions.button.innerText = text
    state.actions.button.style.display = 'block';
}


async function updateScore(){
    state.score.ScoreBox.innerText = `Win: ${state.score.playerScore}  Lose: ${state.score.computerScore}`;

}

// função verificar resultado do duelo
async function checkDuelResult(playerCardId, computerCardId) {
    let duelResults = "Empate"    
    playerCard = cardDate[playerCardId];

    //   

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Ganhou";
        state.score.playerScore += 1;
    }

    if(playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Perdeu";
        state.score.computerScore += 1;
    }
    return duelResults;
}


// removendo as cartas
async function removeAllCarsImages() {

    let { computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}


//

async function drawSelectedCard(index) {
    state.cardSprites.avatar.src = cardDate[index].img;
    state.cardSprites.name.innerText = cardDate[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardDate[index].type;

}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i <cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}




function init(){
    drawCards(5, playerSides.player1);
    drawCards(5,playerSides.computer) ;
}

init(); // estado incial do jogo state 