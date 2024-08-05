//variavel que vai controlar as mensagens no log
let log =  new Log(document.querySelector('.log'));

//variável quie vai criar o guerreiro
let char = new knight('Paulo');

//criando monstro
let monster = new LittleMonster();


//criando o cenario com os personagens
const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();

/*// Variável que vai criar o guerreiro
let char = new knight('Paulo');

// Criando monstro
let monster = new LittleMonster();

// Criando o cenário com os personagens
const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
);

stage.start();*/
