/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
const request = require("request");
const cheerio = require("cheerio");
module.exports = function(msg, client, args) {
	let users = msg.mentions.users.array();
	if (!users || users.length < 1) {
		msg.reply("<.< Please supply two users to ship");
		return;
	}
	msg.channel.startTyping();
	let name1 = users[0].username;
	let id1 = users[0].id;
	let name2 = users.length > 1 ? users[1].username : msg.author.username;
	let id2 = users.length > 1 ? users[1].id : msg.author.id;
	request({
    url: "https://www.lovecalculator.com/love.php?name1=" + encodeURIComponent(name1) + "&name2=" + encodeURIComponent(name2),
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.39 Safari/537.36"
    }
  }, function (err, resp, body) {
	  let $ = cheerio.load(body);
		let e = $('div[class="result__score"]').text();
		if (!e) {
			msg.reply(">.> API error\n```" + e + "```");
			msg.channel.stopTyping();
			return;
		}
      let percent = e.match(/\d+/)[0] + "%";
	    let numper = parseInt(e.match(/\d+/)[0], 10);
      if (
        (id1 == 579413130506010654 || id1 == 299708692129906692)
        &&
        (id2 == 299708692129906692 || id2 == 579413130506010654)
      ) {
        percent = "100%";
        numper = "100";
      }
      let cname = "error";
      let vowels = "AaEeIiOoUuYy";
      let lovemsg = "";
      if (vowels.includes(name2.charAt(0))) {
        cname = name1.charAt(0) + name2.charAt(0).toLowerCase() + name2.substr(1);
      } else {
        cname = name1.charAt(0) + name2.substr(1);
      }
	    if (numper > 95) {
        lovemsg = "It's true love.";
      }  else if (numper > 90) {
        lovemsg = "Just date already!";
      }  else if (numper > 80) {
        lovemsg = "Just kiss already!";
      }  else if (numper > 70) {
        lovemsg = "Things are getting spicy.";
      }  else if (numper > 60) {
        lovemsg = "Ooooooo!";
      } else if (numper > 70) {
        lovemsg = "Ouch.";
      }  else  if (numper > 50) {
        lovemsg = "Rough patch.";
      }  else  if (numper > 30) {
        lovemsg = "It's gonna take some work.";
      }  else if (numper < 30) {
        lovemsg = "Good luck.";
      }  else if (numper < 20) {
        lovemsg = "Not gonna happen.";
      }  else if (numper < 10) {
        lovemsg = "Oofie.";
      }  else {
        lovemsg = "It wasn't meant to be.";
      }
      msg.channel.send((numper < 50 ? ":broken_heart:" : ":heart:") + " The love between `" + name1 + "` and `" + name2 + "` (`" + cname + "`) is " + percent + "\n" + lovemsg);
	    msg.channel.stopTyping();
	});
}