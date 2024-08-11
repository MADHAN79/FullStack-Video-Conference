'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


const EndCallButton = () => {

    //here we are getting the information about the call using useCall HOOK. | since we are using
    //a HOOK ADD 'use client at TOP'
    const call = useCall();

    //with this after we end the call, we can re-route to the home page.
    const router = useRouter();

    // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

    //with the help of useCall & useLocalParticipant HOOKS, we are checking are I'm the owner of this call.
    const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

    //if we are not the meeting owner, null = not show the button.
    if (!isMeetingOwner) return null;
    
    //if we are the owner of the meeting, applying the endCall aync fun. while onClick
    const endCall = async () => {
        await call.endCall();
        router.push('/');
      };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  )
}

export default EndCallButton