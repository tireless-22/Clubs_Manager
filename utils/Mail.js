var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gvpceallclubs@gmail.com',
		pass: 'rmieixubnwdpzssw'
	}
});



var mailOptions = {
	from: 'gvpceallclubs@gmail.com',
	to: ['19131a0498@gvpce.ac.in', '19131a04b8@gvpce.ac.in','19131a04a1@gvpce.ac.in'],
	subject: 'Sending Email using Node.js',
	text: 'fgcgcvjh jbjlbljb',
	html: `<h1>yes club have to stop from the next year, Inform this to all the club memeber</h1>`
};





	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
