import path from 'path'
import fs from 'fs'
import { IResponseService } from '@interfaces/IResponseService'
import { responseService } from '@utils/functions'
import mime from 'mime-types'
import { moveFile } from '@utils/fileUtil'
import { JsxEmit } from 'typescript'
const pathDocumentation = path.resolve( `./uploads/documentation` )

export const uploadDocumentation = async ( body : any ) : Promise<IResponseService> => {

	try{
		console.log('body:', body)


		const newDirectory = `${pathDocumentation}\\myFile.txt`

		if ( !fs.existsSync( newDirectory ) ) {
			fs.mkdirSync( newDirectory )
		}
		// for ( const propertyFile of Object.keys( body.files ) ) {
		// 	let fileType: string = body.files[propertyFile].type.split( `/` ).pop()
	
		// 	if ( fileType.includes( `zip` ) ) {
		// 		fileType = `zip`
		// 	}
		// 	await moveFile( body.files[propertyFile].path, `${newDirectory}\\${Buffer.from( body.files[propertyFile].name ).toString( `base64` )}.${fileType}` )
		// }
		return responseService( { success: true, message: `Documentacion Cargada`, data: body } )

	} catch(error){
		return responseService( { success: false, message: `La documentacion no pudo ser cargada` } )

	}

	// const documentation = await documentationRepository.save( {
	// 	usuarioId: jwt_id,
	// 	constInscripIva: `${Buffer.from( constInscripIva?.name ).toString( `base64` )}.${constInscripIva.type.split( `/` ).pop().includes( `zip` ) ? `zip` : constInscripIva.type.split( `/` ).pop() }`,
	// 	constInscripIngBrutos: ( constInscripIngBrutosCorresponde ) ? `${Buffer.from( constInscripIngBrutos.name ).toString( `base64` )}.${constInscripIngBrutos.type.split( `/` ).pop().includes( `zip` ) ? `zip` : constInscripIngBrutos.type.split( `/` ).pop() }` : null,
	// 	constInscripIngBrutosCorresponde: constInscripIngBrutosCorresponde,
	// 	cm01: ( cm01Corresponde ) ? `${Buffer.from( cm01.name ).toString( `base64` )}.${cm01.type.split( `/` ).pop().includes( `zip` ) ? `zip` : cm01.type.split( `/` ).pop() }` : null,
	// 	cm01Corresponde: cm01Corresponde,
	// 	cm02: ( cm02Corresponde ) ? `${Buffer.from( cm02.name ).toString( `base64` )}.${cm02.type.split( `/` ).pop().includes( `zip` ) ? `zip` : cm02.type.split( `/` ).pop() }` : null,
	// 	cm02Corresponde: cm02Corresponde,
	// 	cm05: ( cm05Corresponde ) ? `${Buffer.from( cm05.name ).toString( `base64` )}.${cm05.type.split( `/` ).pop().includes( `zip` ) ? `zip` : cm05.type.split( `/` ).pop() }` : null,
	// 	cm05Corresponde: cm05Corresponde,
	// 	exencionesImpositiva: ( exencionesImpositivaCorresponde ) ? `${Buffer.from( exencionesImpositiva.name ).toString( `base64` )}.${exencionesImpositiva.type.split( `/` ).pop().includes( `zip` ) ? `zip` : exencionesImpositiva.type.split( `/` ).pop() }` : null,
	// 	exencionesImpositivaCorresponde: exencionesImpositivaCorresponde,
	// } )

}