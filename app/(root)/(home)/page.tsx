//there is such a beauty in this page the reason to build this project in next.js rather than react.
//since the MeetingTypeList doesn't need any client side dependencies, the navbar, sidebar & the time diplaying div
//all gets rendered in SERVER SIDE & only the meeting divs below the time div get rendered in CLIENT SIDE.

import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  
  //FOR displaying dynamic time & date in human readable format.  <-----
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  //.format is used to convert the date json object into correct format for browser.
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now); 
  // -------->

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* only by giving bg-center for bg-cover images the image will fully be visible i found that by meself */}
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover bg-center">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      {/* ONLY this renders in CLIENT SIDE in this entire page */}
      <MeetingTypeList /> 
    </section>
  )
}

export default Home