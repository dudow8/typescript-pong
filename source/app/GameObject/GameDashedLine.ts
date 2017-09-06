import { IGameObject } from "../Interface/IGameObject" ;
import { GameObject } from "../Abstract/GameObject" ;

export class GameDashedLine extends GameObject implements IGameObject {
	public id: string ;
	
	constructor( id: string ) {
		super() ;
		
		this.id = id ;
		this.style.width = 1 ;
		this.style.stroke = { color: "#FFFFFF" } ;
	}
	
	public build(): void {
		let context = this._context ;
		
		context.setLineDash([ 5, 15 ]) ;
		context.lineWidth = this.style.width  ;
		context.moveTo( ( context.canvas.width / 2 ), 0 ) ;
		context.lineTo( ( context.canvas.width / 2 ), context.canvas.height ) ;
		
		this.applyStyle() ;
	}
}