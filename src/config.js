import {config} from "dotenv";

config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ubyquit:Holamundo2022@clustersm52.tqhmh.mongodb.net/task?retryWrites=true&w=majority";