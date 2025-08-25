


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

     let duelResult = await checkDuelResult(cardId, computerCardId);

     ShowHiddenCardFieldsImages(true)
     await drawCardsInField(cardId, computerCardId);
    await hiddenCardDetails();
    await updateScore();
    await drawButton(duelResult);
}

async function ShowHiddenCardFieldsImages(value) {
    if(value) {
    state.filedCards.player.style.display = 'block';
    state.filedCards.computer.style.display = 'block';
    } else { 
    state.filedCards.player.style.display = 'none'
    state.filedCards.computer.style.display = 'none'
    }
    
}

async function drawCardsInField(cardId, computerCardId) {
        // 'set' as img, passando img
    state.filedCards.player.src = cardDate[cardId].img;
    state.filedCards.computer.src = cardDate[computerCardId].img;

    
}


async function hiddenCardDetails() {
    state.cardSprites.avatar.src = '';
    state.cardSprites.name.innerText = '';
    state.cardSprites.type .innerText = '';
}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
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
        duelResults = "Win";
        state.score.playerScore += 1;
    }

    if(playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Lose";
        state.score.computerScore += 1;
    }
    await playAudio(duelResults);

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


async function playAudio(status ) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);


    try {
        audio.play();
    }catch{
        console.log("Erro ao reproduzir o áudio.");
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = '' 
    state.actions.button.style.display = 'none';

    state.filedCards.player.style.display = 'none'
    state.filedCards.computer.style.display = 'none'

    init();
}


function init(){
    ShowHiddenCardFieldsImages(false);
    drawCards(5, playerSides.player1);
    drawCards(5,playerSides.computer) ;

    const bgm = document.getElementById('bgm');
    bgm.play();
    bgm.volume = 0.1;
}

init(); // estado incial do jogo state 