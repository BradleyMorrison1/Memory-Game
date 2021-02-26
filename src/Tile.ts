import AssetManager from "./AssetManager";
import {randomMe} from "./Toolkit";

export default class Tile{

    _sprite:createjs.Sprite;
    stage:createjs.StageGL;

    //imageArray:createjs.Sprite[];
    imageArray = new Array(20);

    private hasBeenClicked:boolean = false;

    spriteClicked:boolean = false;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        this.imageArray[0] = assetManager.getSprite("assets", "triangles");
        this.imageArray[1] = assetManager.getSprite("assets", "hexagon");
        this.imageArray[2] = assetManager.getSprite("assets", "diamond");
        this.imageArray[3] = assetManager.getSprite("assets", "hourGlass");
        this.imageArray[4] = assetManager.getSprite("assets", "circle");
        this.imageArray[5] = assetManager.getSprite("assets", "circleX");
        this.imageArray[6] = assetManager.getSprite("assets", "diamondSquare");
        this.imageArray[7] = assetManager.getSprite("assets", "octagonCirlce");
        this.imageArray[8] = assetManager.getSprite("assets", "square");
        this.imageArray[9] = assetManager.getSprite("assets", "pentagon");


        this.stage = stage;
        this._sprite = assetManager.getSprite("assets", "Comp1/Tile");
        stage.addChild(this._sprite);
        this._sprite.gotoAndStop("Comp 1/Tile");
    }
    // -------------------------------------- Gets/Sets
    get sprite() {
        return this._sprite;
    }

    public positionMe(x:number, y:number){
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public spawnImage()
    {
       let randomNum:number = randomMe(0,9);
       let imageNumArray:number[] = [0];

       imageNumArray.push(randomNum);
       if(randomNum in imageNumArray)
       {
           console.log("TEST");
       }
       this.stage.addChild(this.imageArray[randomNum]);
       this.imageArray[randomNum].x = this._sprite.x + 12.5;
       this.imageArray[randomNum].y = this._sprite.y + 12.5; 
       

       //console.log(imageNumArray)
    }


    public update():void{
        if(this.spriteClicked) return;
        this.sprite.on("click", () => {
            if(!this.hasBeenClicked)
            {
                this.hasBeenClicked = true;
                this.sprite.gotoAndPlay("Comp 1/Tile");
                this.sprite.on("animationend", () => {
                    this.spriteClicked = true;
                    this.sprite.stop();
                    this.spawnImage();
                }, true);
            }
            
        }, this.stage, true);

    }
}