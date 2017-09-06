import { IGameObject } from "../Interface/IGameObject" ;
import { GameObject } from "../Abstract/GameObject" ;
import { Pong } from "../Pong" ;
import { Util } from "../Infrastructure/Util" ;

export class PlayerBall extends GameObject implements IGameObject {
	public id: string ;
	public speed: any = { x: 5, y: 5 } ;
	public direction: string ;
	
	constructor( id: string ) {
		super() ;

		this.id = id ;
		this.style.width = this.style.height = 10 ;
		this.style.fill = { color: "#FFFFFF" } ;

		this.addUpdateHanlder( this.autoUpdateDirection ) ;
		this.addCollisionHanlder( this.collisionHandler ) ;
	}
	
	public build(): void {
		let context = this._context ;
		
		context.rect( this.style.x, this.style.y, this.style.width, this.style.height ) ;
		
		this.applyStyle() ;
	}
	
	public randomStart( x_direction: string = 'left' ) : void {
		let quarter_y = this._context.canvas.height / 4 ;
		let y_direction = [ 'up', 'down' ][Util.getRandInteger( 0, 1 )] ;

		Object.assign( this.style, { 
			x: ( this._context.canvas.width / 2 ) - ( this.style.width / 2 ),
			y: Util.getRandInteger ( quarter_y, this._context.canvas.height - quarter_y ),
		}) ;

		this.speed = { x: 5, y: 5 } ;

		this.direction = "paused" ;
		
		setTimeout( () => {
			this.direction = y_direction + '-' + x_direction ;
		}, 150 ) ;
	}
	
	public randomSpeed(): void {
		this.speed = {
			x: Util.getRandInteger( 5, 10 ),
			y: Util.getRandInteger( 5, 10 )
		} ;
	}
	
	public autoUpdateDirection = () => {
		switch ( this.direction ) {
			case "up-left":
				this.style.y -= this.speed.y ;
				this.style.x -= this.speed.x ;
			break ;

			case "up-right":
				this.style.y -= this.speed.y ;
				this.style.x += this.speed.x ;
			break ;

			case "down-left":
				this.style.y += this.speed.y ;
				this.style.x -= this.speed.x ;
			break ;

			case "down-right":
				this.style.y += this.speed.y ;
				this.style.x += this.speed.x ;
			break ;
		}
	}
	
	public collisionHandler = ( objects: Array<IGameObject> ) => {
		for( let object of objects ) {
			switch ( object.id ) {
				case "playerA":
					if( this.direction.indexOf( 'up' ) !== -1 )
						this.direction = 'up-right' ;
					else
						this.direction = 'down-right' ;

					this.randomSpeed() ;
				break ;

				case "playerB":
					if( this.direction.indexOf( 'up' ) !== -1 )
						this.direction = 'up-left' ;
					else
						this.direction = 'down-left' ;

					this.randomSpeed() ;
				break ;

				case "stageTop":
					if( this.direction.indexOf( 'right' ) !== -1 )
						this.direction = 'down-right' ;
					else
						this.direction = 'down-left' ;
				break ;

				case "stageBottom":
					if( this.direction.indexOf( 'right' ) !== -1 )
						this.direction = 'up-right' ;
					else
						this.direction = 'up-left' ;
				break ;

				case "stageRight":
					Pong.score.playerA++ ;
					Pong.updateScore() ;
					this.randomStart( "left" ) ;
				break ;

				case "stageLeft":
					Pong.score.playerB++ ;
					Pong.updateScore() ;
					this.randomStart( "right" ) ;
				break ;
			}
		}
	}
}