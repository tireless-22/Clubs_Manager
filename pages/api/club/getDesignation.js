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







	const designations = await prisma.designation.findMany({
		where: {
			clubId: req.query.club
		}


	})
	

	res.status(200).json(designations)



}