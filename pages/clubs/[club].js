import React from 'react'
import { useRouter } from 'next/router'


const Club = () => {
	const router = useRouter()
	const club = router.query.club
	console.log(club)
	return (
		<div>{club}</div>
	)
}

export default Club