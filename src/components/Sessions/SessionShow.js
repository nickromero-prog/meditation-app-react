import React, { useState, useEffect } from 'react'
import { showSession, deleteSession } from '../../api/session'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// import { Redirect } from 'react-router-dom'
// functional component passed some props from the parent component which is
const SessionShow = (props) => {
  const [session, setSession] = useState(null)
  const [updated, setUpdated] = useState(false)

  const { user, msgAlert, match } = props
  // useEffect for componentDidMount
  // Load the session to show
  useEffect(() => {
    // runs just once on mount

    showSession(user, match.params.sessionId)
      .then((res) => {
        setSession(res.data.session)
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
          message: '',
          variant: 'success'
        })
      })
      .then(() => setUpdated(true))
      .catch(err => {
        msgAlert({
          heading: 'Delete Fail',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return (
      <Redirect to={'/sessions/'} />
    )
  }

  // const handleUpdate = () => {
  //   <Redirect
  // }

  return (
    <div className ="sessionShow">
      {session ? (
        <div>
          <br />
          <h2>{session.time_length} minutes observing the force</h2>
          <br />
          <Button variant="danger "onClick={handleDelete}>Delete Session</Button>
          <Link to={`/session-update/${session.id}`}><Button className="updatebutton">Update Session</Button></Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default SessionShow
