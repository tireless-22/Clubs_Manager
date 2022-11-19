import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TopNav from '../components/topNav'
import axios from 'axios'


const verify = () => {
	const router = useRouter()
	const { q } = router.query
	console.log(q)

	const [newPassword, setNewPassword] = useState("");
	const [reNewPassword, setReNewPassword] = useState("");

	const [error, setError] = React.useState('')
	const [passMessage, setPassMessage] = useState("")


	const change = () => {

		console.log(q)

		console.log(newPassword)
		console.log(reNewPassword)


		if (q == '' || newPassword === '' || reNewPassword === '') {
			setError('Please fill all the fields')
			return
		}

		else if (newPassword !== reNewPassword) {
			setError('Passwords do not match')
			return
		}
		else {
			setError("")
			axios.post("/api/user/forgotPassword", {

				mailId: q.trim(),
				newPassword: newPassword.trim()

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
					<h1 className='text-2xl items-center justify-center  font-sans font-semibold mt-4 mb-2'>Hi, {q}</h1>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Enter New Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter New Password"
							autocomplete="off"
							onChange={(e) => setNewPassword(e.target.value)}
						>
						</input>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							ReEnter New Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="text" placeholder="ReEnter New Password"
							autocomplete="off"
							onChange={(e) => setReNewPassword(e.target.value)}
						>
						</input>
					</div>

					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
							onClick={change}
						>
							CHANGE PASSWORD
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
							login ?

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

export default verify