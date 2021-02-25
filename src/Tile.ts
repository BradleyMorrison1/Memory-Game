import AssetManager from "./AssetManager";



export default class Tile{

    _sprite:createjs.Sprite

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {


        this._sprite = assetManager.getSprite("assets", "Comp1/Tile", 10, 100);
        stage.addChild(this._sprite);
        this._sprite.gotoAndStop("Comp 1/Tile");
    }

    
}