import Layout from '@components/Layout'
import { upload } from '@utils/upload'
import { checkTypes } from '@utils/functions'
import React, { useState } from 'react'
import { AiOutlineQrcode } from 'react-icons/ai'

const fileqr = () => {
	const SIZE = '32px'
	const [sendData, setSendData] = useState( {
		error: null,
		loading: false
	} )
	const [fileQr,setFileQr] = useState({})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault()
		const formData = new FormData()
		const verifyTypes: string[] = []
		let i = 0
		let totalSize = 0
		let res = null
		setSendData( {
			...sendData,
			loading: true
		} )
		const newData = []

		for ( const property in fileQr ) {
			if ( Object.prototype.hasOwnProperty.call( fileQr, property ) ) {
				let element = fileQr[property]
				let nameSend = property[1]
				console.log('element',element)
				console.log('nameSend',nameSend)
				element = !element
					if ( element?.name ) {
						verifyTypes[i] = element.type.split( `/` ).pop()
						i++
					}
					newData[nameSend] = element
				}
			}

			if ( checkTypes( verifyTypes ) ) {
				setSendData( {
					loading: false,
					error: {
						message: `Solo se pueden subir archivos con extensiones jpg, jpeg, pdf y zip`
					}
				} )
				return
			}

			for ( const key in newData ) {
				if ( Object.prototype.hasOwnProperty.call( newData, key ) ) {
					const element = newData[key]
	
					if ( element?.size ) {
						totalSize += element.size
					}
					formData.append( key, element )
				}
			}
			if ( totalSize / 1024 > 10000 ) {
				setSendData( {
					loading: false,
					error: {
						message: `Supero el peso limite en el total de archivos, puede enviar como máximo 10mb`
					}
				} )
				return
			}
			 res = await fetch(`http://localhost:3000/api/documentation`, {
				method: `POST`,
				body: formData,
			})

			if ( res.error ) {
				setSendData( {
					loading: false,
					error: res.error
				} )
			} else {
				setSendData( {
					loading: false,
					error: ``
				} )
		}
	}

		const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
			const target: any = e.target
			let value: string | boolean | File | null = null
	
			if ( target.type === `checkbox` ) {
				value = target?.checked
			} else if ( target?.type === `file` ) {
				value = target?.files[0]
			} else {
				value = target.value
			}
			const name = target.name
	
			setFileQr( {
				...fileQr,
				[name]: value
			 } )

		}
	// const handleChange = async (e) => {
	// 	const archivo = e.target.files
	// 	var data = new FormData()
	// 	data.append('fileQr',archivo[0])
	// 	console.log('data',data)

	// 	await fetch(`http://localhost:3000/api/documentation`, {
	// 		method: `POST`,
	// 		body: data,
	// 	}).then((result) => {
	// 		return result.json()
	// 	}).catch(e => {
	// 		return console.error('Error',e)
	// 	}) .then(data => {
	// 		console.log(data)
	// 	})
	// }

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-full'>
			<div className='flex flex-row items-center justify-center w-full pb-4'>
					<h1 className='text-xl font-bold text-center text-blue-600'>Generador de QR</h1>
					<AiOutlineQrcode className='ml-2' size={SIZE} />
				</div>
				<div className='pb-4'>
					<form onSubmit={(e) => {handleSubmit(e)}} className='flex flex-col px-4 py-4 space-y-4 border border-indigo-200'>
					<input name='fileQr' id='fileQr' onChange={(e) => {handleChange(e)}} className='w-full px-2 border border-indigo-600' type='file' required/>
					<button type='submit' className='px-4 py-2 text-center text-white bg-indigo-800 border-2 border-indigo-200 rounded hover:bg-indigo-400'>Generar</button>
					</form>
				</div>
				{/* {fileQr && (
					<a className='px-4 py-2 text-center text-white bg-green-400 border-2 border-indigo-200 rounded hover:bg-green-800' download={ext} href={url} target='_blank' >Descargar QR</a>
				)} */}
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
