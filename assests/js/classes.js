class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    //variavel que vai identifica o nome para todos os personagens, orientação a objetos
    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    //variável condição para ser a nmova vida do personagem
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

//função que vai fazer um guerreiro
class knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

//poersonagem mago
class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

//criando um monstro
class LittleMonster extends Character {
    constructor() {
        super('Litter Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

//criando mostro mais forte
class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

//variável que vai verificar o cenario
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;  
    }

    //função que ai começar o jogo
    start() {
        this.update();

        //função para atacar
        this.fighter1El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    //função que vai atualizar os jogadores em geral durante a partida
    update() {
        //Figth 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} ${this.fighter1.life.toFixed(1)} HP`;

        //função para atualizar a barra de vida do jogador 1
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        //figth 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} ${this.fighter2.life.toFixed(1)} HP`;

        //função para atualizar a barra de vida do jogador 2 ou monstro
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    //a função de atack
    doAttack(attacking, attacked) {
        //verificação se um personagem está vivo
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('atacando carrocho morto.');
            return;
        }

        //função que vai atacar de fato e tirar a vida do personagem
        let attackFactor = (Math.random() *2).toFixed(2);
        let defenseFactor = (Math.random() *2).toFixed(2);
        
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacking.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        }else{
            this.log.addMessage(`${attacked.name} consegiu defender...`);
        }

        this.update();
    }
}

//manipulando a área onde vai aparecer as mensagens na tela
class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    //função para renderiza a mensagem na tela
    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}