import dns from "dns"
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

export default connectToDB