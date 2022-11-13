import React from 'react'
import useSWRImmutable from 'swr/immutable';
import { useState, useEffect } from "react"
import Image from 'next/image';
import { getFetcher } from '../utils/swr_utils';



const temp = () => {

	const { data: clubs, error: clubsError } = useSWRImmutable('/api/club/getAll', getFetcher)
	console.log(clubs)




	return (
		<div>
			{
				clubs && clubs.map((club) => {
					return (
						<div>
							<h1>
								{club.name}
							</h1>
							<Image src="https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2Fde05aae1-54e0-4f3d-8e19-a87220731f81?alt=media"
								width={200}
								height={200} />
						</div>
					)
				})
			}






		</div>
	)
}

export default temp