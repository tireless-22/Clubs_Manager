import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { getReceiptDownloadURL } from '../../../utils/firebase'
import moment from 'moment'
import { getDownloadURL } from 'firebase/storage'

export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)



	const name = req.query.clubId;



	const messages = await prisma.event.findMany({
		where: {
			clubId: name,
			eventDate: {
				lte: moment().startOf('day').toDate(),

			},
		},
		orderBy: {
			eventDate: 'asc'
		}



	})



	res.status(200).json(messages)







}