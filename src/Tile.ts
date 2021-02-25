import AssetManager from "./AssetManager";



export default class Tile{

    _sprite:createjs.Sprite;
    stage:createjs.StageGL;

    spriteClicked:boolean = false;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {

        this.stage = stage;
        this._sprite = assetManager.getSprite("assets", "Comp1/Tile", 10, 100);
        stage.addChild(this._sprite);
        this._sprite.gotoAndStop("Comp 1/Tile");
    }
    // -------------------------------------- Gets/Sets
    get sprite() {
        return this._sprite;
    }


    

    public update():void{
        if(this.spriteClicked) return;
        this.sprite.on("click", () => {
            console.log("Clicked");
            this.sprite.gotoAndPlay("Comp 1/Tile");
            this.sprite.on("animationend", () => {
                this.spriteClicked = true;
                this.sprite.stop();
            });
            
        }, this.stage, true);

    }
}