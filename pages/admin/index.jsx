import React from 'react'
// import TopNav from '../../components/topNav'
import Axios from 'axios'
import useSWRImmutable from 'swr/immutable';
import { useState, useEffect } from "react"
import Image from 'next/image';
import { getFetcher } from '../../utils/swr_utils';
import { useRouter } from 'next/router';
import Loading from '../../components/loading'
import MainFooter from '../../components/mainFooter';
import uploadButton from "../../Images/uploadButton.svg"
import logo from "../../Images/logo.png"


import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from '../../utils/firebase';

import { v4 } from "uuid";
import axios from 'axios';


const admin = () => {

	let userMail = ""

	if (typeof window !== 'undefined') {
		console.log(localStorage.getItem("email"))
		localStorage.getItem("email") ? userMail = localStorage.getItem("email") : userMail = "null";

		userMail == "null" ? window.location.href = "/login" : console.log("user logged in")



		userMail = localStorage.getItem("email")

	}



	const Router = useRouter();

	const [imageUpload, setImageUpload] = useState(null);


	const [clubName, setClubName] = useState("");
	const [clubDescription, setClubDescription] = useState("");

	const [selectClub, setSelectClub] = useState("");

	const [mangerMail, setMangerMail] = useState("");


	const [error, setError] = React.useState('')
	const [passMessage, setPassMessage] = useState("")


	const [error1, setError1] = useState("")
	const [passMessage1, setPassMessage1] = useState("")

	const [clubType, setClubType] = useState("")

	const imagesListRef = ref(storage, "images/");


	const { data: clubNames, error: clubNamesError } = useSWRImmutable('/api/club/getNames', getFetcher)
	console.log(clubNames)



	const createManager = () => {
		setPassMessage1("")
		setError1("")
		console.log("manager created", mangerMail)
		console.log("club selected", selectClub)
		if (mangerMail == "" || selectClub == "") {
			setError1("Please fill all the fields")
			return;
		}

		Axios.post("/api/user/createManager", {

			mailId: mangerMail.trim(),
			club: selectClub.trim()

		}).then((response) => {
			console.log(response.data);

			Axios.post("/api/mail/userAdded", {
				mailId: mangerMail.trim(),
				type: "manager",
				club: selectClub.trim()
			}).then((response) => {
				console.log(response.data);
			}).catch((error) => {
				console.log(error);
			});

			setPassMessage1("Manager Created, Ask the manager to check his mail for login credentials")







			// Router.reload();
		})
			.catch((error) => {
				console.log(error);
			});

	}



	const createClub = () => {
		setError("")


		if (imageUpload == null || clubName === '' || clubType === '') {
			setError('Please fill all the fields')
			return;
		}


		const imageRef = ref(storage, `images/${v4()}`);


		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {

				const name = clubName;
				const description = clubDescription;
				console.log(url)


				let fileUrl = imageRef._location.path_;
				fileUrl = fileUrl.slice(7)




				Axios.post("/api/club/create", {
					name: name.trim(),
					clubType: clubType.trim(),
					fileUrl: fileUrl,
				}).then((response) => {
					console.log(response.data);
					setPassMessage("Club created successfully")
					Router.reload();
				})
					.catch((error) => {
						console.log(error);
					});

			});
		});
	};


	if (!clubNames) {
		return <Loading />
	}



	return (
		<div className="admin_main">

			<div className='topNav dark:bg-gray-900'>
				<div className='leftNav'>
					<div className='logoDiv2'>

						<Image src={logo} width={50} height={50} className="logo_image" />

					</div>
					<p className='text-2xl text-white ml-8 '>
						GVP Community
					</p>
					<Image src="https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images/rotract.png2572652a-be20-4153-bb95-4f9fd40477dc" width={100} height={100} />
				</div>
				<div className='rightNav'>
					<p className='text-base text-white mr-10' onClick={() => window.location.href = '/'}>
						Clubs
					</p>

					<p className='text-base text-white  mr-10' onClick={() => window.location.href = '/admin'}>
						Admin
					</p>
					<p className='text-base text-white bg-blue-700 pt-2 pb-2 pl-2 pr-2  mr-10' onClick={
						() => {
							localStorage.removeItem("email");
							window.location.href = "/"
						}
					}>
						logout
					</p>

				</div>

			</div>





			<div className='admin mt-12 mb-12'>

				<div className='admin_create_club'>
					<form className=" px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
						<div className='flex_center'>

							<h1 className=' f36 font-sans font-semibold mt-6 mb-2'> <u>Create a Club</u></h1>

						</div>
						<div className="mb-6 mt-4">
							<label className="block text-gray-700 text-base font-bold mb-2" for="Club Name">
								Club Name
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Club Name"

								onChange={(e) => setClubName(e.target.value)}
							>
							</input>
						</div>


						<div className="mb-6 ">
							<label className="block text-gray-700 text-base font-bold mb-2" for="username">
								Club Type
							</label>
							<select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => {
								setClubType(e.target.value);
							}}>
								<option>--- Select Club Type ---</option>


								<option value="Technical Clubs">Technical Clubs</option>
								<option value="Social Clubs">Social Clubs</option>
								<option value="All Clubs">All Clubs</option>


							</select>


						</div>


						<div className="mb-6">
							<label className="block text-gray-700 text-base font-bold mb-2" for="username">
								Upload Logo
							</label>



							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file_input" type="file"
								onChange={(e) => setImageUpload(e.target.files[0])} />
							
					
						</div>



						<div className="flex items-center justify-between">
							<button className="bg-white blue-font   font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
								onClick={createClub}
							>
								Create a Club
							</button>
							<p className='text-red-500'>
								{error}
							</p>
							<p className='text-green-500'>
								{passMessage}
							</p>
						</div>
					</form>
				</div>









				<div className='admin_create_manager '>
					<form className=" px-8  pb-4 mb-2 mt-2 ml-4 mr-4">

						<div className='flex_center'>

					
							<h1 className=' f36 font-sans font-semibold mt-6 mb-2'> <u>Create a Manager</u></h1>

						</div>





						<div className="mb-6 mt-4">
							<label className="block text-gray-700 text-base font-bold mb-2" for="username">
								Manager Email
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Manager Email"
								onChange={(e) => setMangerMail(e.target.value)}
							>
							</input>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 text-base font-bold mb-2" for="username">
								Select Club
							</label>
							<select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => {
								setSelectClub(e.target.value);
							}}>
								<option>---Select Club---</option>
								{clubNames.map((option) => (

									<option value={option.name}>{option.name}</option>
								))}
							</select>
						</div>

						<div className="flex items-center justify-between mt-8">
							<button className="blue-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
								onClick={createManager}
							>
								Create a Manager
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

			</div>



			<MainFooter />


		</div>

	)
}
export default admin