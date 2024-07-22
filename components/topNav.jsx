import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import logo from "../Images/logo.png"
// top nav bar component with sticky position on top of the page
const TopNav = () => {

	
	
	const [userData, setUserData] = useState({});
	// console.log(userData);


	


	return (


		<div className='topNav dark:bg-gray-900'>
			<div className='leftNav'>

				<div className='logoDiv2'>

					<Image src={logo} width={50} height={50} className="logo_image" alt="image here"/>

				</div>
				<p className='text-2xl text-white ml-8 '>
					GVP Community
				</p>
				<Image src="https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images/rotract.png2572652a-be20-4153-bb95-4f9fd40477dc" width={100} height={100} alt="image here"/>
			</div>
				<div className='rightNav'>
					<p className='text-base text-white mr-10' onClick={() => window.location.href = '/'}>
						Clubs
					</p>
					<p className='text-base text-white mr-10 ' onClick={() => window.location.href = '/manager_member'}>
						Manager / Member
					</p>
					<p className='text-base text-white  mr-10' onClick={() => window.location.href = '/admin'}>
						Admin
					</p>

				</div>
		
		</div>
	)
}

export default TopNav