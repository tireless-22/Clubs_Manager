
import { useState, useEffect } from "react";
import {
	ref,
	uploadBytes,
	getDownloadURL,

} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";

function App() {
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);

	const imagesListRef = ref(storage, "images/");
	
	const uploadFile = () => {
		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${v4()}`);
		
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});

		console.log(imageRef);
		console.log(imageRef._location);
		console.log(imageUrls);
	};

	

	return (
		<div className="App">
			<input
				type="file"
				onChange={(event) => {
					setImageUpload(event.target.files[0]);
				}}
			/>
			<button onClick={uploadFile}> Upload Image</button>
			
		</div>
	);
}

export default App;