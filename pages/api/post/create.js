import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const club = await prisma.event.create({
		data: {
			userId: req.body.userId,
			clubId:req.body.clubId,
			header: req.body.heading,
			paragraph: req.body.description,
			fileUrl: req.body.fileUrl,
			eventDate: req.body.eventDate,

		},
	})




	res.status(200).json(club)


}
