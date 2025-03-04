import {neon , neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
neonConfig.fetchConnectionCache = true  //caches the connection thats being set

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL not set")
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);