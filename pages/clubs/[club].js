import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
import TopNav from '../../components/topNav'
const Club = () => {
	const router = useRouter()
	const club = router.query.club
	console.log(club)
	return (
		<div>
			<TopNav/>

			<div>
				<SideNav />




				{club}</div>

		</div>
		
	)
}

export default Club