import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import TopNav from '../components/topNav'






const ForgotPassword = () => {
	

	const [email, setEmail] = React.useState('')

	const [error, setError] = React.useState('')
	const [passMessage, setPassMessage] = useState("")






	const forgot = () => {
		setError("")
		setPassMessage("")

		console.log(email)
		const data=""
		axios.post("/api/user/existOrNot", {

			mailId: email.trim(),
		
		})
			.then((res) => {
				if (res.data === "true") {

					axios.post("/api/mail/forgot", {	
						mailId: email.trim(),
					})
					setPassMessage("Password reset link sent to your mail")
					
					
				}
				else {
					setError("User not found")
					return;
				}

			
		}).catch((err) => {
			console.log(err)
		})
		console.log()
	



	}
		







	return (
		<div>
			<TopNav />

			<div className="flex items-center justify-center h-screen ">

				<form className="bg-white shadow-md rounded px-8 w-2/6  pb-4 mb-2 mt-2 ml-4 mr-4">
					<h1 className='text-2xl items-center justify-center  font-sans font-semibold mt-4 mb-2'>Forgot Password</h1>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Gmail
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
							autocomplete="off"
							onChange={(e) => setEmail(e.target.value)}
						>
						</input>
					</div>
					

					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
							onClick={forgot}
						>

							Send Mail
						</button>

						<p className='text-red-500'>
							{error}
						</p>
						<p className='text-green-500'>
							{passMessage}
						</p>
					</div>


					<div className="flex items-center justify-around auth_button_div">
						<div className='text-blue-500' onClick={() => window.location.href = '/login'}>
							Login ?

						</div>

						<div className='text-blue-500' onClick={() => window.location.href = '/changePassword'}>
							Change Password ?


						</div>




					</div>
				</form>
			</div>



		</div>
	)
}

export default ForgotPassword