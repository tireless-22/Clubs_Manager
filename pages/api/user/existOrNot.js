import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")



	const user = await prisma.user.findFirst({
		where: {
			name: req.body.mailId
		}
	})

	if (!user) {
		res.json("false").status(200);
		

	}
	else {

		res.json("true").status(200);
		

	}


	// res.send("helo")

	res.status(200).json(club)


}



