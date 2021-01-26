import React from 'react'
import Link from 'next/link'

const Header = () => {
	return (
		<div>
			<header className='w-full h-20 px-4 py-2 bg-indigo-600 shadow-2xl'>
				<div className='container flex items-center justify-between mx-auto'>
						<img className='w-36' src='/QrMaker.png' alt='QrMaker' />
						<div>
							<Link href='/'>
								<a className='px-4 py-2 text-center text-white bg-indigo-800 border border-indigo-200 rounded-lg'>Volver al Home	</a>
							</Link>
						</div>
				</div>
			</header>
			
		</div>
	)
}

export default Header
