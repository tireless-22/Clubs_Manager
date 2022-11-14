import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { getReceiptDownloadURL } from '../../../utils/firebase'

import { getDownloadURL } from 'firebase/storage'
import { data } from 'autoprefixer'

export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const clubs = await prisma.club.findMany({
		select: {
			name: true
		},

	})
	const data=[]


	for (let i = 0; i < clubs.length; i++) {
		if (clubs[i].name !== "All Clubs") {
			data.push(clubs[i]);
		}
		
	}


	res.status(200).json(data)
}