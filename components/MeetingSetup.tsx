'use client'  //means its a client component that renders on CLIENT SIDE.

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';


 //1st setIsSetupComplete is getting as props & 2nd setIsSetupComplete is declaring its type in TYPESCRIPT
const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {

 // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
 const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

 const call = useCall(); //this call have access to mic & camera.

 if (!call) {
    throw new Error(
      'useCall must be used within a StreamCall component.',
    );
  }

 useEffect(() => {
   if (isMicCamToggledOn) {
     call?.camera.disable();
     call?.microphone.disable();
   } else {
     call?.camera.enable();
     call?.microphone.enable();
   }
 }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)} //its a callback func. with event(e)
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button //this button comes from shadcn/ui
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join(); //its a method

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>

    </div>
  )
}

export default MeetingSetup