import express from 'express'
import next from 'next'
import cors from 'cors'
import config from './config'

const port = config.port || 3000
const dev = config.nodeEnv !== `production`
const app = next( { dev } )

const handle = app.getRequestHandler()

app.prepare().then( () => {
	const server = express()

	server.use( cors( {
		origin: true,
		credentials: true
	} ) )

	server.all( `*`, ( req, res ) => {
		return handle( req, res )
	} )

	server.listen( port, () => {
		console.log( `> Ready on http://localhost:${port}` )
	} )

} )