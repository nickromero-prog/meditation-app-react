import React from 'react'
import jedimedchamber from '/Users/nickromero/sei/projects/projectcapstone/meditation-app-react/src/components/Home/jedimedchamber.jpg'

const Home = (props) => {
  return (
    <div>
      <img className="cavepicture" src={jedimedchamber} alt="jedi meditation chamber picture" />
    </div>
  )
}

export default Home
