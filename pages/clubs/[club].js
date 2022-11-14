import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
import TopNav from '../../components/topNav'

import useSWRImmutable from 'swr/immutable';


import { getFetcher } from "../../utils/swr_utils"


const Club = () => {
	const router = useRouter()
	const club = router.query.club

	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/get?club=' + club, getFetcher);

	console.log("hello from [club]",clubData)





	console.log(club)
	return (

		<div className='index_main'>
			<TopNav />
			<div className="manage_main_div">

				<div className="manage_main_div_left">
					<SideNav />



				</div>
				<div className='manage_main_div_right'>


					<div className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
						hello 






					</div>
					

					


					
				</div>
			</div>

		</div>
		
	)
}

export default Club