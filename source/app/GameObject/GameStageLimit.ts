import { IGameObject } from "../Interface/IGameObject" ;
import { GameObject } from "../Abstract/GameObject" ;

export class GameStageLimit extends GameObject implements IGameObject {
	public id: string ;
	
	constructor( id: string ) {
		super() ;
		this.id = id ;
	}
	
	public build(): void {
		let context = this._context ;

		context.rect( this.style.x, this.style.y, this.style.width, this.style.height ) ;

		this.applyStyle() ;
	}
}