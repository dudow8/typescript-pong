import { IGameObjectDefinition } from "../Interface/IGameObjectDefinition" ;
import { IGameObject } from "../Interface/IGameObject" ;

export abstract class GameObject {
	private _updateHandler: Array<Function> = [] ;
	private _colliderHandler: Array<Function> = [] ;
	
	protected _context: CanvasRenderingContext2D ;
	
	public style: IGameObjectDefinition = { x: 0, y: 0, width: 0, height: 0 } ;
	
	public setContext( context: CanvasRenderingContext2D ): void {
		this._context = context ;
	}
	
	public build(): void {} ;
	
	public update(): void {
		for( let handler of this._updateHandler ) {
			handler() ;
		}
		
		this.build() ;
	}
	
	public collision( components: Array<IGameObject>  ) {
		for( let handler of this._colliderHandler ) {
			handler( components ) ;
		}
	}

	public addUpdateHanlder( handler: Function ): void {
		this._updateHandler.push( handler ) ;
	}

	public addCollisionHanlder( handler: Function ): void {
		this._colliderHandler.push( handler ) ;
	}

	protected applyStyle() {
		let context = this._context ;

		if( this.style.fill ) {
			context.fillStyle = this.style.fill.color ;
			context.fill() ;
		}

		if( this.style.stroke ) {
			context.strokeStyle = this.style.stroke.color ;
			context.stroke() ;
		}
	}
}