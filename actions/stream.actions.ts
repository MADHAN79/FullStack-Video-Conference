"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

//means this code will only runs within server.

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

//below is the SERVER ACTIONs which checks the logic and taps the apiSecret key and create the token for the user
//and we can call it within the stream video provider without the need to activate the node express server like in react!
//THIS IS THE POWER OF NEXT.JS

export const tokenProvider = async () => {
    const user = await currentUser();
  
    if (!user) throw new Error('User is not logged in');
    if (!apiKey) throw new Error('No Stream API key');
    if (!apiSecret) throw new Error('No Stream API secret');
  
    //since we are in the SERVER SIDE this StreamClient will be coming from Node not from react.
    const client = new StreamClient(apiKey, apiSecret);
  
    // exp is optional (by default the token is valid for an hour): https://getstream.io/video/docs/api/
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;  
    
    //this calculates when the token was issued.
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
  
    const token = client.createToken(user.id, exp, issuedAt);
  
    return token;
  };