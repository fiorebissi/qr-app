import path from 'path'
import fs from 'fs'
import { IResponseService } from '@interfaces/IResponseService'
import { responseService } from '@utils/functions'
import mime from 'mime-types'
import { moveFile } from '@utils/fileUtil'
const pathDocumentation = path.resolve( `./` )

export const uploadDocumentation = async ( body : any ) : Promise<IResponseService> => {

	try{
		const newDirectory = `${pathDocumentation}\\documentos`
		const documents = []

		if ( !fs.existsSync( newDirectory ) ) {
			fs.mkdirSync( newDirectory )
		}
		for (const key in body.files) {
			if (Object.prototype.hasOwnProperty.call(body.files, key)) {
				const element = body.files[key];
				const fileType = element.type
				console.log('fileType', fileType.split( `/` ).pop())
				await moveFile( element.path, `${newDirectory}\\${Buffer.from( element.name ).toString( `base64` )}.${fileType.split( `/` ).pop()}` )
			}
		}
		return responseService( { success: true, message: `Documentacion Cargada`, data: documents } )

	} catch(error){
		console.log(error)
		return responseService( { success: false, message: `La documentacion no pudo ser cargada` } )

	}
}

export const download = async ( docNameHash: string ): Promise<unknown> => {
	const directory = `${pathDocumentation}\\documentos`
	const docName = Buffer.from( docNameHash, `base64` ).toString( `ascii` )

	return new Promise<any>( ( resolve, reject ) => {
		fs.readFile( `${directory}/${docNameHash}`, ( err, data ) => {
			if ( err ) {
				return reject( responseService( { success: false, message: `No se pudo obtener la imagen` } ) )
			}
			return resolve( {
				file: data,
				name: docName,
				type: mime.lookup( docName )
			} )
		} )
	} )
}