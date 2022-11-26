import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { getReceiptDownloadURL } from '../../../utils/firebase'

import { getDownloadURL } from 'firebase/storage'

export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	let clubs = await prisma.club.findMany({
		where: {
			clubType: "Social Clubs",
			
		},
		include: {
			userClub: true,
			event: true
		}

	})

	clubs = clubs.filter(function (item) {
		return item.name !== "All Clubs"
	})

	res.status(200).json(clubs)
}



