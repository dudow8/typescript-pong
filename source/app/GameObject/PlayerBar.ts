import { IGameObject } from "../Interface/IGameObject" ;
import { GameObject } from "../Abstract/GameObject" ;

export class PlayerBar extends GameObject implements IGameObject {
	public id: string ;
	public direction: string = "down" ;
	public speed: number = 3 ;
	
	constructor( id: string ) {
		super() ;
		this.id = id ;
		
		this.style.width = 10 ;
		this.style.height = 100 ;
		this.style.fill = { color: "#FFFFFF" } ;
	}

	public build(): void {
		let context = this._context ;

		context.rect( this.style.x, this.style.y, this.style.width, this.style.height ) ;

		this.applyStyle() ;
	}
}