import Layout from '@components/Layout'
import React, { useState } from 'react'
import { AiOutlineQrcode } from 'react-icons/ai'

const fileqr: React.FunctionComponent = () => {
	const SIZE = '32px'
	const [sendData, setSendData] = useState( {
		error: null,
		loading: false,
		data: []
	} )

	const [dochash, setDocHash] = useState({
		docHash: ''
	})

	const dev = process.env.NODE_ENV !== `production`
	const path = dev ? `http://localhost:3000` : `${process.env.URL_APP}`


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		const formData = new FormData()	
		const prueba = []
		setSendData( {
			...sendData,
			loading: true
		} )

		for (let i = 0; i < (document.getElementById('fileQr') as HTMLInputElement).files.length; i++) {
			const element = (document.getElementById('fileQr') as HTMLInputElement).files[i];
			formData.append(`${i}`, element)
			prueba.push({ name: i, file: element })
			
		}

			await fetch(`${path}/api/documentation`, {
				method: `POST`,
				body: formData,
			}).then((result) => {
				return result.json()
			}).catch(e => {
				setSendData({loading: false, error: e, data: null })
			}).then(data => {
				if(data?.body && data.body.data.length){
					setDocHash({ docHash: data.body.data[0].nombre})
					setSendData({ loading: false, error: '', data: data.body.data })
				} else if ( data?.error ){
					setSendData({ loading: false, error: data.error?.message, data })
				} else {
					setSendData({ loading: false, error: 'No se registro nada', data: null })
				}
			})
	}

	const handleDownload = async () => {
		const hashDoc = dochash.docHash
		const type = hashDoc.split(`.`).pop()
		const result = await fetch(`${path}/api/download?docNameHash=${hashDoc}`, {
			method: `POST`
		}).then( ( res ) => {
			return res.blob()
		} )
		.catch( ( res ) => {
			return { ...res, error: res.message }
		} )
		.then( ( res ) => {
			return res
		} )
		if ( result?.error ) {
			console.log( `error` )
		} else {
			const url = window.URL.createObjectURL( result )
			const a = document.createElement( `a` )
	
			a.href = url
			a.target = `_blank`
			a.download = `${hashDoc}.${type}`
			document.body.appendChild( a )
			a.click()
			a.remove()
		}
	}


	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-full'>
			<div className='flex flex-row items-center justify-center w-full pb-4'>
					<h1 className='text-xl font-bold text-center text-blue-600'>Generador de QR</h1>
					<AiOutlineQrcode className='ml-2' size={SIZE} />
				</div>
				<div className='pb-4'>
					<form onSubmit={(e) => {handleSubmit(e)}} className='flex flex-col px-4 py-4 space-y-4 border border-indigo-200'>
					<input name='fileQr' id='fileQr' className='w-full px-2 border border-indigo-600' type='file' multiple required/>
					<button type='submit' className='px-4 py-2 text-center text-white bg-indigo-800 border-2 border-indigo-200 rounded hover:bg-indigo-400'>Generar</button>
					</form>
				</div>
				{/* {fileQr && (
					<a className='px-4 py-2 text-center text-white bg-green-400 border-2 border-indigo-200 rounded hover:bg-green-800' download={ext} href={url} target='_blank' >Descargar QR</a>
				)} */}
				{sendData.data.length > 0 && (
					<div className='pt-2'>
						<button type='button' className='px-4 py-2 text-center text-white bg-green-400 border-2 border-indigo-200 rounded hover:bg-green-800' onClick={handleDownload}>Descargar</button>
						</div>
				)}
				{sendData.error && <p className='text-sm font-bold text-center text-red-700'>{sendData.error.message}</p>}
				<div className='flex justify-end p-2'>
					{sendData.loading && (
						<p className='text-lg text-blue-500'>Cargando...</p>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default fileqr
