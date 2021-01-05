import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexSessions = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sessions/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showSession = (user, sessionId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sessions/' + sessionId,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createSession = (user, session) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sessions/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { session }
  })
}
export const updateSession = (user, session, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/sessions/' + id,
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { session: session }
  })
}
