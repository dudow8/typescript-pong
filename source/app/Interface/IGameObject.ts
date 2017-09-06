import { IGameObjectDefinition } from "./IGameObjectDefinition" ;

export interface IGameObject {
	id: string ;
	style: IGameObjectDefinition ;
	
	build(): void ;
	update(): void ;

	collision( components: Array<IGameObject> ): void ;
	setContext( context: CanvasRenderingContext2D ): void ;

	addUpdateHanlder( handler: Function ): void ;
	addCollisionHanlder( handler: Function ): void ;
}