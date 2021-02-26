// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";

// importing game constants
import AssetManager from "./AssetManager";
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import Tile from "./Tile";
// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// spritesheet object
let spriteSheet:createjs.SpriteSheet;
// spritesheet data object - UPDATE THIS WITH JSON DATA FROM TEXTUREPACKER
let data:object = {}

//assetmanager object
let assetManager:AssetManager;
 
// game objects
let background:createjs.Sprite;
let tile:Tile;


let tileArray = new Array(20);
let numOfTiles:number;

// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    
    // construct sprites and add to the stage here
    background = assetManager.getSprite("assets","Background");
    stage.addChild(background);
    
    
    for(let j:number = 0; j < 4; j++)
    {
        for(let i:number = 0; i < 5; i++)
        {

            numOfTiles = tileArray.length - 1;
            tileArray[numOfTiles] = Object.assign(tile = new Tile(stage, assetManager), tileArray[i]);
            tileArray[numOfTiles].positionMe((10 + j *100), ((100 + 80*i)));
            tileArray[numOfTiles].update();
        }
    }
    
    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}



function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is the game loop
    


    // update the stage!
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();