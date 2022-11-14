import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
import TopNav from '../../components/topNav'
import Loading from '../../components/loading'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'

import { getFetcher } from "../../utils/swr_utils"


const Club = () => {
	const router = useRouter()
	const club = router.query.club

	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/get?club=' + club, getFetcher);

	console.log("hello from [club]",clubData)





	if (clubDataError) {
		return <div>failed to load</div>
	}
	if (!clubData) {
		return <div>
			<Loading />


		</div>
	}
	return (

		<div className='index_main'>
			<TopNav />
			<div className="manage_main_div">

				<div className="manage_main_div_left">
					<SideNav />

				</div>
				<div className='manage_main_div_right'>


					<div className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
						<h1>
							{clubData.name}
						</h1>
						<p>
							{clubData.description}
						</p>
						<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${clubData.fileUrl}?alt=media`} width={200} height={200} />


					</div>
	
				</div>
			</div>

		</div>
		
	)
}

export default Club