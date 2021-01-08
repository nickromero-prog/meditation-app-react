import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSession, updateSession } from '../../api/session'
import { Button } from 'react-bootstrap'

const SessionUpdate = (props) => {
  const [session, setSession] = useState({ time_length: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    const { user, match, msgAlert } = props
    // show request
    showSession(user, match.params.sessionId)
      .then(res => setSession(res.data.session))
      .then(() => msgAlert({
        heading: 'Your Session',
        message: '',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Your Session Failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setSession(oldSession => {
      const updatedSession = { ...oldSession, ...updatedField }
      return updatedSession
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert, match } = props
    updateSession(user, session, match.params.sessionId)
      .then(() => msgAlert({
        heading: 'Update Successful',
        message: 'Updated Session',
        variant: 'success'
      }))
      .then(() => setUpdated(true))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={'/sessions/'} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update a Session</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="How many minutes?"
          value={session.time_length}
          name="time_length"
          onChange={handleChange}
        />
        <Button type="submit">Update Session</Button>
      </form>
    </React.Fragment>
  )
}

export default withRouter(SessionUpdate)
