import app from "./app.js";
import connectDatabase from "./db/index.js";
import dotenv from "dotenv";


dotenv.config()

connectDatabase().then(() => { 
    app.listen(process.env.PORT || 8000, () => { 
        console.log(`Server is working on PORT ${process.env.PORT}`);
        
    })
}).catch((err) => { 
    console.log(err);
});