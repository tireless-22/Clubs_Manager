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

	// console.log(moment().startOf('day').toDate())



	const { start, end } = req.query;
	
	console.log(start)
	console.log(end)

	const events = await prisma.event.findMany({
		where: {
			eventDate: {
				gte: new Date(start),
				lte: new Date(end)
			}
		},
		orderBy: {
			eventDate: 'asc'
		}

	})



res.status(200).json(events)







}