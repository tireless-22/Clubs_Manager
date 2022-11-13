import React from 'react'
import TopNav from '../../components/topNav'
import useSWRImmutable from 'swr/immutable';


import { getFetcher } from "../../utils/swr_utils"
import Image from 'next/image';
import Link from 'next/link';
import InputEmoji from "react-input-emoji";


const index = () => {
	const userMail = "karthiknaveen22022002@gmail.com";
	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getByManage?mailId=' + userMail, getFetcher)

	console.log(clubData);
	// hard coded for now

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
									<li >
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
				




					</div>
					<div className="manage_main_div_right_bottom">
						<InputEmoji
							// value={textBoxMessage}
							// onChange={setTextBoxMessage}
							cleanOnEnter
							// onEnter={handleOnEnter}
							placeholder="Type a message"
						/>



					</div>

				</div>




			</div>

		</div>
	)
}

export default index