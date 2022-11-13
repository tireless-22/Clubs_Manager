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



	const messages = await prisma.message.findMany({
		where: {
			mailId: mailId
		}


	})



	res.status(200).json(messages)







}