import { IGameObject } from "./IGameObject" ;

export interface IGame {
	start(): void ;
	reset(): void ;
	getContext(): CanvasRenderingContext2D ;
	addObject( ...objects: Array<IGameObject> ): void ;
	addObserver( observer: Function ): void ;

	isPaused(): boolean ;
	pause(): void ;
	resume(): void ;
}