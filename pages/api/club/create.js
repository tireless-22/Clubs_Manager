import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const club = await prisma.club.create({
		data: {
			name: req.body.name,
			clubType:req.body.clubType,
			fileUrl: req.body.fileUrl,
			
		},
	})




	res.status(200).json(club)


}



