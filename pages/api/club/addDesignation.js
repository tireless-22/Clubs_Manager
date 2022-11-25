import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)



	const ifExist = await prisma.designation.findUnique({
		where: {
			designationType: req.body.designationType
		},
	})

	// console.log(ifExist.id);

	if (ifExist.id) {
		console.log("hellow there")
		const designation = await prisma.designation.update({
			where: {
				designationType: req.body.designationType,
			},
			data: {
				name: req.body.name,
				fileUrl: req.body.fileUrl,
				clubId: req.body.club,
			},
		})

		res.status(200).json(designation)

	}
	else {
		const designation = await prisma.designation.create({

			data: {
				name: req.body.name,
				fileUrl: req.body.fileUrl,
				designationType: req.body.designationType,
				clubId: req.body.club,
			},
		})


	
	}








}



