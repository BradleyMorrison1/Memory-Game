import AssetManager from "./AssetManager";



export default class Tile{

    _sprite:createjs.Sprite;
    stage:createjs.StageGL;

    testNum:number = 2;

    spriteClicked:boolean = false;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {

        this.stage = stage;
        this._sprite = assetManager.getSprite("assets", "Comp1/Tile");
        stage.addChild(this._sprite);
        this._sprite.gotoAndStop("Comp 1/Tile");
        console.log(this.testNum);
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
            console.log("Clicked");
            this.sprite.gotoAndPlay("Comp 1/Tile");
            this.sprite.on("animationend", () => {
                this.spriteClicked = true;
                this.sprite.stop();
            }, true);
            
        }, this.stage, true);

    }
}