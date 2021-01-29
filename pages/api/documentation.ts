import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import response from '@network/response'
import { uploadDocumentation } from '@services/documentationService'
import { IResponseService } from '@interfaces/IResponseService'

import multipartMiddleware from '@middleware/multipartMiddleware'

const handler = nextConnect()

handler.use( multipartMiddleware )

handler.post( async ( req: NextApiRequest, res: NextApiResponse ) => {
	try {
		const { success, data, message } : IResponseService = await uploadDocumentation( req.body )

		if ( !success ) {
			return response.error( res, message, 200, data )
		}
		return response.success( res, { data, message }, 201 )
	} catch ( error ) {
		return response.error( res, `Unexpected Error`, 500, ` endpoint.documentation >> ${error.message}` )
	}
} )


export default handler