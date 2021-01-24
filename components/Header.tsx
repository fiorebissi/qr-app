import React from 'react'

const Header = () => {
	return (
		<div>
			<header className='w-full h-20 px-4 py-2 bg-indigo-600 shadow-2xl'>
				<div className='container flex items-center justify-between mx-auto'>
						<img className='w-36' src='/QrMaker.png' alt='QrMaker' />
				</div>
			</header>
			
		</div>
	)
}

export default Header
