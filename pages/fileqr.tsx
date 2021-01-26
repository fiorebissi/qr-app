import Layout from '@components/Layout'
import { qrFile } from '@utils/functions'
import React, { useState } from 'react'
import { AiOutlineQrcode } from 'react-icons/ai'

const fileqr = () => {
	const SIZE = '32px'
	const [fileQr,setFileQr] = useState([])

	const handleClick= async () => {
		console.log(fileQr) 
		const response = await qrFile(fileQr)
		// console.log(response)
	
	}
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-full'>
			<div className='flex flex-row items-center justify-center w-full pb-4'>
					<h1 className='text-xl font-bold text-center text-blue-600'>Generador de QR</h1>
					<AiOutlineQrcode className='ml-2' size={SIZE} />
				</div>
				<div className='pb-4'>
					<form className='flex flex-col px-4 py-4 space-y-4 border border-indigo-200'>
					<input name='fileQr' onChange={(e) => {e.target.files && setFileQr([...e.target.files]);}} id='fileQr' className='w-full px-2 border border-indigo-600' type='file' required/>
					<button type='button' onClick={handleClick} className='px-4 py-2 text-center text-white bg-indigo-800 border-2 border-indigo-200 rounded hover:bg-indigo-400'>Generar</button>
					</form>
				</div>
				{/* {fileQr && (
					<a className='px-4 py-2 text-center text-white bg-green-400 border-2 border-indigo-200 rounded hover:bg-green-800' download={ext} href={url} target='_blank' >Descargar QR</a>
				)} */}
			</div>
		</Layout>
	)
}

export default fileqr
