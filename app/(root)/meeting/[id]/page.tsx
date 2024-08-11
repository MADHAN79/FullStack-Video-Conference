'use client'


import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

//this params grabs currently in which meeting room are we in with room id
const Meeting = ({ params: { id } }: { params: { id: string } }) => { //in place of "id" we give the folder name whatever it is 

  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id); //its a CUSTOM HOOK created by me. | this id is coming throught the first params
  const [isSetupComplete, setIsSetupComplete] = useState(false); //initial state is false.

  //if the call is not loaded / still loading the LOADER COMPONENT shows the rotating circle svg
  if (!isLoaded || isCallLoading) return <Loader />;


  return (
    <main className="h-screen w-full">

      {/*with the help of this StreamCallProvider call we know exactly in which call are we in */}
      <StreamCall call={call}>
        <StreamTheme>

          {/* isSetupComplete whether the audio & video setup is completed or not */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting

