import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
import TopNav from '../../components/topNav'
import Loading from '../../components/loading'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import logo from "../../Images/logo.png"
import dynamic from "next/dynamic";
import { getFetcher } from "../../utils/swr_utils"
var $ = require("jquery");
if (typeof window !== "undefined") {
	window.$ = window.jQuery = require("jquery");
}

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
});


const options = {
	loop: true,
	center: true,
	items: 3,
	margin: 0,
	autoplay: true,
	dots: true,
	autoplayTimeout: 400000,
	smartSpeed: 450,
	nav: false,
	responsive: {
		0: {
			items: 1
		},
		600: {
			items: 2
		},
		1000: {
			items: 3
		}
	}
};





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
	console.log(clubData)

	const { data: posts, error: postError } = useSWRImmutable('http://localhost:3000/api/post/getByClub?clubId=' + club, getFetcher);
	console.log("posts", posts)

	const { data: designations, error: designationsError } = useSWRImmutable('/api/club/getDesignation?club=' + club, getFetcher);
	console.log("designations", designations)

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



			{/* club logo and name */}
			<div className="flex_center">
				<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${clubData.fileUrl}?alt=media`} className="club_page_main_logo" width={300} height={300} />

			</div>

			<div className="flex_center">
				<h1 className='club_page_heading'>
					{clubData.name}
				</h1>


			</div>
			{clubData.quotation &&
				<div className="flex_center">
					<h1 className='text-base'>
						{clubData.quotation}
					</h1>
				</div>
			}

			<div className='club_page_details_box'>


			</div>



			{clubData.about &&
				<div className="club_page_about_us_div_total">
					<h1 className='text-2xl'>
						<u>

							About {clubData.name}
						</u>
					</h1>
					<div className='club_page_about_us_div'>
						<p style={{ textAlign: "center" }} className='text-base'>
							{clubData.about}
						</p>

					</div>
				</div>
			}

			{


				designations && designations.length > 0 && (

					<div className='Designation_main_div'>
						<h1 className='text-2xl ' style={{ textDecorationColor: "blue" }} >
							<u>

								Board Members
							</u>
						</h1>
						<div className='club_page_designations'>
							{
								designations.map((designation, index) => (
									<div className='designation_box'>

										<div className='designation_image_div'>

											<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${designation.fileUrl}?alt=media`} className="designation_image" width={120} height={120} />
										</div>

										<h1>
											{designation.name}
										</h1>
										<h1>
											{designation.designationType}
										</h1>


									</div>


								)
								)
							}


						</div>

					</div>

				)}


			{/* experiment*/}

			<div className='coursel mt-20 mb-20'>


				<OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme"{...options}>

					{
						posts.map((post) => (

							<div className='ind_club_posts bg-white shadow-md rounded    mb-2 mt-2 ml-2 mr-2' >



								<div className='ind_club_post_header'>
									<div className="flex_center">

									<p className='text-xl pl-6'>{post.header}</p>

									</div>

									


								</div>


								<div className='ind_club_post_image'>
									<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${post.fileUrl}?alt=media`} width={300} height={300} />
								</div>


								<p className='pl-6'>{post.paragraph}</p>

							</div>

						))
					}


				</OwlCarousel>
			</div>




{/* 
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



			</div> */}


			<div class="row">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.3861539630434!2d83.34015411494428!3d17.820523887820432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395bedc7efb603%3A0x87c06caab54e902a!2sGVP%20College%20of%20Engineering%20(Autonomous)!5e0!3m2!1sen!2sin!4v1598167973876!5m2!1sen!2sin" width="100%" height="233" ></iframe>
			</div>


			<div className='footer_main'>
				<div className='footer_Top'>


					<div className='footer_left'>
						<h1 className='f32'> Contact</h1>
						<p className='text-xl'>Email : gvpce@yahoo.com
						</p>


					</div>
					<div className='footer_middle'>
						<h1 className='f48'>Gvpce All Clubs</h1>
						<p className='text-xl' style={{ textAlign: "justify" }}>To evolve into and sustain as a Centre of Excellence in Technological Education and Research with a  holistic approach</p>


					</div>
					<div className='footer_right'>

						<Image src={logo} width={200} height={200} />
					</div>



				</div>


				<div className='footer_bottom'>
					<div className='text-base ml-8'>
						Copy Right Â© 2021 Gayatri Vidya Parishad College of Engineering (Autonomous). All Rights Reserved
					</div>


				</div>




			</div>















		</div>

	)
}

export default Club