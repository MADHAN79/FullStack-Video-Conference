'use client'

import { useState } from "react";
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"; //REMEMBER: router is from next.navigation not from next.router
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';

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

  const { toast } = useToast()

  const createMeeting = async () => {

    //without the client/user we dont create a meeting
    if (!client || !user) return;
    try {

      //useful in-case of scheduling the meeting.
      if (!values.dateTime) {
        toast({ title: "Failed to create meeting", })
        return;
      }

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
      setCallDetails(call); //setting call details for  the current call.

      if (!values.description) {
        router.push(`/meeting/${call.id}`); //navigating to specific room with particular call.id
      }

      toast({ title: "Meeting Created", })

    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting", })
    }
  };

  //with this we get the meetingLink for the schedule
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

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

        {/* if call details exists we are gonna schedule a meeting or-else not */}
        {!callDetail ? (
            <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>

            {/* npx shadcn-ui@latest add textarea */}
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0" //ring-offset stops higlighting the textarea whenever we hover the mouse over textarea.
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })//spreading all the values and modify the description
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>

            {/* npm install react-datepicker */}
            {/* npm i --save-dev @types/react-datepicker */}
            {/* for this we have to import its corresponding css file or else everything will be shown out of the datepicker in app layout.tsx. */}
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>

        </MeetingModal>
        ) :(
          <MeetingModal
              isOpen={meetingState === 'isScheduleMeeting'}
              onClose={() => setMeetingState(undefined)}
              title="Meeting Created"
              handleClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({ title: 'Link Copied' });
              }}
              image={'/icons/checked.svg'}
              buttonIcon="/icons/copy.svg"
              className="text-center"
              buttonText="Copy Meeting Link"
          />
        )
        }

      <MeetingModal  //THIS IS THE POPUP MODAL, here we are passing props to how it needs to behave while opening & closing.
        isOpen={meetingState === 'isInstantMeeting'} //this popup is for Join meeting div
        onClose={() => setMeetingState(undefined)} //undefined is the initial state
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
            isOpen={meetingState === 'isJoiningMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
      >
            {/* npx shadcn-ui@latest add input */}
            <Input
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Meeting link"
              onChange={(e) => setValues({ ...values, link: e.target.value })}
            />
      </MeetingModal>

    </section>
  )
}

export default MeetingTypeList