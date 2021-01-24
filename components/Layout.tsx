import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

const Layout = ({children}) => {
	return (
		<div className='relative flex flex-col min-h-screen'>
			<Header />
			<main>
				<div className='container py-4 mx-auto'>
					{children}
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default Layout
