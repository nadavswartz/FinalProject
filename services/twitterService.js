const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const postTweet = async (status) => {
  try {
    const response = await client.v2.tweet(status);
    console.log('Successfully tweeted:', response.data);
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error; 
  }
};

const generateTweetContent = (Book_Name, Author, Year, Category, Description, Image) => {
  const tweetContent = `📚 New Arrival book!!! 
      Book: "${Book_Name}" 
      Author: ${Author} 
      Year: ${Year} 
      Category: ${Category} 
      Description: ${Description} 
      Image: ${Image}
  
      Check it out! #NewBook #${Category}`;

  return tweetContent;
};

module.exports = { postTweet, generateTweetContent };
