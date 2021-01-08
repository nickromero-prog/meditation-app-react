import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showSession, updateSession } from '../../api/session'

const SessionUpdate = (props) => {
  const [session, setSession] = useState({ time_length: '' })
  // const [updated, setUpdated] = useState(false)

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
    const { user, msgAlert, match, history } = props
    updateSession(user, session, match.params.sessionId)
      .then(() => history.push('./session-show/' + match.params.sessionId))
      .then(() => msgAlert({
        heading: 'Update Successful',
        message: 'Updated Session',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
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
        <button type="submit">Update Session</button>
      </form>
    </React.Fragment>
  )
}

export default withRouter(SessionUpdate)
