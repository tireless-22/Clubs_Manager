


const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gvpceallclubs@gmail.com',
		pass: 'rmieixubnwdpzssw'
	}
});




export default async function handler(
	req,
	res
) {

	const email = req.body.mailId;
	console.log(email)


	var mail = {
		from: 'gvpceallclubs@gmail.com',
		to: email,
		subject: "Reset you password by clicking on the link",
		text: `Reset you password by clicking on the link http://localhost:3000/verify?q=${email}`,
	}


	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				status: 'fail'
			})
		} else {
			res.json({
				status: 'success'
			})
		}
	})






	res.status(200).json("hello")


}



