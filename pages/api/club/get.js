import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const club = await prisma.club.findFirst({
		where: {
			name: req.body.name
		}
	})


	// res.send("helo")

	res.status(200).json(club)


}



