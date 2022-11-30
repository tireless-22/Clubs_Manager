import React from 'react'
import { useRouter } from 'next/router'
import SideNav from '../../components/sideNav'
// import TopNav from '../../components/topNav'
import Loading from '../../components/loading'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import logo from "../../Images/logo.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
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
	autoplayTimeout: 4000,
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

const tooglesGroupId = 'Toggles';
const valuesGroupId = 'Values';
const mainGroupId = 'Main';

const getConfigurableProps = () => ({
	showArrows: boolean('showArrows', true, tooglesGroupId),
	showStatus: boolean('showStatus', true, tooglesGroupId),
	showIndicators: boolean('showIndicators', true, tooglesGroupId),
	infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
	showThumbs: boolean('showThumbs', true, tooglesGroupId),
	useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
	autoPlay: boolean('autoPlay', true, tooglesGroupId),
	stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
	swipeable: boolean('swipeable', true, tooglesGroupId),
	dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
	emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
	autoFocus: boolean('autoFocus', false, tooglesGroupId),
	thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
	selectedItem: number('selectedItem', 0, {}, valuesGroupId),
	interval: number('interval', 2000, {}, valuesGroupId),
	transitionTime: number('transitionTime', 500, {}, valuesGroupId),
	swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
	ariaLabel: text('ariaLabel', undefined),
});






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

	const { data: pastEvents, error: postPastEvents } = useSWRImmutable('http://localhost:3000/api/post/pastPost?clubId=' + club, getFetcher);
	console.log("pastEvents", pastEvents)


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
			<div className='topNav2 '>
				<div className='leftNav'>
					<div className='logoDiv2'>

						<Image src={logo} width={50} height={50} className="logo_image" />

					</div>
					<p className='text-2xl text-white ml-8 '>
						GVP Community
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

			<div className='club_page_details_box bg-pink-100 shadow-md rounded mt-4'>

				<div className='club_page_details_box_left'>

					<div className='club_page_details_box_left_bottom'>
						<h1 className='f48'>
							{clubData.userClub.length}
						</h1>
					</div>

					<div className='club_page_details_box_left_top'>
						<h1 className='f40'>

							Volunteers
						</h1>
					</div>


				</div>

				<div className='club_page_details_box_right'>
					<div className='club_page_details_box_left_bottom'>
						<h1 className='f48'>
							{clubData.event.length}

						</h1>

					</div>



					<div className='club_page_details_box_left_top '>
						<h1 className='f40'>
							Events


						</h1>
					</div>



				</div>





			</div>



			{clubData.about &&
				<div className="club_page_about_us_div_total">
					<h1 className='f40 mt-12 mb-8'>
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
						<h1 className='f40 mt-12 mb-8' style={{ textDecorationColor: "blue" }} >
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

			{
				posts && posts.length > 0 && (
					<>
						<div className='flex_center'>
							<h1 className='f40 mt-12 mb-2'>
								<u>
									Upcoming Events
								</u>
							</h1>

						</div>

						<div className='coursel mb-4 '>
							<Carousel
								infiniteLoop
								autoPlay
								showArrows={true}
							>
								{
									posts.map((post, index) => (
										<div className='ind_club_posts bg-white shadow-md rounded pt-2 pb-2 pl-2 pr-2' >
											<div className='ind_club_post_image'>
												<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${post.fileUrl}?alt=media`} width={300} height={300} />
											</div>

											<div className='ind_club_post_data'>
												<div className='ind_club_header'>
													<div>
														<h1 className='f36'>
															{post.header}
														</h1>
													</div>
													<div className='ind_club_para'>
														<p>
															{post.paragraph}

														</p>
													</div>
												</div>

												<div className='ind_club_footer'>
													<div>
														Event Date:

														{moment(post.eventDate).format(' DD-MMM / YYYY')}
													</div>

													<div>
														Posted By:
														{post.userId}

													</div>
												</div>
											</div>
										</div>
									))
								}
							</Carousel>
						</div>

					</>

				)}
			



			{
				pastEvents && pastEvents.length > 0 && (
					<>
						<div className='flex_center'>
							<h1 className='f40 mt-12 mb-2'>
								<u>
									Past Events
								</u>
							</h1>

						</div>

						<div className='coursel mb-4 '>
							<Carousel
								infiniteLoop
								autoPlay
								showArrows={true}
							>
								{
									pastEvents.map((post, index) => (
										<div className='ind_club_posts bg-white shadow-md rounded pt-2 pb-2 pl-2 pr-2' >
											<div className='ind_club_post_image'>
												<Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${post.fileUrl}?alt=media`} width={300} height={300} />
											</div>

											<div className='ind_club_post_data'>
												<div className='ind_club_header'>
													<div>
														<h1 className='f36'>
															{post.header}
														</h1>
													</div>
													<div className='ind_club_para'>
														<p>
															{post.paragraph}

														</p>
													</div>
												</div>

												<div className='ind_club_footer'>
													<div>
														Event Date:

														{moment(post.eventDate).format(' DD-MMM / YYYY')}
													</div>

													<div>
														Posted By:
														{post.userId}

													</div>
												</div>
											</div>
										</div>
									))
								}
							</Carousel>
						</div>

					</>

				)}



		



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