import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
import TopNav from '../../components/topNav'
import Loading from '../../components/loading'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'

import { getFetcher } from "../../utils/swr_utils"


const Club = () => {

	let userMail = "null"

	if (typeof window !== 'undefined') {
		console.log(localStorage.getItem("email"))
		localStorage.getItem("email") ? userMail = localStorage.getItem("email") : userMail = "null";
		userMail = localStorage.getItem("email")
	}



	const router = useRouter()
	const club = router.query.club

	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/get?club=' + club, getFetcher);


	const { data: posts, error: postError } = useSWRImmutable('http://localhost:3000/api/post/getByClub?clubId=' + club, getFetcher);
	console.log("posts", posts)


	console.log("hello from [club]", clubData)





	if (clubDataError) {
		return <div>failed to load</div>
	}
	if (!clubData || !posts) {
		return <div>
			<Loading />


		</div>
	}
	return (

		<div className='ind_club_main'>
			<div className='topNav dark:bg-gray-900'>
				<div className='leftNav'>
					<p className='text-2xl text-white ml-8 '>
						Website Name
					</p>
				</div>
				{
					userMail ? (
						<div className='rightNav'>
							<p className='text-base text-white mr-10' onClick={() => window.location.href = '/'}>
								Clubs
							</p>
							{
								userMail !== "admin" ? (
									<p className='text-base text-white mr-10 ' onClick={() => window.location.href = '/manager_member'}>
										Manager / Member
									</p>
								) : (
									<p className='text-base text-white  mr-10' onClick={() => window.location.href = '/admin'}>
										Admin
									</p>
								)
							}
							<p className='text-base text-white bg-blue-700 pt-2 pb-2 pl-2 pr-2  mr-10' onClick={
								() => {
									localStorage.removeItem("email");
									window.location.href = "/"
								}
							}>
								logout
							</p>

						</div>

					) : (

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





					)
				}


			</div>

			<div className="ind_club_header">
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
			<h1 className='text-3xl pl-6 '>


				Posts

			</h1>

			<div className='ind_post_main pl-4'>
				

				{
					posts.length !== 0 &&
					posts.map((post) => (

						<div className='ind_club_posts bg-white shadow-md rounded    mb-2 mt-2 ml-2 mr-2' >



							<div className='ind_club_post_header'>
								<p className='text-xl pl-6'>{post.header}</p>
								<p className='text-small'>{post.userId}</p>


							</div>
						

							<div className='ind_club_post_image'>
							<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${post.fileUrl}?alt=media`} width={300} height={300} />
								</div>

							
							<p className='pl-6'>{post.paragraph}</p>

						</div>

					))
				}



			</div>

		</div>

	)
}

export default Club