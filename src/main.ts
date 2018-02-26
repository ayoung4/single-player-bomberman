import * as _ from 'lodash';
import * as p5 from 'p5';
import { GameWorld } from './Engine/GameWorld';
import { WIDTH, HEIGHT, RES } from './Engine/Settings';

const sketch = new p5(function (sketch: p5Sketch) {

    let game;

    sketch.setup = function () {

        game = new GameWorld();
        
        sketch.createCanvas(WIDTH * RES, HEIGHT * RES);
    
    }

    sketch.draw = function () {

        sketch.background(220);
        
        game.step();
        
        game.show(sketch);

    }

    sketch.keyPressed = function () {

        game.processInput(sketch.keyCode);

    }

});