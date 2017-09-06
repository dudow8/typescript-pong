import { PongController } from "./app/Controller/PongController" ;

let $canvas = document.querySelector( 'canvas' ) ;
let Pong: PongController ;

if( $canvas != null ) {
	Pong = new PongController( $canvas ) ;
	Pong.run() ;
} 
else {
	alert( "Your browser doesn't support canvas" ) ;
}