import { Pong } from "../Pong" ;
import { Util } from "../Infrastructure/Util" ;
import { PlayerBarBotDifficult } from "../Decorator/PlayerBarBot" ;

export class PongController {
	public pong: Pong ;
	public activeView: string = "NewGame" ;
	public scoreToWin: number = 15 ;
	
	constructor( _canvas: HTMLCanvasElement ) {
		this.pong = new Pong( _canvas ) ;
	}
	
	public run() {
		this.buildMouseEvents() ;
		this.buildKeyboardEvents() ;
		this.pong.addUpdateScoreHandler( this.updateScore ) ;
		
		this.pong.start() ;
	}

	public selectGameDifficult = ( difficult: PlayerBarBotDifficult ) => {
		this.pong.playerBot.setDifficult( difficult ) ;
		this.changeActiveView( "GamePlay" )
		this.pong.reset() ;
	}

	public setWinner = ( playerName: string ): void => {
		this.pong.pause() ;
		Util.setElementHTML( ".menu .winner > h2 > b", playerName ) ;
		this.changeActiveView( 'Winner' ) ;
	}

	public updateScore = ( score: any ) => {
		Util.setElementHTML( ".score.playerA > h1", score.playerA ) ;
		Util.setElementHTML( ".score.playerB > h1", score.playerB ) ;

		// Player A won
		if( score.playerA == this.scoreToWin ) {
			this.setWinner( Util.getElementHTML( ".score.playerA > p" ) ) ;
		}

		// Player B won
		if( score.playerB == this.scoreToWin ) {
			this.setWinner( Util.getElementHTML( ".score.playerB > p" ) ) ;
		}
	}

	public changeActiveView = ( view: string ): void => {
		switch ( view ) {
			case "NewGame":
				Util.setElementStyle( ".menu", { display: "block" } ) ;
				Util.setElementStyle( ".menu > .new", { display: "block" } ) ;
				Util.setElementStyle( ".menu > .pause", { display: "none" } ) ;
				Util.setElementStyle( ".menu > .winner", { display: "none" } ) ;
			break ;

			case "PauseGame":
				Util.setElementStyle( ".menu", { display: "block" } ) ;
				Util.setElementStyle( ".menu > .new", { display: "none" } ) ;
				Util.setElementStyle( ".menu > .pause", { display: "block" } ) ;
				Util.setElementStyle( ".menu > .winner", { display: "none" } ) ;
			break ;

			case "GamePlay":
				Util.setElementStyle( ".menu", { display: "none" } ) ;
			break ;

			case "Winner":
				Util.setElementStyle( ".menu", { display: "block" } ) ;
				Util.setElementStyle( ".menu > .new", { display: "none" } ) ;
				Util.setElementStyle( ".menu > .pause", { display: "none" } ) ;
				Util.setElementStyle( ".winner", { display: "block" } ) ;
			break ;
		}

		this.activeView = view ;
	}

	public buildKeyboardEvents = (): void => {
		document.onkeyup = ( event: KeyboardEvent ) => {
			switch ( event.keyCode ) {
				case 27:
					if( this.activeView == "GamePlay" ) {
						this.pong.pause() ;
						this.changeActiveView( "PauseGame" ) ;
					}
				break ;
			}
		}
	}

	public buildMouseEvents = (): void => {
		// Start Menu Action
		Util.setElementClick( ".menu .start-ease", () => {
			this.selectGameDifficult( PlayerBarBotDifficult.ease ) ;	
		}) ;

		Util.setElementClick( ".menu .start-normal", () => {
			this.selectGameDifficult( PlayerBarBotDifficult.medium ) ;
		}) ;

		Util.setElementClick( ".menu .start-hard", () => {
			this.selectGameDifficult( PlayerBarBotDifficult.hard ) ;
		}) ;

		Util.setElementClick( ".menu .resume-game", () => {
			this.pong.resume() ; this.changeActiveView( "GamePlay" ) ;
		}) ;

		Util.setElementClick( ".menu .new-game", () => {
			this.pong.reset() ; this.pong.pause() ;
			this.changeActiveView( "NewGame" ) ;
		}) ;
	}
}