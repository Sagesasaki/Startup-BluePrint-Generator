import { Configuration, OpenAIApi} from "openai";
import express from "express"; // express is used when js + web apps, and can only be used in node js
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// express allows you to define routes, handle HTTP requests, and manage server functionality.
const app = express(); // create instance of the express application
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// listen ot post requests
// /chat indicates where to send the POST to
app.post("/chat", async (req, res) => {

    const { messages } = req.body;

    const completion = await openai.createChatCompletion({ 
        model: "gpt-3.5-turbo",
        messages: messages
    }) 

    res.json({completion: completion.data.choices[0].message.content});
}); 


app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

// The code you provided is server-side code written in Node.js using the Express.js 
// framework. The `openai` library is being used to interact with OpenAI's API.

// Here's what the code is doing in simple terms:

// 1. It first imports required modules and sets up an instance of OpenAI's 
// API using a configuration that includes the organization and API key.

// 2. It then creates an instance of an Express.js application and sets the server to 
// listen on port 3000. The server is also configured to use `body-parser` (for parsing 
// incoming request bodies in a middleware before your handlers) and `cors` (to handle Cross-Origin Resource Sharing).

// 3. An endpoint is defined at the root URL ("/") of the server. When a GET request 
// is made to this endpoint, the server makes a request to OpenAI's API to generate a chat message using the GPT-3.5-turbo model.

// 4. The server then waits for the OpenAI API to respond. Once it does, the server sends 
// back a JSON response containing the AI-generated message.

// 5. Finally, the server starts listening on port 3000 and logs a message to
// the console indicating it's running and ready to accept requests.

// This code doesn't contain any client-side code, but a client (for example, a web 
// browser or another server) could make requests to this server by sending HTTP GET requests to "http://localhost:3000/".

// Note: Please make sure you never share your real OpenAI API keys, as they give 
// access to your OpenAI account and should be kept confidential. Always keep them in a secure and private environment, such as environment variables.
