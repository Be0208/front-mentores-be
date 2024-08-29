import { useRouter } from 'vue-router'

function checkLogged(route: string) {
  const token = sessionStorage.getItem('token')
  const router = useRouter()

  if (token) {
    router.push(route)
  } else {
    router.push('/')
  }
}

export default checkLogged
