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
	console.log("from members url")



	const clubId = req.query.clubId;
	console.log(clubId)



	const users = await prisma.userClub.findMany({
		where: {
			clubId: clubId,
			
		},
		orderBy: {
			createdAt: 'asc'
		}


	})

	console.log("users", users)

	res.status(200).json(users)
}