'use client'

//to ignore the TypeScript checking for the entire file we need to add //@ts-nocheck or for a particular line add //@ts-ignore at the top above 'use client'

import { useEffect, useState } from 'react';
import Loader from './Loader';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import MeetingCard from './MeetingCard';


const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  
  //to figure-out in which page are we in.
  const router = useRouter();

  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]); //this useState is of type CallRecording-Array.

  const getCalls = () => {  //this will return the EXACT TYPE OF CALLS depending on which page/sidebar we are in.
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  };
  
  //only if we use this, the loading animation get displayed before the delay in showing the upcoming meetings ORELSE
  //THE {NOCALLSMESSAGE} at the bottom most of this code page will get displayed before showing the upcoming meetings lists.
  if (isLoading) return <Loader />;
  
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    {calls && calls.length > 0 ? (
      calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id} //meeting is of type Call and the id exists in it.
          icon={
            type === 'ended'
              ? '/icons/previous.svg' //if meeting has ended the icons image has previous.svg
              : type === 'upcoming'
                ? '/icons/upcoming.svg'  //if meeting is upcoming the icons image has upcoming.svg
                : '/icons/recordings.svg' //if meeting is not upcoming/ended the icons image has recordings.svg
          }
          title={
            //if the meeting is of type Call it has state / meeting is of type CallRecording it DON'T HAVE .state
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 20) || //if our description is longer, by this condition[substring(0,20)] ONLY first 20 CHARACTERS will be displayed in the div.
            'No Description'
          }
          date={
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString()
          }
          isPreviousMeeting={type === 'ended'}
          link={
            type === 'recordings'
              ? (meeting as CallRecording).url
              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
          }
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          handleClick={
            type === 'recordings'
              ? () => router.push(`${(meeting as CallRecording).url}`)
              : () => router.push(`/meeting/${(meeting as Call).id}`)
          }
        />
      ))
    ) : (
      <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
    )}
  </div>
);
};

export default CallList