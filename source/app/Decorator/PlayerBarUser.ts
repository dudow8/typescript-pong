import { PlayerBar } from "../GameObject/PlayerBar" ;

export class PlayerBarUser {
	constructor( private _bar: PlayerBar, private _canvas: HTMLCanvasElement ) {
		this.startMouseControl() ;
	}

	public startMouseControl(): void {
		this._canvas.onmousemove = ( event ) => {
			this._bar.style.y = event.offsetY - ( this._bar.style.height / 2 ) ;
			
			if( this._canvas ) {
				if( this._bar.style.y <= 5 ) 
					this._bar.style.y = 5 ;

				if( this._bar.style.y >= this._canvas.height - this._bar.style.height - 5 )
					this._bar.style.y = this._canvas.height - this._bar.style.height - 5 ;
			}
		} ;
	}
}