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



	const mailId = req.query.mailId;



	const clubs = await prisma.userClub.findMany({
		where: {
			userId: mailId
		},

		include: {
			club: true
		}

		




	})
	console.log(clubs)
	const data = [];
	for (let i = 0; i < clubs.length; i++){
		data.push(clubs[i])
	}
	console.log(data);




	res.status(200).json(data)







}