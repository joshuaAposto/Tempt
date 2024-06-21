const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const loveLifeMessages = [
  "Love is not about how much you say 'I love you', but how much you prove that it's true.",
  "The best thing to hold onto in life is each other.",
  "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
  "Love isn't something you find. Love is something that finds you.",
  "The best love is the kind that awakens the soul.",
  "You are my today and all of my tomorrows.",
  "I love you more than I have ever found a way to say to you.",
  "You make me want to be a better man.",
  "To love and be loved is to feel the sun from both sides.",
  "I would rather spend one lifetime with you, than face all the ages of this world alone.",
  "Love is composed of a single soul inhabiting two bodies.",
  "We loved with a love that was more than love.",
  "You are the source of my joy, the center of my world, and the whole of my heart.",
  "I look at you and see the rest of my life in front of my eyes.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "My love for you is a journey; starting at forever, and ending at never.",
  "You have bewitched me, body and soul, and I love, I love, I love you.",
  "There is no charm equal to tenderness of heart.",
  "You are my heart, my life, my one and only thought.",
  "If I know what love is, it is because of you."
];

const tagalogInsults = [
  "Tangina mo!",
  "Ulol ka!",
  "Bobo mo!",
  "Tarantado ka!",
  "Leche ka!",
  "Peste ka!",
  "Tanga ka!",
  "Hudas ka!",
  "Walang hiya ka!",
  "Lintik ka!",
  "Gago ka!",
  "Bwesit ka!",
  "Gunggong!",
  "Pakyu ka!",
  "Salot ka!",
  "Animal ka!",
  "Hangal ka!",
  "Sira ulo ka!",
  "Hayop ka!",
  "Luko-luko ka!"
];

const confessionMessages = [
  "I've had a crush on you for the longest time.",
  "I miss you more than you could possibly imagine.",
  "I still think about the time we spent together.",
  "I've never felt this way about anyone before.",
  "You make my heart skip a beat.",
  "I wish I could tell you how I really feel.",
  "I've been keeping a secret from you.",
  "I love the way you smile.",
  "You are always on my mind.",
  "I've always admired your kindness.",
  "You inspire me to be a better person.",
  "I've never stopped loving you.",
  "Every moment with you is a treasure.",
  "You are the first thing I think about in the morning.",
  "I want to be with you more than anything.",
  "I've been hiding my feelings for you.",
  "You are the light of my life.",
  "My heart belongs to you.",
  "I can't imagine my life without you.",
  "You mean everything to me."
];

function getRandomMessage(category) {
  let messages;
  if (category === 'love') {
    messages = loveLifeMessages;
  } else if (category === 'insult') {
    messages = tagalogInsults;
  } else if (category === 'confess') {
    messages = confessionMessages;
  } else {
    messages = loveLifeMessages.concat(tagalogInsults).concat(confessionMessages);
  }
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomDeviceId() {
  return 'device-' + Math.random().toString(36).substr(2, 9);
}

app.get('/ngl', async (req, res) => {
  const { username, category, amount } = req.query;
  let { deviceId } = req.query;

  if (!username || !amount) {
    return res.status(400).json({ error: "Username and amount are required" });
  }

  if (!deviceId) {
    deviceId = getRandomDeviceId();
  }

  const url = 'https://ngl.link/api/submit';
  const headers = { 'Content-Type': 'application/json' };

  const numMessages = parseInt(amount, 10);
  if (isNaN(numMessages) || numMessages <= 0) {
    return res.status(400).json({ error: 'Invalid amount parameter.' });
  }

  try {
    for (let i = 0; i < numMessages; i++) {
      const message = getRandomMessage(category);
      const payload = { username, question: message, deviceId };

      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post(url, payload, { headers });

      console.log(`Message ${i + 1} sent: ${message}`);
      console.log(`Response status: ${response.status}`);
      console.log(`Response data: ${JSON.stringify(response.data)}`);
    }

    res.json({
      message: "Messages sent",
      developedBy: "Joshua Apostol"
    });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(error.response ? error.response.status : 500).json({ error: "An error occurred while sending the messages" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
