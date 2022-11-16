import React, { useState } from "react";
import axios from "axios";

function App() {
	const [baseImage, setBaseImage] = useState("");



	const uploadImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setBaseImage(base64);
	};



	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};



	const createClub = () => {
		// setError("")

		// if (imageUpload == null || clubName === '' || clubDescription === '') {
		// 	setError('Please fill all the fields')
		// 	return;
		// }

		// const imageRef = ref(storage, `images/${v4()}`);

		// uploadBytes(imageRef, imageUpload).then((snapshot) => {
		// 	getDownloadURL(snapshot.ref).then((url) => {
		// 		setImageUrls((prev) => [...prev, url]);
		// 		console.log(setImageUrls)
		// 	});
		// });
		// const name = clubName;
		// const description = clubDescription;

		// let fileUrl = imageRef._location.path_;
		// fileUrl = fileUrl.slice(7)

		axios.post("/api/club/create", {
			name: "karthik",
			description: "hello this is ",
			fileUrl: baseImage,
		}).then((response) => {
			console.log(response.data);
			setPassMessage("Club created successfully")
			Router.reload();
		})
			.catch((error) => {
				console.log(error);
			});

	};




	return (
		<div className="App">
			<input
				type="file"
				onChange={(e) => {
					uploadImage(e);
				}}
			/>

			<br></br>
			<img src={baseImage} height="200px" />
			<button
				onClick={() => {
					createClub();
				}}
			>
				Submit
			</button>
		</div>
	);
}

export default App;