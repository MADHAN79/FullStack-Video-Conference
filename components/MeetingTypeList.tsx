'use client'

import { useState } from "react";
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"; //REMEMBER: router is from next.navigation not from next.router
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

//whenever we use some interactivity to the website like onClick / event listeners,etc.,
//we should mention that file to use CLIENT SIDE RENDERING thats the rule of NEXT.JS

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {

    const router = useRouter(); //for HomeCard no.4

    //in TypeScript here we are finding the exact types of states.
    const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined); //in this the state is of four, like three ...Meeting and one "initial state" undefined.

    const [callDetail, setCallDetails] = useState<Call>(); //useState types are mentioned like this btw <>.

    //to check if the user exists
    const { user } = useUser();

    //initializing video client
    const client = useStreamVideoClient();

    const [values, setValues] = useState(initialValues);

    const createMeeting = async () => {
        
      //without the client/user we dont create a meeting
          if (!client || !user) return;
        try {
          
          //this crypto is directly comming from javascript crypto global property, it generates random number.
          //cryto generates random number & randomUUID generates random ID.
          const id = crypto.randomUUID(); 

          const call = client.call('default', id);

          if (!call) throw new Error('Failed to create meeting');
          const startsAt =
            values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Instant Meeting';
          await call.getOrCreate({
            data: {
              starts_at: startsAt,
              custom: {
                description,
              },
            },
          });
          setCallDetails(call);

          if (!values.description) {
            router.push(`/meeting/${call.id}`); //navigating to specific room with particular call.id
          }
          
        } catch (error) {
          console.log(error);
          
        }
      };


  return (
    //since all divs are boxes,instead of flex, grid makes easier alignment with reponsiveness here
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"> 
        
        <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')} //only in this HomeCard we are routing to another page, all three calls a modal(means popup)
      />

    <MeetingModal  //THIS IS THE POPUP MODAL, here we are passing props to how it needs to behave while opening & closing.
        isOpen={meetingState === 'isInstantMeeting'} //this popup is for Join meeting div
        onClose={() => setMeetingState(undefined)} //undefined is the initial state
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList