import React, { useState, useEffect, useRef } from 'react'

import useSWRImmutable from 'swr/immutable';
import axios from 'axios';
import 'antd/dist/antd.css';
import Modal from 'react-modal';


import { Dropdown, Menu, Space } from 'antd';
import { getFetcher } from "../../utils/swr_utils"
import Image from 'next/image';
import Link from 'next/link';

import "antd/dist/antd.css";
import { DatePicker } from 'antd';



import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from '../../utils/firebase';

import { v4 } from "uuid";



import InputEmoji from "react-input-emoji";

import Loading from '../../components/loading';
import { async } from '@firebase/util';
;

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};






const index = () => {

	// const router = useRouter();

	let userMail = ""


	if (typeof window !== 'undefined') {
		// console.log(localStorage.getItem("email"))
		localStorage.getItem("email") ? userMail = localStorage.getItem("email") : userMail = "null";

		userMail == "null" ? window.location.href = "/login" : console.log("user logged in")



		userMail = localStorage.getItem("email")
		// console.log(userMail)
	}









	const messagesEndRef = useRef(null);
	// const userMail = "19131a0498@gvpce.ac.in";
	const [club, setClub] = React.useState("All Clubs");
	const [messagesInGroup, setMessageInGroup] = useState([]);
	const [textBoxMessage, setTextBoxMessage] = useState("");


	const [manageMembers, setManageMembers] = React.useState(false);
	const [addPost, setAddPost] = React.useState(false);

	const [heading, setHeading] = React.useState("");
	const [postDescription, setPostDescription] = React.useState("");
	const [eventDate, setEventDate] = useState()


	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);


	const [error1, setError1] = useState("")
	const [passMessage1, setPassMessage1] = useState("")

	const [addMember, setAddMember] = useState("");


	const [error2, setError2] = useState("")
	const [passMessage2, setPassMessage2] = useState("")

	const [membersInClub, setMembersInClub] = useState([]);

	const [clubInfo, setClubInfo] = useState({});


	// Detailed Club Info

	const [detailedClubInfoModal, setDetailedClubInfoModal] = useState(false)




	const [aboutTheClub, setAboutTheClub] = useState("")
	const [facebookUrl, setFacebookUrl] = useState("")
	const [gmail, setGmail] = useState("")
	const [instagramUrl, setInstagramUrl] = useState("")
	const [quatotion, setQuatotion] = useState("")
	const [twitterUrl, setTwitterUrl] = useState("")
	const [youtubeUrl, setYoutubeUrl] = useState("")
	const [clubType, setClubType] = useState("")

	const [error3, setError3] = useState("")
	const [passMessage3, setPassMessage3] = useState("")

	const [clubDetails, setClubDetails] = useState({})




	const [designationModal, setDesignationModal] = useState(false)

	const [error4, setError4] = useState("")
	const [passMessage4, setPassMessage4] = useState("")

	const [designationName, setDesignationName] = useState("")
	const [designationType, setDesignationType] = useState("")
	const [designationUpload, setDesignationUpload] = useState(null);




	useEffect(() => {
		onChatGrps()

	}, [club]);


	useEffect(() => {
		scrollToBottom();

	}, [messagesInGroup]);




	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getByManage?mailId=' + userMail, getFetcher);
	// console.log(clubData)


	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const addMemb = () => {
		// console.log(addMember)

		axios.post('/api/user/createMember', {
			mailId: addMember,
			clubId: club
		})
			.then((response) => {
				// console.log(response);
				setError2("")
				setPassMessage2("Member Added")
				// console.log(passMessage2)
			})
			.catch((error) => {
				// console.log(error);
				setError2("Member not added")
				setPassMessage2("")
				// console.log(error2)
			});



		memberInGroup()

	}



	const onChatGrps = async () => {

		const res1 = await axios.get(
			`/api/user/get?user=${userMail}&club=${club}`
		);


		setClubInfo(res1.data);
		// console.log("clubInfo", clubInfo)



		const res = await axios.get(
			`/api/message/getByClub?clubId=${club}`
		);
		setMessageInGroup(res.data);

		const res2 = await axios.get(
			`/api/club/get?club=${club}`
		)

		setClubDetails(res2.data);
		// console.log(res2.data)

		memberInGroup()

	};




	const memberInGroup = async () => {
		await axios.get(`api/user/getMembers?clubId=${club}`)
			.then((res) => {
				setMembersInClub(res.data)
				// console.log("members in club",membersInClub)
				// console.log("members in club", res.data)
			})
			.catch((e) => {
				console.log(e);
			})

		// console.log(messagesInGroup)

	}

	const handleOnEnter = async () => {
		// console.log(textBoxMessage)

		let msg = textBoxMessage.trim();
		if (msg.length !== 0) {
			await axios.post(
				`api/message/create?club=${club}&mailId=${userMail}&description=${msg}`
			)
				.then((res) => {
					/* console.log("successfull") */
				})
				.catch((e) => {
					console.log(e);
				})
		}
		onChatGrps();

		setTextBoxMessage("");
	}


	const createPost = () => {
		// console.log(heading)
		// console.log(postDescription)
		// console.log("eventDate",eventDate)


		if (heading === '' || postDescription === '') {
			setError1("Please fill all the fields")
		}


		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${v4()}`);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				let fileUrl = imageRef._location.path_;

				fileUrl = fileUrl.slice(7)
				axios.post("/api/post/create", {
					userId: userMail,
					clubId: club,
					heading: heading.trim(),
					eventDate: eventDate,
					description: postDescription.trim(),
					fileUrl: fileUrl,
				})
					.then((response) => {
						// console.log(response.data);
					})
					.catch((error) => {
						// console.log(error);
					});

				setPassMessage1("Post created successfully")

			});
		});

	};

	const addDesignation = () => {
		setError4("")
		if (designationName == '' || designationType === '' || designationUpload === '') {
			setError4('Please fill all the fields')
			return;
		}
		const imageRef = ref(storage, `images/${v4()}`);


		uploadBytes(imageRef, designationUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {

				let fileUrl = imageRef._location.path_;
				fileUrl = fileUrl.slice(7)
				console.log(fileUrl)




				axios.post("/api/club/addDesignation", {
					name: designationName,
					designationType: designationType,
					fileUrl: fileUrl,
					club: club

				}).then((response) => {
					console.log(response.data);
					setPassMessage4("Added or modified designation")

				})
					.catch((error) => {
						console.log(error);
					});

			});
		});
	};




	const createClubDetails = () => {



		axios.post("/api/club/updateClub", {
			clubName: club,
			aboutTheClub: aboutTheClub.trim(),
			facebookUrl: facebookUrl.trim(),
			gmail: gmail.trim(),
			instagramUrl: instagramUrl.trim(),
			quotation: quatotion.trim(),
			twitterUrl: twitterUrl.trim(),
			youtubeUrl: youtubeUrl.trim(),
			clubType: clubType.trim(),
		})


		setPassMessage3("Club details updated successfully")

	}

	const menu = (
		<Menu>
			<Menu.Item onClick={() => {
				setManageMembers(true);
				setAddPost(false);
			}}>Add Members</Menu.Item>
			<Menu.Item onClick={() => {
				setAddPost(true);
				setManageMembers(false);
			}}>Create a Event</Menu.Item>

			<Menu.Item onClick={() => {
				setDetailedClubInfoModal(true)
			}}>Club Details</Menu.Item>

			<Menu.Item onClick={() => {
				setDesignationModal(true)
			}}>Add Designation</Menu.Item>






		</Menu>


	);


	// console.log("clubInfo", clubInfo)
	// console.log("club", club)



	if (clubDataError) return <div>failed to load</div>
	if (!clubData) return <div><Loading /></div>

	return (
		<div className='index_main'>

			<div className='topNav dark:bg-gray-900'>
				<div className='leftNav'>
					<p className='text-2xl text-white ml-8 '>
						Website Name
					</p>

				</div>
				<div className='rightNav'>
					<p className='text-base pt-3 mr-10 text-white' onClick={() => window.location.href = '/'}>
						Clubs
					</p>

					<p className='text-base mr-10 pt-3 text-white  ' onClick={() => window.location.href = '/manager_member'}>
						Manager / Member
					</p>
					<p className='text-base text-white bg-blue-700 mt-4 pt-2 pb-2 pl-2 pr-2  mr-10' onClick={
						() => {
							localStorage.removeItem("email");
							window.location.href = "/"
						}
					}>
						logout
					</p>

				</div>

			</div>





			<div className="manage_main_div">

				<div className="manage_main_div_left bg-gray-700 ">

					<aside className="w-full" aria-label="Sidebar">
						<div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-700">
							<ul className="space-y-2">

								{clubData.map((club) => (
									<li onClick={() => {
										// console.log(club.name)
										setClub(club.clubId);
										onChatGrps();
									}} >
										<div className="flex items-center p-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-500  dark:hover:bg-gray-400">
											<span className="ml-3 text-xl">{club.clubId}</span>

										</div>
									</li>

								))}
							</ul>
						</div>
					</aside>
				</div>


				<div className='manage_main_div_right'>
					{/* NAVBAR */}

					<div className="manage_main_div_right_top pl-2 pr-2 ">

						<div className=' text-white text-xl'>
							{club}
						</div>
						{/* set */}
						{/* setManageMembers(true); */}
						{/* setAddPost(true); */}
						<div>


							{
								clubInfo.role === 2 && (
									<Dropdown.Button overlay={menu} >
										Manage Club
									</Dropdown.Button>
								)
							}
						</div>

					</div>

					<div style={{
						overflowX: "hidden",

						flex: 11,
						backgroundColor: "#f6f7f8",

						width: "100%",

						position: "static",
						display: "flex",
						flexDirection: "column",
					}}
					>

						<div className='msgsBody'>
							<div className='messagesAll'>

								{messagesInGroup.map((msg) => (
									<div key={msg.id}>
										{msg.userId === userMail ? (
											<div className='rightMessages pt-2 pl-3 pr-3 pb-2'>
												<h1>{msg.description}</h1>
											</div>
										) : (
											<div className='leftMessages pt-2 pl-3 pr-3 pb-2'>
												<p>{msg.userId}</p>
												<h5 >
													{msg.description}
												</h5>

											</div>
										)}
										<div ref={messagesEndRef} />
									</div>
								))}
							</div>
						</div>

					</div>



					<div className="manage_main_div_right_bottom">
						<InputEmoji
							value={textBoxMessage}
							onChange={setTextBoxMessage}
							cleanOnEnter
							onEnter={handleOnEnter}
							placeholder="Type a message"
						/>
					</div>

				</div>
			</div>



			{/* For adding manager */}

			<Modal
				isOpen={manageMembers}

				onRequestClose={() => setManageMembers(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>

				<h1 className='text-2xl justify-between  font-sans font-semibold mt-4 mb-2'> Manage Members</h1>


				<div className='admin_create_club w-96'>


					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
							Mail Id
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Mail Id"

							onChange={(e) => setAddMember(e.target.value)}
						>
						</input>
					</div>





					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
							onClick={addMemb}
						>
							Add a member
						</button>
						<p className='text-red-500'>
							{error2}
						</p>
						<p className='text-green-500'>
							{passMessage2}
						</p>

					</div>

					<h2 className='text-xl justify-between  font-sans font-semibold mt-4 mb-2'>
						All Members

					</h2>

					{membersInClub.map((member) => (
						<div key={member.id} className='flex justify-between'>
							<p className='text-base justify-between  font-sans font-semibold mt-4 mb-2'>
								{member.userId}
							</p>
						</div>
					))}



				</div>

			</Modal>






			{/* For adding a event */}
			<Modal
				isOpen={addPost}

				onRequestClose={() => setAddPost(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className='admin_create_club w-96'>
					<form className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-2 mr-2">
						<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Create a Post</h1>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Event Heading
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Heading"

								onChange={(e) => setHeading(e.target.value)}
							>
							</input>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Description">
								Event Description
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Descriptioin" type="text" placeholder="Post Description"
								onChange={(e) => setPostDescription(e.target.value)}
							>
							</input>
						</div>
						<div className="mb-4">
							<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
								onChange={(e) => setImageUpload(e.target.files[0])} />
						</div>

						<div className="flex items-center justify-between">
							<DatePicker onChange={(date) => setEventDate(date)} />,
						</div>
						<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
								onClick={createPost}
							>
								Create a Club
							</button>
							<p className='text-red-500'>
								{error1}
							</p>
							<p className='text-green-500'>
								{passMessage1}
							</p>

						</div>
					</form>
				</div>


			</Modal>



			{/* Detailed Club Info */}



			<Modal
				isOpen={detailedClubInfoModal}
				// className="w-96"


				onRequestClose={() => setDetailedClubInfoModal(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className='admin_create_club '>
					<form className="modal_form bg-white shadow-md rounded px-8 w-96  pb-4 mb-2 mt-2 ml-2 mr-2">
						<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Enter Detailed Club Info</h1>

						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								About the Club
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="About the Club"
								value={clubDetails.about}
								onChange={(e) => { setClubDetails({ ...clubDetails, about: e.target.value }) }}

							>
							</input>
						</div>

						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Facebook Url
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Facebook Url"
								value={clubDetails.facebookUrl}
								onChange={(e) => { setClubDetails({ ...clubDetails, facebookUrl: e.target.value }) }}

							>
							</input>
						</div>

						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Gmail
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Gmail"
								value={clubDetails.gmail}

								onChange={(e) => { setClubDetails({ ...clubDetails, gmail: e.target.value }) }}
							>
							</input>
						</div>


						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Instagram Url
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Instagram Url"
								value={clubDetails.instagramUrl}
								onChange={(e) => { setClubDetails({ ...clubDetails, instagramUrl: e.target.value }) }}

							>
							</input>
						</div>


						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Twitter Url
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Twitter Url"
								value={clubDetails.twitterUrl}

								onChange={(e) => { setClubDetails({ ...clubDetails, twitterUrl: e.target.value }) }}
							>
							</input>
						</div>



						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Youtube Url
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Youtube Url"
								value={clubDetails.youtubeUrl}
								onChange={(e) => { setClubDetails({ ...clubDetails, youtubeUrl: e.target.value }) }}

							>
							</input>
						</div>



						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Quatotion
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Quatotion"
								value={clubDetails.quotation}
								onChange={(e) => { setClubDetails({ ...clubDetails, quotation: e.target.value }) }}
							>
							</input>
						</div>





						<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
								onClick={createClubDetails}
							>
								Modify Club Details
							</button>
							<p className='text-red-500'>
								{error3}
							</p>
							<p className='text-green-500'>
								{passMessage3}
							</p>

						</div>
					</form>
				</div>


			</Modal>






			<Modal
				isOpen={designationModal}



				onRequestClose={() => setDesignationModal(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className='admin_create_club '>
					<form className="modal_form bg-white shadow-md rounded px-8 w-96  pb-4 mb-2 mt-2 ml-2 mr-2">
						<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Enter Detailed Club Info</h1>



						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
								Name
							</label>
							<input className="shadow appearance-none border rounded ml-1 w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Enter Name"

								onChange={(e) => setDesignationName(e.target.value)}
							>
							</input>
						</div>



						<div className="mb-4 flex flex-row form_row ">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
								Designation Type
							</label>
							<select className="shadow appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => {
								setDesignationType(e.target.value);

							}}>
								<option>--- Select Designation ---</option>


								<option value="President">President</option>
								<option value="Secratary">Secratary</option>

								<option value="Vice president">Vice President</option>
								<option value="Tresasurer">Tresasurer</option>

							</select>


						</div>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
								Add Profile
							</label>


							<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
								onChange={(e) => setDesignationUpload(e.target.files[0])} />
						</div>








						<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
								onClick={addDesignation}
							>
								Add a designation
							</button>
							<p className='text-red-500'>
								{error4}
							</p>
							<p className='text-green-500'>
								{passMessage4}
							</p>

						</div>
					</form>
				</div>


			</Modal>





		</div>
	)
}

export default index