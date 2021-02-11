import path from 'path'
import fs from 'fs'
import { IResponseService } from '@interfaces/IResponseService'
import { responseService } from '@utils/functions'
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
				await moveFile( element.path, `${newDirectory}\\${Buffer.from( element.name ).toString( `base64` )}.${fileType.split( `/` ).pop()}` )
				documents.push(
					`${Buffer.from( element.name ).toString( `base64` )}.${fileType.split( `/` ).pop().includes( `zip` ) ? `zip` : fileType.split( `/` ).pop() }`,
				)
			}
		}
		return responseService( { success: true, message: `Documentacion Cargada`, data: documents } )

	} catch(error){
		console.log(error)
		return responseService( { success: false, message: `La documentacion no pudo ser cargada` } )

	}
}


