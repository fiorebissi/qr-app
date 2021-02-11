import QRCode from 'qrcode'
import { IResponseService } from '@interfaces/IResponseService'


export const responseService = ( response: IResponseService ): IResponseService => {
	return response
}

export function checkTypes( types: string[] ): boolean {
	let result = false

	types.forEach( ( type ) => {
		if ( ( type !== 'png' && type !== `jpg` && type !== `pdf` && type !== `jpeg` && !type.includes( `zip` ) ) || result ) {
			result = true
		} else {
			result = false
		}
	} )
	return result
}
 
export const qrMaker = async ( data ) => {
	
	try {
		const bodyParse = JSON.stringify(data)
		const parseBody = JSON.parse(bodyParse)
		const textoqr = parseBody.textoQr
		const formatoqr = parseBody.formatoQr
		let output 
		switch (formatoqr) {
			case '1':
				output = 'image/png'
				break;
			case '2':
				output = 'image/jpeg'
				break;
			case '3': 
				output = 'image/webp'
				break;
			default:
				output = 'image/png'
				break;
		}
				
		var opts = {
			errorCorrectionLevel: 'H',
			type: output,
			quality: 0.3
		}
		let codigo 

		QRCode.toDataURL(textoqr, opts, function (err, url) {

			codigo = url
		})	

		return codigo
		
	} catch (error) {
		return error
		
	}
}

export const generaQr = async (docNameHash) => {
	try{
		const textoqr = `https://qr-app.fiorebissi.vercel.app/documentos/${docNameHash}`

		var opts = {
			errorCorrectionLevel: 'H',
			type: 'png',
			quality: 0.3
		}
		let codigo 

		QRCode.toDataURL(textoqr, opts, function (err, url) {
			console.log(url)
			codigo = url
		})	

		return codigo
	}catch(error){
		return error
	}
}



