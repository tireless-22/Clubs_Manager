import React from 'react'
import TopNav from '../../components/topNav'
import Axios from 'axios'
import useSWRImmutable from 'swr/immutable';
import { useState, useEffect } from "react"
import Image from 'next/image';
import { getFetcher } from '../../utils/swr_utils';
import { useRouter } from 'next/router';
import Loading from '../../components/loading'

import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from '../../utils/firebase';

import { v4 } from "uuid";
import axios from 'axios';


const admin = () => {
	const Router = useRouter();

	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);

	const [clubName, setClubName] = useState("");
	const [clubDescription, setClubDescription] = useState("");

	const [selectClub,setSelectClub] = useState("");

	const [mangerMail, setMangerMail] = useState("");

	


	const imagesListRef = ref(storage, "images/");


	const { data: clubNames, error: clubNamesError } = useSWRImmutable('/api/club/getNames', getFetcher)
	console.log(clubNames)



	
	

	const createManager = () => {
		console.log("manager created", mangerMail)
		console.log("club selected", selectClub)

		Axios.post("/api/user/createManager", {
			
			mailId: mangerMail.trim(),
			club: selectClub.trim()
			
		}).then((response) => {
			console.log(response.data);
		})
			.catch((error) => {
				console.log(error);
			});



	}


	const createClub = () => {

		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${v4()}`);

		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});
		const name = clubName;
		const description = clubDescription;
		let fileUrl = imageRef._location.path_;
		fileUrl = fileUrl.slice(7)
		Axios.post("/api/club/create", {
			name: name.trim(),
			description: description.trim(),
			fileUrl: fileUrl,
		}).then((response) => {
			console.log(response.data);
		})
			.catch((error) => {
				console.log(error);
			});
		Router.reload();
	};




	if (!clubNames) {
		return <Loading />
	}





	return (
		<div className="admin_main">
			<TopNav />
			<div className='admin' >
				<div className='admin_left'>
					<div className='admin_create_club'>
						<form className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
							<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Create a Club</h1>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="Club Name">
									Club Name
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Club Name" 
							
									onChange={(e) => setClubName(e.target.value)}
								>
								</input>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
									Club Description
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Descriptioin" type="text" placeholder="Club Description"
									onChange={(e) => setClubDescription(e.target.value)}
								>
								</input>
							</div>
							<div className="mb-4">
								<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
									onChange={(e) => setImageUpload(e.target.files[0])} />
							</div>
							<div className="flex items-center justify-between">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
									onClick={createClub}
								>
									Create a Club
								</button>
							</div>
						</form>
					</div>

					

					<div className='admin_create_manager'>
						<form className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
							<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Create a Manager</h1>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
									Manager Email
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Manager Email"
									onChange={(e) => setMangerMail(e.target.value)}
								>
								</input>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
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



							<div className="flex items-center justify-between">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
									onClick={createManager}
								>
									Create a Manager
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className='admin_right'>
				</div>
			</div>
		</div>

	)
}
export default admin