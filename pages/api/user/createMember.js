import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)

	// club, mailId



	
	try {
		const user = await prisma.user.findUnique({
			where: {
				mailId: req.body.mailId
			}
		})

		if (!user) {
			const user = await prisma.user.create({
				data: {
					mailId: req.body.mailId,
					password: req.body.mailId

				},
			})
		}


		const userclub = await prisma.userClub.create({
			data: {
				clubId: req.body.clubId,
				userId: req.body.mailId,
				role: 1


			},
		})

		const userAllClub = await prisma.userClub.create({
			data: {
				clubId: "All Clubs",
				userId: req.body.mailId,
				role: 1


			},
		})




	}
	catch (e) {
		console.log(e)
	}






	res.status(200).json("added")


}



