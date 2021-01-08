import React, { useState, useEffect } from 'react'
import { showSession, deleteSession } from '../../api/session'
// functional component passed some props from the parent component which is
const SessionShow = (props) => {
  const [session, setSession] = useState(null)

  const { user, msgAlert, match } = props
  // useEffect for componentDidMount
  // Load the session to show
  useEffect(() => {
    // runs just once on mount

    showSession(user, match.params.sessionId)
      .then((res) => {
        setSession(res.data.session)
      })
      .then(() => {
        msgAlert({
          heading: 'Your Session',
          message: '',
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

  const handleDelete = () => {
    deleteSession(user, match.params.sessionId)
      .then(() => {
        msgAlert({
          heading: 'Session Deleted',
          message: 'See revised session list',
          variant: 'success'
        })
      })
      // .then(() => history.push('/sessions/'))
      .catch(err => {
        msgAlert({
          heading: 'Delete Fail',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {session ? (
        <div>
          <h2>{session.time_length} minutes</h2>
          <button onClick={handleDelete}>Delete Session</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default SessionShow
