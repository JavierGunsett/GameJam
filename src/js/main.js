/* const { create } = require("browser-sync"); */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

/* Grilla */
const gr = 50;

function preload() {
    this.load.image('char', 'dist/img/char.png');

    // Scene
    this.load.image('bg', 'dist/img/bg.png');
    this.load.image('collider', 'dist/img/collidersprite.png');
    this.load.image('cabinet', 'dist/img/cabinet.png');
    this.load.image('cabinet-gris', 'dist/img/cabinet-gris.png');
    this.load.image('desk', 'dist/img/desk.png');
    this.load.image('door', 'dist/img/door.png');
    this.load.image('estanteria', 'dist/img/estanteria.png');
    this.load.image('auto', 'dist/img/auto.png');
    this.load.image('caja01', 'dist/img/caja01.png');
    this.load.image('caja02', 'dist/img/caja02.png');
    this.load.image('caja03', 'dist/img/caja03.png');

    // Items
    this.load.image('caca', 'dist/img/items/caca.png');
    this.load.image('bacha', 'dist/img/items/bacha.png');
    this.load.image('botella', 'dist/img/items/botella.png');
    this.load.image('fonografo', 'dist/img/items/fonografo.png');
    this.load.image('lampara', 'dist/img/items/lampara.png');
    this.load.image('maceta', 'dist/img/items/maceta.png');
    this.load.image('palos', 'dist/img/items/palos de golf.png');
    this.load.image('piedra', 'dist/img/items/piedra de cordoba.png');
    this.load.image('pintura', 'dist/img/items/pintura.png');
    this.load.image('tijera', 'dist/img/items/tijera.png');

    // UI
    this.load.image('ui', 'dist/img/ui/ui.png');
}

var textbox = false;
var uiTextbox;

function create() {


    // Scene
    this.add.image(400, 300, 'bg');
    this.add.image(11 * gr, 5.5 * gr, 'cabinet').setOrigin(0, 0);
    this.add.image(2 * gr, 1.5 * gr, 'cabinet-gris').setOrigin(0, 0);
    this.add.image(13 * gr, 1 * gr, 'door').setOrigin(0, 0);
    this.add.image(8 * gr, 5.5 * gr, 'estanteria').setOrigin(0, 0);
    this.add.image(4 * gr, 1.5 * gr, 'estanteria').setOrigin(0, 0);
    this.add.image(1 * gr, 3.5 * gr, 'caja01').setOrigin(0, 0);
    this.add.image(1 * gr, 2.75 * gr, 'caja02').setOrigin(0, 0);
    this.add.image(10 * gr, 7.5 * gr, 'caja03').setOrigin(0, 0);

    // Elements / Lower Layer
    // fono = this.physics.add.staticImage(15.5*gr,9.5*gr, 'desk');

    // Items
    caca = this.physics.add.staticImage(13.5 * gr, 7.75 * gr, 'caca');
    caca.body.setSize(1 * gr, 0.5 * gr, 0, 0);

    bacha = this.physics.add.staticImage(6 * gr, 7 * gr, 'bacha');
    bacha.body.setSize(1.5 * gr, 1 * gr, 0, 0);

    botella = this.physics.add.staticImage(5 * gr, 7.75 * gr, 'botella');
    botella.body.setSize(0.5 * gr, 0.5 * gr, 0, 0);

    fonografo = this.physics.add.staticImage(11.5 * gr, 3.5 * gr, 'fonografo');
    fonografo.body.setSize(1.25 * gr, 1 * gr, 0, 0);

    desk = this.physics.add.staticImage(15.5 * gr, 9.5 * gr, 'desk');

    lampara = this.physics.add.staticImage(15.5 * gr, 8.5 * gr, 'lampara');
    lampara.body.setSize(1 * gr, 1 * gr, -1 * gr, 0);

    palos = this.physics.add.staticImage(7.5 * gr, 7.75 * gr, 'palos');
    palos.body.setSize(1 * gr, 1 * gr, 0, 0);

    piedra = this.physics.add.staticImage(12.5 * gr, 4 * gr, 'piedra');
    piedraCollision = this.physics.add.staticImage(12.75 * gr, 3.5 * gr, 'collider');
    piedraCollision.body.setSize(0.5 * gr, 0.5 * gr, 0, 0);

    pintura = this.physics.add.staticImage(8.5 * gr, 7.25 * gr, 'pintura');

    tijera = this.physics.add.staticImage(4.5 * gr, 1.75 * gr, 'tijera');
    tijera.body.setSize(1 * gr, 1.7 * gr, 0, 0);
    tijera.body.setOffset(10, 10);


    // Char
    player = this.physics.add.sprite(13.5 * gr, 3 * gr, 'char').setOrigin(0, 0);
    player.setCollideWorldBounds(true);
    player.body.allowGravity = false;
    player.body.setBounce(0);

    // Main Collision
    let collisionTecho = this.physics.add.staticImage(0.5 * gr, 0.5 * gr, 'collider');
    let collisionPared = this.physics.add.staticImage(0.5 * gr, 2.5 * gr, 'collider');
    let collisionEscalera = this.physics.add.staticImage(0.5 * gr, 6.5 * gr, 'collider');
    let collisionEntrepiso = this.physics.add.staticImage(3.5 * gr, 6.5 * gr, 'collider');
    let collisionAuto = this.physics.add.staticImage(1.5 * gr, 10.5 * gr, 'collider');

    collisionTecho.body.setSize(16 * gr, 2 * gr, 0, 0);
    collisionPared.body.setSize(13 * gr, 1 * gr, 0, 0);
    collisionEscalera.body.setSize(1 * gr, 1 * gr, 0, 0);
    collisionEntrepiso.body.setSize(13 * gr, 1 * gr, 0, 0);
    collisionAuto.body.setSize(8 * gr, 2 * gr, 0, 0);



    // Environment  / Top Layer
    this.add.image(5 * gr, 10.5 * gr, 'auto');

    caja01 = this.physics.add.staticImage(15.5 * gr, 11.5 * gr, 'caja01');
    caja03 = this.physics.add.staticImage(14.5 * gr, 11.5 * gr, 'caja03');




    //Movimiento
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Collisions
    this.physics.add.collider(player, caca, colision);
    this.physics.add.collider(player, bacha, colision);
    this.physics.add.collider(player, botella, colision);
    this.physics.add.collider(player, collisionTecho, colision);
    this.physics.add.collider(player, collisionPared, colision);
    this.physics.add.collider(player, collisionEscalera, colision);
    this.physics.add.collider(player, collisionEntrepiso, colision);
    this.physics.add.collider(player, collisionAuto, colision);
    this.physics.add.collider(player, desk, colision);
    this.physics.add.collider(player, lampara, colision);
    this.physics.add.collider(player, palos, colision);
    this.physics.add.collider(player, piedraCollision, colision);
    this.physics.add.collider(player, pintura, colision);
    this.physics.add.collider(player, tijera, colisionTijera);
    this.physics.add.collider(player, caja01, colision);
    this.physics.add.collider(player, caja03, colision);


    function colision() {
        console.log("colision!");
        console.log(player.x);
        console.log(player.y)
    }

    function colisionTijera() {
        console.log(Math.abs(player.x - tijera.x))
        console.log(Math.abs(player.y - tijera.y));
    }


    uiTextbox = this.add.image(1000 * gr, 2 * gr, 'ui').setOrigin(0, 0);


    //  When the player sprite his the health packs, call this function ...
    this.physics.add.overlap(player, tijera, colisionTijera);


}


function update() {

    /* MOVIMIENTO SEXY(?) */
    player.setVelocity(0);
    var speed = 300;

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
    }



    // console.log(tijera.body.touching);
    // console.log(tijera.body.blocked);
    // if (tijera.body.touching.none != true) {

    //     if (Phaser.Input.Keyboard.JustDown(cursors.enter))
    //     {
    //         if (textbox == false){
    //             uiTextbox.setPosition(1*gr, 1*gr)
    //             textbox = true;
    //         }else {
    //             uiTextbox.setPosition(1000*gr, 1*gr);
    //             textbox = false;
    //         }
    //     }
    // }


    /* Interaccion tijera y cuadro de texto, version alfa */
    if (Phaser.Input.Keyboard.JustDown(cursors.enter) &&
        Math.abs(player.x - tijera.x) <= 20 ||
        Math.abs(player.y - tijera.y) <= 10) {
        //console.log(player.body.overlap(tijera));
        {
            if (textbox == false) {
                uiTextbox.setPosition(1 * gr, 1 * gr)
                textbox = true;
            } else {
                uiTextbox.setPosition(1000 * gr, 1 * gr);
                textbox = false;
            }
        }
    }










    // if (Phaser.Input.Keyboard.JustDown(enter))
    // {
    //     if (textbox == false){
    //         uiTextbox.setPosition(1*gr, 1*gr)
    //         textbox = true;
    //     }else {
    //         uiTextbox.setPosition(1000*gr, 1*gr);
    //         textbox = false;
    //     }
    // }

}


/* Plantas */

class Plantas {
    constructor(tamanio = 0, flores = 0, colorcitud = 0, robustez = 0) {
        this.tamanio = tamanio;
        this.flores = flores;
        this.colorcitud = colorcitud;
        this.robustez = robustez;
    };

    /*Suman stats a la planta */
    sumarTamanio() {
        this.tamanio++;
    };

    sumarFlores() {
        this.flores++;
    };

    sumarColor() {
        this.colorcitud++;
    };

    sumarRobustez() {
        this.robustez++;
    };

    /*Restan stats a la planta */
    restarTamanio() {

        this.tamanio--;
    };

    restarFlores() {
        this.flores--;
    };

    restarColor() {
        this.colorcitud--;
    };

    restarRobustez() {
        this.robustez--;
    };

    /* Interaccion de los objetos con la plata */
    interaccion(Objeto) {

        switch (Objeto.getStatPos()) {
            case 'tamanio':
                this.sumarTamanio();
                break;
            case 'flores':
                this.sumarFlores();
                break;
            case 'colorcitud':
                this.sumarColor();
                break;
            case 'robustez':
                this.sumarRobustez();
                break;
        };

        switch (Objeto.getStatNeg()) {
            case 'tamanio':
                this.restarTamanio();
                break;
            case 'flores':
                this.restarFlores();
                break;
            case 'colorcitud':
                this.restarColor();
                break;
            case 'robustez':
                this.restarRobustez();
                break;
        };
    };



};

/* Items */

class Objeto {
    constructor(nombre, statPos, statNeg, texto) {
        this.nombre = nombre;
        this.statPos = statPos;
        this.statNeg = statNeg;
        this.texto = texto // Descripcion del objeto
    }

    getStatPos() {
        return this.statPos;
    }

    getStatNeg() {
        return this.statNeg;
    }
}


let agua = new Objeto('Agua', 'tamanio', 'robustez');
let tijera = new Objeto('Tijera', 'robustez', 'tamanio');
let planta = new Plantas();


planta.interaccion(tijera);
// console.log(planta);

// Forma de obtener el stat maximo
// let getMaxStat = Math.max.apply(null, Object.keys(planta).map(function(x) { return planta[x] }));
// let maxStat = Object.keys(planta).filter(function(x) { return planta[x] == getMaxStat; })[0]);



/* 
function randPostX() {
    return Math.floor(Math.random() * 17) * gr;
}

function randPostY() {
    return Math.floor(Math.random() * 13) * gr;
} */