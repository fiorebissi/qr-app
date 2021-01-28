import fs from 'fs'

export const moveFile = ( oldPath : string, newPath : string ) : Promise<any> => {
	return new Promise( ( resolve, reject ) => {
		fs.rename( oldPath, newPath, ( err ) => {
			if ( err ) {
				console.log( `error.moveFile :>> `, err.message )
				reject( false )
			}
			resolve( true )
		} )
	} )
}