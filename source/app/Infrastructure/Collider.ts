import { IGameObject } from "../Interface/IGameObject" ;

export class Collider {
	private static _instance: Collider ;
	private _observers: Array<IGameObject> = [] ;

	private constructor() { }

	public static getInstance(): Collider {
		if( this._instance == null ) {
			this._instance = new Collider() ;
		}

		return this._instance ;
	}

	watch( ...objects: Array<IGameObject> ): void {
		for( let object of objects ) {
			this._observers.push( object ) ;
		}
	}

	observer = () => {
		for( let objectA of this._observers ) {
			let collisionList: Array<IGameObject> = [] ;

			for( let objectB of this._observers ) {
				if( objectB != objectA && this.isCollided( objectA, objectB ) ) {
					collisionList.push( objectB ) ;
				}
			}

			if( collisionList.length )
				objectA.collision( collisionList ) ;
		}
	}

	private isCollided( a: IGameObject, b: IGameObject ) {
		let hit_x: boolean = false ;
		let	hit_y: boolean = false ;

		if( a.style.x <= b.style.x ) {
			if( ( a.style.x + a.style.width ) >= b.style.x )
				hit_x = true ;
		}
		else {
			if( ( b.style.x + b.style.width ) >= a.style.x )
				hit_x = true ;
		}

		if( a.style.y <= b.style.y ) {
			if( ( a.style.y + a.style.height ) >= b.style.y )
				hit_y = true ;
		}
		else {
			if( ( b.style.y + b.style.height ) >= a.style.y )
				hit_y = true ;
		}

		if( hit_x && hit_y )
			return true ;

		return false ;
	}
}