// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />
// importing createjs framework
import "createjs";
// importing game constants
import AssetManager from "./AssetManager";
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import Tile from "./Tile";
import {randomMe} from "./Toolkit"



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
let imageArray = new Array(20);


let tiles:Tile[];

let tileArray = new Array(20);
let numOfTiles:number;

let eventRun:boolean = false;

// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    
    // construct sprites and add to the stage here
    background = assetManager.getSprite("assets","Background");
    stage.addChild(background);
    
    // adds all the images for the tiles to an array
    imageArray[0] = assetManager.getSprite("assets", "triangles");
    imageArray[1] = assetManager.getSprite("assets", "hexagon");
    imageArray[2] = assetManager.getSprite("assets", "diamond");
    imageArray[3] = assetManager.getSprite("assets", "hourGlass");
    imageArray[4] = assetManager.getSprite("assets", "circle");
    imageArray[5] = assetManager.getSprite("assets", "circleX");
    imageArray[6] = assetManager.getSprite("assets", "diamondSquare");
    imageArray[7] = assetManager.getSprite("assets", "octagonCirlce");
    imageArray[8] = assetManager.getSprite("assets", "square");
    imageArray[9] = assetManager.getSprite("assets", "pentagon");
    for(let i:number = 10; i < 19; i++)
    {
        imageArray[i] = imageArray[i-10];
    }
    
    
    for(let j:number = 0; j < 4; j++)
    {
        for(let i:number = 0; i < 5; i++)
        {
            let x:number = (10 + j *100);
            let y:number = (100 + 80*i);

            tileArray[numOfTiles] = Object.assign(tile = new Tile(stage, assetManager), tileArray[i]);
            tileArray[numOfTiles].positionMe((10 + j *100), ((100 + 80*i)));
            tileArray[numOfTiles].update(numOfTiles);
            
            stage.on("tileSelected", () => {spawnImage(x, y)},true);
        }
    }
    

    eventRun = false;
    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function spawnImage(spriteX:number, spriteY:number)
{
    if(eventRun) return;
    let randomNum:number = (randomMe(0,19));

    stage.addChild(imageArray[randomNum]);
        
    imageArray[randomNum].x = spriteX + 12.5;
    imageArray[randomNum].y = spriteY + 12.5;
    //imageArray.splice(randomNum, 1);
    eventRun = true;
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