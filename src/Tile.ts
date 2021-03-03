import AssetManager from "./AssetManager";
import { tilesClicked } from "./Game";

export default class Tile{
    
    _sprite:createjs.Sprite;
    stage:createjs.StageGL;
    
    //imageArray:createjs.Sprite[];
    

    private eventTileSelected:createjs.Event;
    
    private hasBeenClicked:boolean = false;
    private spriteClicked:boolean = false;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        this.stage = stage;
        this.eventTileSelected = new createjs.Event("tileSelected", true, false);

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
                    this.stage.dispatchEvent(this.eventTileSelected);
                    //console.log("CLICKED");
                }, true);
            }
        }, this.stage, true);
    }
}