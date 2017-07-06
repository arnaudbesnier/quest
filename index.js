const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

const SLACK_CLIENT_ID = '209661177494.208984180532';
const SLACK_CLIENT_SECRET = '85855650f79a825cfb5baf031d9417c3';


var web = new WebClient('xoxp-209661177494-208928105058-209760839750-4ff2828633e0ee39e184984e7ca3e19c');




// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/slack/oauth', function (req, res) {
  console.log('=============== install');
  const { code } = req.query;

  new WebClient().oauth.access(
    SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET,
    code
  ).then((data) => {
    // const {
    //   user_id: userId,
    //   team_id: teamId,
    //   team_name: teamName,
    // bot,
    console.log('token:', data);
  });

  // const team = await Team.findOneAndUpdate(
  //   { teamId },
  //   {
  //     $set: { userId, teamId, teamName, bot },
  //   },
  //   { upsert: true }
  // );



  // const web = new WebClient(bot.bot_access_token);
  // const message =
  //   'SlapSnack has been installed on your team!\n' +
  //   'Try `/slapsnack @user hey!` to send your first snap and tell your colleagues about it :tada:';

  // web.chat.postMessage(userId, message, { as_user: true });
  // return res.redirect(process.env.FRONTEND_URL);
});




app.post('/', function (req, res) {
  const data = req.body;
  console.log(data);

  const index = data.text.indexOf(' ');
  const sentence = 'Tu a lancé la quest: "' +
    data.text.slice(index+1) + '" pour ' + data.text.slice(0, index+1) +
    ' briqs.';

  web.chat.postMessage('#general', sentence, function(err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });

  res.send(sentence);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// https://briq-staging.herokuapp.com/app
//
// https://briq-staging.herokuapp.com/v0
//
// // Client ID
// 209661177494.208984180532
// // Client Secret
// 85855650f79a825cfb5baf031d9417c3
// // Verification Token
// adKGseWFWrfcW0Xk1NCoRHXZ
