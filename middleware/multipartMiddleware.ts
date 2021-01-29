import response from '@network/response'
import formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
// const form = formidable( { multiples: true } )

export default ( ( req: NextApiRequest, res: NextApiResponse, next : any ): void => {
	try {
		const form = new formidable.IncomingForm()
		const fields = []

		form.on( `field`, ( field, value ) => {
			fields.push( [field, value] )
		} ).on( `fileBegin`, ( _name, file ) => {
			const fileType = file.type.split( `/` ).pop()

			if ( fileType !== `png` && fileType !== `jpg` && fileType !== `pdf` && fileType !== `jpeg` && !fileType.includes( `zip` ) ) {
				response.error( res, `Tipo de archivo invalido, solo se acepta jpg, jpeg, pdf y zip`, 400 )
			}
		} )
		form.parse( req, async ( err, fields, files ) => {
			if ( err ) {
				console.error( `err.formatRequest :>> `, err.message )
				response.error( res, `Error multipart`, 400 )
			}
			req.body = fields
			req.body.files = files
			return next()
		} )
	} catch ( error ) {
		console.log( `error.multipartMiddleware :>> `, error.message )
		response.error( res, `Internal Server Error`, 500 )
	}
} )