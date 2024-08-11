//a HOOK is just basically a func. starting with the word 'use'.

//this CUSTOM HOOK gets called in app>root>meeting>id>page.tsx

import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>(); //useState is of type Call.
    const [isCallLoading, setIsCallLoading] = useState(true);

    //getting access to our stream video client
    const client = useStreamVideoClient();

    useEffect(() => {

        //if the client not exists, exit the func.
        if (!client) return;
        

        const loadCall = async () => {
          try {
                // https://getstream.io/video/docs/react/guides/querying-calls/#filters
                //HERE we are querying all of the existing calls and query it by a filter called "id"
                const { calls } = await client.queryCalls({ filter_conditions: { id } });
        
                //calls.length > 0 which means if we have fetched any calls, if we fetched then we are updating the state.
                if (calls.length > 0) setCall(calls[0]);
        
                setIsCallLoading(false); //stopping the loading
                } catch (error) {
                    console.error(error);
                    setIsCallLoading(false);
            }
        };
    
        //we cannot write a regular async await code inside the useEffect unless we declare it as a NEW FUNC.
        loadCall(); //Immediately Invoking Func.

      }, [client, id]); //it means we are going to recall our useEffect whenever there is some 
      //changes in client & id of the call we are trying to fetch changes.

      return { call, isCallLoading }; //as a regular HOOK we should return the output.
}

