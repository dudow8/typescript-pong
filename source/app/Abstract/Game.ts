import { IGameObject } from "../Interface/IGameObject" ;

export abstract class Game {
	protected _context: CanvasRenderingContext2D ;
	protected _objects: Array<IGameObject> = [] ;
	protected _observers: Array<Function> = [] ;
	protected _paused: boolean = true ; // The game needs to start paused for menu display reasons
	protected _gameLoopInterval: number ;
	
	constructor( protected _canvas: HTMLCanvasElement, protected _width: number, protected _heigth: number, protected _fps: number = 60 ) {
		let context = _canvas.getContext( '2d' ) ;
		
		_canvas.width = _width ;
		_canvas.height = _heigth ;
		
		if( context ) this._context = context ;
	}
	
	public isPaused(): boolean {
		return this._paused ;
	}
	
	public pause(): void {
		if( ! this._paused )
			this._paused = true ;
	}
	
	public resume(): void {
		if( this._paused )
			this._paused = false ;
	}
	
	public getContext(): CanvasRenderingContext2D {
		return this._context ;
	}
	
	public addObject( ...objects: Array<IGameObject> ): void {
		for( let object of objects ) {
			object.setContext( this._context ) ;
			this._objects.push( object ) ;
		}
	}
	
	public addObserver( observer: Function ): void {
		this._observers.push( observer ) ;
	}
	
	public start(): void {
		this.gameLoop() ;
	}
	
	public stop(): void {
		if( this._gameLoopInterval ) {
			clearInterval( this._gameLoopInterval ) ;
		}
		
		this._gameLoopInterval = 0 ;
	}

	public gameLoop(): void {
		this._gameLoopInterval = setInterval( this.gameInteraction, 1000 / this._fps ) ;
	}
	
	protected gameInteraction = (): void => {
		if( ! this._paused ) {
			this._context.clearRect( 0, 0, this._canvas.width, this._canvas.height ) ;
			
			for( let observer of this._observers ) {
				observer() ;
			}
			
			for( let object of this._objects ) {
				this._context.beginPath() ;
				object.update() ;
			}
		}
	}
}