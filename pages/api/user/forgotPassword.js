import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")

	const mailId = req.body.mailId;

	const newPassword = req.body.newPassword;

	console.log(mailId)
	console.log(newPassword)


	const updateUser = await prisma.user.update({
		where: {
			mailId: mailId,
		},
		data: {
			password: newPassword,
		},
	})

	res.json("true")
	




	

}

