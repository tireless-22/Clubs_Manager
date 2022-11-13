import React,{useState} from 'react'
import { storage, getReceiptDownloadURL } from '../utils/firebase';

import Image from 'next/image';
import useSWRImmutable from 'swr/immutable';
import { getFetcher } from '../utils/swr_utils';
import Loading from '../components/loading';

const Temp = () => {

	// const [url, setUrl] = useState("");
	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getAll', getFetcher)
	console.log(clubData)
	let clubs;
	const urltemp = getReceiptDownloadURL("images/f51617ad-8de1-4d36-8230-4731dbb7e7fb").then((url) => {
		console.log(url)
	})
	console.log(clubData)

	if (clubData) {
		clubs = clubData.map((club) => {
			return (
				<div key={club.id}>
					<h1>{club.name}</h1>
					<Image src={urltemp} width={200} height={200} />
				</div>
			)
		})
	}

	return (
		<div>
			{clubs}
			</div>
	)


	

	// if (clubData) {
	// 	clubs = clubData.map(club => ({
	// 		...club,
	// 		url: getReceiptDownloadURL(club.fileUrl)
	// 			.then((url) => {

	// 			console.log(url)
	// 			return url
				
	// 		})
			
	// 	}))
	// }

	// if (clubData) {
		

		
	// 		clubData.items.forEach((item) => {
	// 			getDownloadURL(item.fileUrl).then((url) => {
	// 				setImageUrls((prev) => [...prev, url]);
	// 			});
	// 		});


	// }
	
	// console.log(clubData)




	// console.log(clubs)
	return<>hello</>


	if (clubData) {
		// console.log("clubs", clubData)
		// console.log("clubs", clubData[0].url)
		return
		(<>
			hello
		</>)
	
		return (
			<div>
				hello
			
				{clubData.map(club => {
					<Image src={club.url} width={200} height={200} />


				})}
		
				

			</div>
		)
	}

	return <div><Loading/></div>
}

export default Temp