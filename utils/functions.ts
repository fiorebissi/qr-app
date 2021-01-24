import QRCode from 'qrcode'
 
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
		console.log('eligio: ', output)
		QRCode.toDataURL(textoqr, opts, function (err, url) {
			console.log(url)
			codigo = url
		})	

		return codigo
		
	} catch (error) {
		return error
		
	}


}

