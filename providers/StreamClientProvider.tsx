import {    StreamVideo, StreamVideoClient  } from '@stream-io/video-react-sdk';
import { ReactNode } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          
        </StreamCall>
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;