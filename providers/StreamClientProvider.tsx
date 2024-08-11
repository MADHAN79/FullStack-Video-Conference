'use client'

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {    StreamVideo, StreamVideoClient  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';


//since this file is CLIENT side component we have access to only public key | see in FOLDER: actions>streams.actions.ts it has access to both since its running in SERVER
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();//this useState is of type StreamVideoClient

    //clerk makes easier to get the information of the currently loggedIn user.
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) return;//if user not exists we exit out of this func.
        if (!apiKey) throw new Error('Stream API key is missing');

        //only if the user & api is here, we can create a new video client
        const client = new StreamVideoClient({ //StreamVideoClient its been called as func. and provided "OPTIONS OBJECT"{}, all inside{} are called as PARAMETERS.
            apiKey,
            user: {
              id: user?.id, //grabbing user's id using clerk & assigning to id
              name: user?.username || user?.id, //if username not present, id becomes the name.
              image: user?.imageUrl,
            },
            //the concept behind tokenProvider is in FOLDER: actions>streams.actions.ts
            tokenProvider, //this verifies that user we are expecting is the same user as current user.
            //with the stream secret key in .env.local file
          });
      
          setVideoClient(client);

    }, [user, isLoaded] ); //[]- these are DEPENDENCY VARIABLEs 

    if (!videoClient) return <Loader />;


    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;