export class Util {
	static getRandInteger( min: number, max: number ) {
	    return Math.floor( Math.random() * ( max - min + 1 ) ) + min ;
	}

	static getElementHTML( selector: string ): any {
		let element = <HTMLElement> document.querySelector( selector ) ;

		if( element )
			return element.innerHTML ;

		else
			return ""
	}

	static setElementHTML( selector: string, HTML: string ): any {
		let elements = <HTMLElement[]> <any> document.querySelectorAll( selector ) ;
		
		for( let element of elements ) {
			element.innerHTML = HTML ;
		}
	}

	static setElementStyle( selector: string, style: any ): any {
		let elements = <HTMLElement[]> <any> document.querySelectorAll( selector ) ;
		
		for( let element of elements ) {
			for( let attr in style ) {
				element.style[<any>attr] = style[attr] ;
			}
		}
	}

	static setElementClick( selector: string, callback: Function ): any {
		let elements = <HTMLElement[]> <any> document.querySelectorAll( selector ) ;
		
		for( let element of elements ) {
			element.onclick = ( event: MouseEvent ): any => { 
				callback( this, event ) ;
			} ;
		}
	}
}