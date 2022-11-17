import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.query.club)
	console.log(req.query.user)


	const user = await prisma.userClub.findFirst({
		where: {
			clubId: req.query.club,
			userId: req.query.user

		}
	})

	console.log("userInfo",user)

	// res.send("helo")

	res.status(200).json(user)


}



