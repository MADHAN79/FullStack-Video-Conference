import React from 'react'

const Meeting = ({ params }: { params: { id: string } }) => { //in place of "id" we give the folder name whatever it is 
  return (
    <div>Meeting Room: #{params.id}</div>
  )
}

export default Meeting