import React from 'react'
import Layout from '@components/Layout'
import Link from 'next/link'
const index = () => {
	return (
		<Layout>
			<div  className='flex flex-col items-center justify-center w-full'>
				<h1 className='p-4 text-xl font-bold text-center text-blue-600'>Que desea generar a QR?</h1>
				<div className='flex flex-row space-x-2'>
					<Link href='/textoqr'>
					<a className='px-2 py-2 text-white bg-indigo-500 rounded-lg'>
						Texto/Link
					</a>
					</Link>
					<Link href='/fileqr'>
					<a className='px-2 py-2 text-white bg-indigo-500 rounded-lg'>
						Archivo
					</a>
					</Link>
				
				</div>
			</div>
			</Layout>
	)
}

export default index
