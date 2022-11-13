import React from 'react'
import TopNav from '../../components/topNav'
import Axios from 'axios'

import { useState, useEffect } from "react";
import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from '../../utils/firebase';

import { v4 } from "uuid";


const admin = () => {

	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);

	const [clubName, setClubName] = useState("");
	const [clubDescription, setClubDescription] = useState("");


	const imagesListRef = ref(storage, "images/");



	const createClub = () => {
		console.log(clubName);
		console.log(clubDescription)



		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${v4()}`);

		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});

		// console.log(imageRef);
		// console.log(imageRef._location.path_);
		// console.log(imageUrls);

		const name = clubName;
		const description = clubDescription;
		const fileUrl = imageRef._location.path_;
		
		Axios.post("/api/club/create", {
			name: name,
			description: description,
			fileUrl: fileUrl,
		}).then((response) => {
			console.log(response.data);
		})
			.catch((error) => {
				console.log(error);
			});
				
				
				

	};





	return (
		<div className="admin_main">
			<TopNav />
			<div className='admin' >
				<div className='admin_left'>
					<div className='admin_create_club'>

					
						<form className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-4 mr-4">
							<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Create a Club</h1>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
									Club Name
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
									onChange={(e) => setClubName(e.target.value)} 
								
								>
									</input>
							</div>


							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
									Club Description
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
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

					{/* <div classNameName='admin_create_manager'>

						<h1 classNameName='text-2xl  font-sans ml-4 font-semibold mt-4'>Create Manager</h1>
						<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-2 ml-4 mr-4">
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
									Club Name
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
								</input>
							</div>

							<div className="flex items-center justify-between">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
									Create a Club
								</button>

							</div>
						</form>


					</div> */}

				</div>
				<div className='admin_right'>
				</div>
			</div>
		</div>

	)
}
export default admin