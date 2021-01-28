import { NextApiResponse } from 'next'

const success = ( res:NextApiResponse, body: any, status:number ): void => {
	res.status( status || 200 ).json( {
		error: ``,
		body
	} )
}

const error = ( res:NextApiResponse, message: string, status:number, details?: any ): void => {
	console.error( `[response error]:`, details || message )
	res.status( status || 500 ).json( {
		error: {
			message,
			details: ( status !== 500 ) ? details : null
		},
		body: ``
	} )
}

export default {
	success,
	error
}