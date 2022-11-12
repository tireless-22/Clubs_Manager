import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { useRouter } from "next/router";


import logo from "../Images/logo.png"

const TopNav = () => {


	
  const router = useRouter();

	return (

		<nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<Link href="#" className="flex items-center">
					{/* <Image src={logo} height={70} width={70} alt="Flowbite Logo"></Image> */}
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
				</Link>
			
				<div className="hidden w-full md:block md:w-auto" id="mobile-menu">
					
					
					<ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						

						<li>
							<Link href="/manager_member" className={router.pathname == "/manager_member" ? "active" : "block py-2 pr-4 pl-3 text-white md:dark:bg-transparent"}  >Manager / Member </Link>
						</li>


						
						<li>
							<Link href="/admin" className={router.pathname == "/manager_member" ? "active" : "block py-2 pr-4 pl-3 text-white md:dark:bg-transparent"}>Admin</Link>
						</li>
						
					</ul>
				</div>
			</div>
		</nav>

	)
}

export default TopNav