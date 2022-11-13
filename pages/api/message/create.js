import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	try {
	

		const msg = await prisma.message.create({
			data: {
				clubId: req.body.club,
				userId: req.body.mailId,
				description:req.body.description


			},
		})
	}
	catch (e) {
		console.log(e)
	}




	
	res.status(200).json(msg)


}



