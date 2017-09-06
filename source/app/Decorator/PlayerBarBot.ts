import { PlayerBar } from "../GameObject/PlayerBar" ;
import { PlayerBall } from "../GameObject/PlayerBall" ;

export enum PlayerBarBotMode { idle, attack } ;
export enum PlayerBarBotDifficult { ease = .5, medium = .60, hard = .85 } ;

export class PlayerBarBot {
	private _mode: PlayerBarBotMode = PlayerBarBotMode.idle ;
	private _difficult: PlayerBarBotDifficult = PlayerBarBotDifficult.medium ;

	constructor ( private _bar: PlayerBar,  private _ball: PlayerBall, private _canvas: HTMLCanvasElement ) {
		_bar.addUpdateHanlder( this.bot ) ;
		_ball.addUpdateHanlder( this.ballObserver ) ;
	}

	public setMode( mode: PlayerBarBotMode ) {
		this._mode = mode ;
	}

	public setDifficult( difficult: PlayerBarBotDifficult ) {
		this._difficult = difficult ;
	}

	public bot = () => {
		switch( this._mode ) {
			case PlayerBarBotMode.idle:
				this.idle() ;
			break ;

			case PlayerBarBotMode.attack:
				this.attack() ;
			break ;
		}
	}

	public idle = () => {
		this._bar.speed = 3 ;

		if( this._bar.style.y <= 5 )
			this._bar.direction = "down" ;

		if( this._bar.style.y >= ( this._canvas.height - 5 - this._bar.style.height ) )
			this._bar.direction = "up" ;

		this.autoUpdateDirection() ;
	}

	public attack = () => {
		if( this._ball.style.y > ( this._bar.style.y + ( this._bar.style.height / 2 ) ) )
			this._bar.direction = "down" ;
		else
			this._bar.direction = "up" ;
		
		this._bar.speed = this._ball.speed.y * this._difficult ;

		if( this._bar.style.y <= 5 ) 
			this._bar.style.y = 5 ;

		if( this._bar.style.y >= this._canvas.height - this._bar.style.height - 5 )
			this._bar.style.y = this._canvas.height - this._bar.style.height - 5 ;

		this.autoUpdateDirection() ;
	}

	public autoUpdateDirection = () => {
		switch ( this._bar.direction ) {
			case "up":
				this._bar.style.y -= this._bar.speed ;
			break;

			case "down":
				this._bar.style.y += this._bar.speed ;
			break;
		}
	}

	public ballObserver = () => {
		var side = this._bar.style.x < ( this._canvas.width / 2 ) ? 'left' : 'right' ;

		if( ( this._ball.style.x >= ( this._canvas.width / 2 ) && side == 'right' ) 
			|| ( this._ball.style.x <= ( this._canvas.width / 2 ) && side == 'left' ) )
			this.setMode( PlayerBarBotMode.attack ) ;
		else
			this.setMode( PlayerBarBotMode.idle ) ;
	}
}