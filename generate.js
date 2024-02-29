// add "type": "module" to package.json to allow ES6 imports
import { config } from "dotenv";
import { OpenAI } from 'openai';
// import { apiKey } from './apiKey.js';
import { writeFileSync } from 'fs';

config();
// Logs the API_KEY to the console
// console.log(process.env.API_KEY);

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const prompt = 'cover art for a video game compilation of popular video games';

async function generateImage() {
  try {
    // const image = await openai.createImage({  // TypeError: openai.createImage is not a function
    const image = await openai.images.generate({
      model: "dall-e-2",  // dall-e-2 (default) or dall-e-3
      prompt,
      n: 1, // dall-e-2 can generate up to n: 10, dall-e-3 can only use n: 1
      size: "256x256",  // dall-e-2 sizes: "256x256", "512x512", "1024x1024" || dall-e-3 sizes: "1024x1024", "1024x1792", 1792x1024"
      style: "natural", // vivid (default) or natural
      // quality: "standard",  // standard (default) or hd
      // response_format: "url", // url (default) or b64_json
      // user: 'insertUsername' // keeps track of user who generated the image
    });
    
    // const url = image.data.data[0].url;  // TypeError: Cannot read properties of undefined (reading '0')
    const url = image.data[0].url;  // Testing python method for grabbing URL
    console.log(image.data);
    
    // Save image URL to img folder
    const imgResult = await fetch(url);
    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    writeFileSync(`./img/${Date.now()}.png`, buffer);
  } catch (err) {
    console.log(err);
  }
}

generateImage();