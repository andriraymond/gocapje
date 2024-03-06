import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/database/mongoose";


export const GET= async (request, response)=> {
    // console.log(request)
        const { database } = await connectToDatabase();
        const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    
        const results = await collection.find({})
        .project({
            "grades": 0,
            "borough": 0,
            "restaurant_id": 0
        })
        .limit(10).toArray();
        return NextResponse.json(results)
    

}