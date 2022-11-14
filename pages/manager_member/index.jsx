import React, { useState, useEffect,useRef } from 'react'
import TopNav from '../../components/topNav'
import useSWRImmutable from 'swr/immutable';
import axios from 'axios';

import { getFetcher } from "../../utils/swr_utils"
import Image from 'next/image';
import Link from 'next/link';
import InputEmoji from "react-input-emoji";


const index = () => {
	const messagesEndRef = useRef(null);
	const userMail = "19131a0497@gvpce.ac.in";
	const [club, setClub] = React.useState("AllClubs");
	const [messagesInGroup, setMessageInGroup] = useState([]);
	const [textBoxMessage, setTextBoxMessage] = useState("");

	useEffect(() => {
		onChatGrps()

	}, []);
	

	useEffect(() => {
		scrollToBottom();
	}, [messagesInGroup]);


	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getByManage?mailId=' + userMail, getFetcher);

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

	console.log(clubData);
	console.log(messagesInGroup);




	if (clubDataError) return <div>failed to load</div>
	if (!clubData) return <div>loading...</div>



	return (
		<div className='index_main'>
			<TopNav />
			<div className="manage_main_div">
				
				<div className="manage_main_div_left">

					<aside className="w-64 mt-1 ml-1 mr-1" aria-label="Sidebar">
						<div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-700">
							<ul className="space-y-2">

								{clubData.map((club) => (
									<li onClick={() => {
										setClub(club);
										onChatGrps();
									}} >
										<div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-500  dark:hover:bg-gray-400">
											<span className="ml-3">{club}</span>

										</div>
									</li>

								))}
							</ul>
						</div>
					</aside>
				</div>


				<div className='manage_main_div_right'>

					<div className="manage_main_div_right_top ">
						hello right top



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

		</div>
	)
}

export default index