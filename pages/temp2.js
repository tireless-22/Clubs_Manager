import React from 'react'

const temp2 = () => {

	if (typeof window !== 'undefined') {
		console.log(localStorage.getItem("email"))
	}
	return (
		<div>temp2</div>
	)
}

export default temp2