import React, { useState, useEffect } from 'react'
import TopNav from '../components/topNav'
import axios from 'axios'

// number: sessionStorage.getItem("number"),
// sessionStorage.setItem("number", res.data);
// sessionStorage.removeItem("number");

// Login system with tailwind css


const temp = () => {

	const [email, setEmail] = React.useState('')
	const [passwrord, setPassword] = React.useState('')


	const [error, setError] = React.useState('')
	const [passMessage, setPassMessage] = useState("")
	const login = () => {
		setError("")
		setPassMessage("")
		console.log("from login")
		console.log(email)
		console.log(passwrord)

		if (email === '' || passwrord === '' ) {
			setError('Please fill all the fields')
			return
		}

		axios.post("/api/user/login", {

			mailId: email.trim(),
			password: passwrord.trim()

		}).then((response) => {
			console.log("response data", response.data);
			if (response.data === "false") {
				console.log("error")
				setError("Invalid Credentials")


			}
			else {
				console.log("user logged in")
				localStorage.setItem("email", email);
				setPassMessage("Login Successfull")
				if (email == "admin") {
					window.location.href = "/admin"
				}
				else {
					window.location.href = "/manager_member"
				}
			}

		})
			.catch((error) => {
				console.log(error);
			});


	}


	return (
		<div>
			<TopNav />
		
			<div className="flex items-center justify-center h-screen ">

				<form className="bg-white shadow-md rounded px-8 w-2/6  pb-4 mb-2 mt-2 ml-4 mr-4">
					<h1 className='text-2xl items-center justify-center  font-sans font-semibold mt-4 mb-2'>Login</h1>
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
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
							Password
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="password" placeholder="Password"
							autocomplete="off"
							onChange={(e) => setPassword(e.target.value)}
						>
						</input>
					</div>

					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
							
							onClick={login}
						>
							LOGIN
						</button>
						<p className='text-red-500'>
							{error}
						</p>
						<p className='text-green-500'>
							{passMessage}
						</p>
					</div>
					<div className="flex items-center justify-around auth_button_div">
						<div className='text-blue-500' onClick={() => window.location.href = '/forgotPassword'}>
							Forgot Password ?

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

export default temp