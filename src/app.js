import express from 'express'
import cors from "cors"

const server = express()
server.use(express.json())
server.use(cors())
const PORT = 5000

let users = []
let tweets = []

server.listen(PORT, () => {
  console.log('Im a server')
})

//passa os tweets
server.get("/tweets", (request, response) => {
  console.log("get tweets")
  tweets.reverse()

  if (tweets.length > 10) {
    tweets.length = 10
  }

  response.send(tweets)
  tweets.reverse()
})

//salva os tweets
server.post('/tweets', (request, response) => {
  console.log("post tweets")
  const tweet =
  {
    username: "",
    avatar: "",
    tweet: ""
  }

  tweet.username = request.headers.user
  tweet.avatar = users[users.length - 1].avatar
  tweet.tweet = request.body.tweet

	if (!users.some((user) => user.username === tweet.username)) {
		return response.status(401).send("UNAUTHORIZED")
	}

  if (!tweet.username || !tweet.avatar || !tweet.tweet) {
    return response.status(422).send("Unprocessable Entity")
  }

  if (!users.find(user => user.username === tweet.username)) {
    return response.status(401).send("UNAUTHORIZED")
  }

  tweets.push(tweet)
  response.status(200).send("OK")  
})

//faz login
server.post('/sign-up', (request, response) => {
  console.log("post sign-up")
  const people = request.body
  if (people === '') {
	  response.status(422).send('Unprocessable Entity')
    return;
	}
  users.push(people)
  response.sendStatus(201)
})