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

export const createSession = (user, session) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sessions',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { session }
  })
}
