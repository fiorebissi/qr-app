import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import contentDisposition from 'content-disposition'
import response from '@network/response'
import { download } from '@services/documentationService'

const handler = nextConnect()


handler.post( async ( req: NextApiRequest, res: NextApiResponse ) => {
	download( req.query.docNameHash as string )
		.then( ( { file, name, type } ) => {
			res.setHeader( `Content-disposition`, contentDisposition( name ) )
			res.setHeader( `Content-type`, type )
			return res.send( file )
		} )
		.catch( ( error ) => {
			return response.error( res, `Unexpected Error`, 500, error.message )
		} )
} )

export default handler