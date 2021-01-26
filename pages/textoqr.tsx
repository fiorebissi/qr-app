import React, { useState } from 'react'
import Layout from '@components/Layout'
import { qrMaker } from '@utils/functions'
import { AiOutlineQrcode } from 'react-icons/ai'
import { useForm } from 'react-hook-form'

const textoqr = () => {
	const { register, handleSubmit, reset } = useForm()
	const SIZE = '32px'
	const [fileQr,setFileQr] = useState(false)
	const [url,setUrl] = useState('')
	const [ext,setExt] = useState('')

	const generaDescargable = async (data) => {
		let arrdata = data.split(',')
		console.log('arrdata',arrdata)
		var fileBase64 = arrdata[0]
		var image = fileBase64.split('/')
		var tipo = image[1]
		console.log(tipo)
		let format
		switch(tipo) {
			case 'png;base64':
						format = 'QR.png'
						break;
			case 'jpeg;base64':
				format = 'QR.jpeg'
				break;
			case 'webp;base64':
				format = 'QR.webp'
				break;
			default:
				format = 'QR.png'
				break;
		}
		return format
	}

	const onSubmit = async (data) => {

		console.log(data)
		reset()
		const response = await qrMaker(data)
		console.log('me devuelve esto: ',response)
		setFileQr(true)
		setUrl(response)
		
		const extencion = await generaDescargable(response)
		setExt(extencion)
	}
	return (
		<div>
			<Layout>
				<div className='flex flex-col items-center justify-center w-full'>
				<div className='flex flex-row items-center justify-center w-full pb-4'>
					<h1 className='text-xl font-bold text-center text-blue-600'>Generardor de QR</h1>
					<AiOutlineQrcode className='ml-2' size={SIZE} />
				</div>
				<div className='pb-4'>
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col px-4 py-4 space-y-4 border border-indigo-200'>
					<input name='textoQr' ref={register} id='textoQr' className='w-full px-2 border border-indigo-600 rounded-xl' type='text' placeholder='escriba un texto o ingrese un link...' required/>
					<label htmlFor='formatoQr' id='formatoQr' className='block text-sm font-medium text-gray-700'>
						Seleccione el formato del QR
						<select ref={register} id='formatoQr' name='formatoQr' className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required>
							<option value=''>----</option>
							<option value='1'>png</option>
							<option value='2'>jpg</option>
							<option value='3'>webp</option>
						</select>
					</label>
					<button type='submit' className='px-4 py-2 text-center text-white bg-indigo-800 border-2 border-indigo-200 rounded hover:bg-indigo-400'>Generar</button>
					</form>
				</div>
				{fileQr && (
					<a className='px-4 py-2 text-center text-white bg-green-400 border-2 border-indigo-200 rounded hover:bg-green-800' download={ext} href={url} target='_blank' >Descargar QR</a>
				)}
				</div>
				
			</Layout>
		</div>
	)
}

export default textoqr
