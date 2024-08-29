import axios from 'axios'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export const createAccount = async (
  name: string,
  email: string,
  password: string,
  role: string | null
) => {
  try {
    const response = await client.post('/register', {
      name,
      email,
      password,
      role
    })

    console.log(response.data)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    })

    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.token)
      console.log(response.data.token)
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export function getUserToken() {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token')
}

export const getMentors = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  }
  try {
    const response = await client.get('/mentors', config)

    return response
  } catch (error: any) {
    return error?.response
  }
}

export const createMentors = async (name: string, email: string, cpf: string) => {
  try {
    const token = sessionStorage.getItem('token')

    if (!token) {
      throw new Error('Token não encontrado')
    }

    const response = await client.post(
      '/mentors',
      {
        name,
        email,
        cpf
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response.data)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const deleteMentorById = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  }
  try {
    const response = await client.delete(`/mentors/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Erro ao deletar mentor:', error)
    return null
  }
}
