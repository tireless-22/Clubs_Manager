import React from 'react'

const addPost = () => {
	return (
		<div className='admin_create_club w-96'>
			<form className="bg-white shadow-md rounded px-8  pb-4 mb-2 mt-2 ml-2 mr-2">
				<h1 className='text-2xl  font-sans font-semibold mt-4 mb-2'> Create a Post</h1>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" for="Heading">
						Heading
					</label>
					<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Name" type="text" placeholder="Heading"

						onChange={(e) => setHeading(e.target.value)}
					>
					</input>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" for="Description">
						Post Description
					</label>
					<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Club Descriptioin" type="text" placeholder="Post Description"
						onChange={(e) => setPostDescription(e.target.value)}
					>
					</input>
				</div>
				<div className="mb-4">
					<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
						onChange={(e) => setImageUpload(e.target.files[0])} />
				</div>
				<div className="flex items-center justify-between">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
						onClick={createPost}
					>
						Create a Club
					</button>
					<p className='text-red-500'>
						{error1}
					</p>
					<p className='text-green-500'>
						{passMessage1}
					</p>

				</div>
			</form>
		</div>
		





	)
}

export default addPost