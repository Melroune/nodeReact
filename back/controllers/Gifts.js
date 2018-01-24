var fs = require('fs');
var nodemailer = require('nodemailer');

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}

function createFileOrFillEmptyFile(req, res) {
	newGift ={"index":0, "name" : req.body.name};
	fs.writeFileSync('./data/gift.json', JSON.stringify([newGift]), (err, data) => {
			if (err) throw err;
		});
		res.status(200).send('gift created')
}

const Gifts = {
    create: (req, res, next) => {
		if (!fs.existsSync('./data/gift.json')) {
			createFileOrFillEmptyFile(req, res);
		} else {

		var data = fs.readFile('./data/gift.json', (err, data) => {
			if (err) throw err;
			if(!validateJSON(data)){
				createFileOrFillEmptyFile(req, res);
			} else{
				var arr = JSON.parse(data);
				newGift ={"index": arr.length, "name" : req.body.name};
				arr.push(newGift)
			fs.writeFileSync('./data/gift.json', JSON.stringify(arr), (err, data) => {
				if (err) throw err;

			});
			 res.status(200).send(arr)

		}
	}
	);
}
		// var newData = {...data, {"index":req.body.index, "name" : req.body.name} }
	},

    read: (req, res, next) => {
		console.log('ace')
		var data = fs.readFile('./data/gift.json', (err, data) => {
			if (err) throw err;
			res.status(200).send(JSON.parse(data))
			}
		);
    },
    delete: (req, res, next) => {
		var data = fs.readFile('./data/gift.json', (err, data) => {
			if (err) throw err;
			var arr = JSON.parse(data);
			arr.splice(req.body.index, 1)
			fs.writeFileSync('./data/gift.json', JSON.stringify(arr), (err, data) => {
				if (err) throw err;
			});
			res.status(200).send(arr)
			}
		);
    },
    notify: async (req, res, next) => {
		console.log(req.body.list)

	let transporter = await nodemailer.createTransport('smtps://kerkebtest@gmail.com:Anivia31@smtp.gmail.com')

		var mailOptions = {
		    from: '"Kerkeb Abdou" <kerkebtest@gmail.com>', // sender address
		    to: 'florian@wildcodeschool.fr', // list of receivers
		    subject: 'Hello I Want My Gifts',
		    text: "Where are my gifts ? \n"+req.body.list+"\n Kerkeb Abdou",
		    html: '<b>Where are my gifts ? <br/>'+req.body.list+' <br/> Kerkeb Abdou</b>' // html body
		};

		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
    }
}

module.exports = Gifts;
