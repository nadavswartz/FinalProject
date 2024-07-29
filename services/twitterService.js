const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: 'fo4Le7wuFhn7Wdg0wnjIRadRf',
  appSecret: 'kMuYBvuelutqDGB74F7hl92aHgPFSDyqKj7rspNbKlO9CWIqFZ',
  accessToken: '1817894233342148608-CKw1AWPHH6JGGG0FU4r5V9IHusVd3T',
  accessSecret: 'p32ICWGBYb3FYl1VuXtaRpT8Fysn3gu2PRBeLtyTf7vfw',
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

module.exports = { postTweet };
