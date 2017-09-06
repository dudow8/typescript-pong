import { IGame } from "./Interface/IGame" ;
import { IGameObject } from "./Interface/IGameObject" ;

import { Game } from "./Abstract/Game" ;
import { Collider } from "./Infrastructure/Collider" ;
import { PlayerBar } from "./GameObject/PlayerBar" ;
import { PlayerBall } from "./GameObject/PlayerBall" ;
import { GameStageLimit } from "./GameObject/GameStageLimit" ;
import { GameDashedLine } from "./GameObject/GameDashedLine" ;
import { PlayerBarBot } from "./Decorator/PlayerBarBot" ;
import { PlayerBarUser } from "./Decorator/PlayerBarUser" ;

export class Pong extends Game implements IGame {
	private static _updateScoreHandler: Array<Function> = [] ;
	public static score: any = { playerA: 0, playerB: 0 } ;

	public playerA: PlayerBar ;
	public playerB: PlayerBar ;
	public ball: PlayerBall ;

	public playerBot: PlayerBarBot ;
	public playerUser: PlayerBarUser ;

	constructor( protected _canvas: HTMLCanvasElement, protected _fps: number = 60 ) {
		super( _canvas, 700, 400, _fps ) ;

		this.createStageColliders() ;
		this.createPlayerElements() ;
		this.createStageElements() ;

		this.addObserver( Collider.getInstance().observer ) ;
	}

	public start() {
		this.ball.randomStart() ;
		super.start() ;
	}

	private createStageElements() {
		let stageMiddleDashedLine: IGameObject = new GameDashedLine( "stageMiddleDashedLine" ) ;

		// Register Objects
		this.addObject( stageMiddleDashedLine ) ;
	}

	private createStageColliders() {
		let collider = Collider.getInstance() ;

		let stageTop: IGameObject = new GameStageLimit( "stageTop" ) ;
		let stageRight: IGameObject = new GameStageLimit( "stageRight" ) ;
		let stageBottom: IGameObject = new GameStageLimit( "stageBottom" ) ;
		let stageLeft: IGameObject = new GameStageLimit( "stageLeft" ) ;
		
		// Position and sizing
		Object.assign( stageTop.style, { x: 0, y: 0, width: this._canvas.width, height: 5 } ) ;
		Object.assign( stageRight.style, { x: this._canvas.width, y: 0, width: 1, height: this._canvas.height } ) ;
		Object.assign( stageBottom.style, { x: 0, y: this._canvas.height, width: this._canvas.width, height: 5 } ) ;
		Object.assign( stageLeft.style, { x: 0, y: 0, width: 1, height: this._canvas.height } ) ;	

		// Colliders
		collider.watch( stageTop, stageRight, stageBottom, stageLeft ) ;

		// Register Objects
		this.addObject( stageTop, stageRight, stageBottom, stageLeft ) ;
	}

	private createPlayerElements() {
		let collider = Collider.getInstance() ;

		this.ball = new PlayerBall( "ball" ) ;
		this.playerA = new PlayerBar( "playerA" ) ;
		this.playerB = new PlayerBar( "playerB" ) ;

		// Position and sizing
		Object.assign( this.playerA.style, { 
			x: 20, 
			y: ( this._canvas.height / 2 ) - ( this.playerA.style.height / 2 ) 
		}) ;

		Object.assign( this.playerB.style, {
			x: ( this._canvas.width - 30 ),
			y: ( this._canvas.height / 2 ) - ( this.playerB.style.height / 2 )
		}) ;

		// Colliders
		collider.watch( this.ball, this.playerA, this.playerB ) ;

		// Register Objects
		this.addObject( this.playerA, this.playerB, this.ball ) ;

		// Set Players
		this.playerUser = new PlayerBarUser( this.playerA, this._canvas ) ;
		this.playerBot = new PlayerBarBot( this.playerB, this.ball, this._canvas ) ;
	}

	public addUpdateScoreHandler( handler: Function ): void {
		Pong._updateScoreHandler.push( handler ) ;
	}

	public static updateScore = () => {
		for( let handler of Pong._updateScoreHandler ) {
			handler( Pong.score ) ;
		}
	}

	public reset(): void {
		Pong.score = { playerA: 0, playerB: 0 } ;
		Pong.updateScore() ;
		this.ball.randomStart() ;

		this.resume() ;
	}
}