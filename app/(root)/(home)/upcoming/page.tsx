import CallList from '@/components/CallList'

const Upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <h1 className='text-3xl font-bold'>
        Upcoming
      </h1>

      {/* reusable component plays the role here as CallList :) */}
      <CallList type="upcoming" />       
    </section>
  )
}

export default Upcoming