import React, { useState, useEffect, useRef } from 'react'
import TopNav from '../../components/topNav'
import useSWRImmutable from 'swr/immutable';
import axios from 'axios';
import 'antd/dist/antd.css';
import Modal from 'react-modal';

import { getFetcher } from "../../utils/swr_utils"
import Image from 'next/image';
import Link from 'next/link';
import manageMemvers from "../../Images/manageMembers.png"
import addPostImage from "../../Images/addPost.png"

import { useRouter } from 'next/router';


import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from '../../utils/firebase';

import { v4 } from "uuid";



import InputEmoji from "react-input-emoji";

import Loading from '../../components/loading';
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
		console.log(localStorage.getItem("email"))
		localStorage.getItem("email") ? userMail = localStorage.getItem("email") : userMail = "null";

		userMail == "null" ? window.location.href = "/login" : console.log("user logged in")



		userMail = localStorage.getItem("email")
		console.log(userMail)
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


	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);


	const [error1, setError1] = useState("")
	const [passMessage1, setPassMessage1] = useState("")


	const [error2, setError2] = useState("")
	const [passMessage2, setPassMessage2] = useState("")





	useEffect(() => {
		onChatGrps()

	}, [club]);


	useEffect(() => {
		scrollToBottom();

	}, [messagesInGroup]);




	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getByManage?mailId=' + userMail, getFetcher);
	console.log(clubData)


	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}



	const onChatGrps = async () => {

		const res = await axios.get(
			`/api/message/getByClub?clubId=${club}`
		);
		setMessageInGroup(res.data);
		console.log(messagesInGroup)
	};

	const handleOnEnter = async () => {
		console.log(textBoxMessage)

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
		console.log(heading)
		console.log(postDescription)


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
					description: postDescription.trim(),
					fileUrl: fileUrl,
				})
					.then((response) => {
						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
				
				setPassMessage1("Post created successfully")



			});
		});







	};



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

					<p className='text-base mr-10 pt-3 text-white  ' onClick={() => window.location.href = '/admin'}>
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

					<div className="manage_main_div_right_top ">
						<div className="manage_main_div_right_top_left">
							<div className=' text-white text-xl'>

								{club}
							</div>
						</div>

						<div className="manage_main_div_right_top_right">
							<div className='manager_manage_div bg-red-200' onClick={() => {
								setManageMembers(true);
							}}>
								<Image src={manageMemvers} alt="manageMemvers" width={40} height={40} />
							</div>

							<div className='manager_manage_div bg-red-200' onClick={() => {
								setAddPost(true);
							}}>
								<Image src={addPostImage} alt="addPost" width={40} height={40} />
							</div>
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

			<Modal
				isOpen={manageMembers}

				onRequestClose={() => setManageMembers(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				hello this is for manage members
			</Modal>


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
								Heading
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Heading"

								onChange={(e) => setHeading(e.target.value)}
							>
							</input>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" for="Description">
								Post Description
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
		</div>
	)
}

export default index