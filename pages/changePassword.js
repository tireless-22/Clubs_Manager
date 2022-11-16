import React, { useState } from 'react'
import TopNav from '../components/topNav'
import axios from 'axios'


const changePassword = () => {

	const [email, setEmail] = React.useState('')
	const [passwrord, setPassword] = React.useState('')
	const [newPassword, setNewPassword] = React.useState('')
	const [newPassword1, setNewPassword1] = React.useState('')



	const [error, setError] = React.useState('')
	const [passMessage,setPassMessage]=useState("")





	const change = () => {

		console.log(email)
		console.log(passwrord)
		console.log(newPassword)
		console.log(newPassword1)


		if (email === '' || passwrord === '' || newPassword === '' || newPassword1 === '') {
			setError('Please fill all the fields')
			return
		}

		else if (newPassword !== newPassword1) {
			setError('Passwords do not match')
			return
		}
		else {
			setError("")
			axios.post("/api/user/changePassword", {

				mailId: email.trim(),
				password: passwrord.trim(),
				newPassword: newPassword.trim(),
				newPassword1: newPassword1.trim()

			}).then((response) => {
				console.log("response data", response.data);
				if (response.data === "false") {
					console.log("error")
					setError("User not found")


				}
				else {
					console.log("user logged in")
					setPassMessage("Password changed successfully")
					
					window.location.href = "/login"
					
				}

			})
				.catch((error) => {
					console.log(error);
				});
			
			setError("")




			

		}


		
	}

	


	return (
		<div>
			<TopNav />

			<div className="flex items-center justify-center h-screen ">

				<form className="bg-white shadow-md rounded px-8 w-2/6  pb-4 mb-2 mt-2 ml-4 mr-4">
					<h1 className='text-2xl items-center justify-center  font-sans font-semibold mt-4 mb-2'>Change Password</h1>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Gmail
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
							onChange={(e) => setEmail(e.target.value)}
						>
						</input>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Current Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="text" placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						>
						</input>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Enter New Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="text" placeholder="Password"
							onChange={(e) => setNewPassword(e.target.value)}
						>
						</input>
					</div>


					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							ReEnter New Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="text" placeholder="Password"
							onChange={(e) => setNewPassword1(e.target.value)}
						>
						</input>
					</div>




					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
							onClick={change}
						>
							SUBMIT
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

export default changePassword