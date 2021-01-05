import React, { useState, useEffect } from 'react'
import { showSession } from '../../api/session'
// functional component passed some props from the parent component which is
const SessionShow = (props) => {
  const [session, setSession] = useState(null)

  // useEffect for componentDidMount
  // Load the session to show
  useEffect(() => {
    // runs just once on mount
    const { user, msgAlert, match } = props

    showSession(user, match.params.sessionId)
      .then((res) => {
        console.log(res)
        setSession(res.data.session)
      })
      .then(() => {
        msgAlert({
          heading: '',
          message: 'Your Session',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show single session failed',
          message: 'Error : ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <div>
      {session ? (
        <div>
          <h2>{session.time_length}</h2>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default SessionShow
