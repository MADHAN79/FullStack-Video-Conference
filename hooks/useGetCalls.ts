import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

//this is our another custom HOOK
export const useGetCalls = () => {
  const { user } = useUser(); //to fetching calls for each specific user, here we are getting each user.
  const client = useStreamVideoClient(); //through this we can able to fetch our calls.
  const [calls, setCalls] = useState<Call[]>(); //IT is of type CallArray & it comes from STREAM IMPORT
  const [isLoading, setIsLoading] = useState(false); //the loading phase of each call is fetched here.


  //since the fetching of the CALLS IS ASYNCHRONOUS, we cannot simply put await or make the useEffect an async func.
  //so we are creating a new async func. loadCalls and we are calling it as IIF at the end of the useEffect itself.
  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return; //IF there is no client/user we exit out of the func.
      
      setIsLoading(true); //else if client/user is present the setIsLoading(starting to fetch the calls) is initiated.

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }], //sorting the calls based on starting date('starts_at')
          filter_conditions: {
            starts_at: { $exists: true }, //filtering calls based on if the start date exists, only calls with start date will be visible.
            $or: [
              { created_by_user_id: user.id }, //or filtering calls based on if the meet is created by us(currentuser/user.id) or
              { members: { $in: [user.id] } }, //by the members in the meet.
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally { //its called as 'finally clause' in both case whether the func. successfully or not excuted, we need to stop loading.
        setIsLoading(false);
      }
    };

    loadCalls(); //IIFE func.
  }, [client, user?.id]); //useEffect's dependency array



const now = new Date(); //for applying [before(<)now - means attended/ended calls & after(>)now - means upcoming]logic

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt //|| !!endedAt means - OR already ended.
  })

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now
  })

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
};