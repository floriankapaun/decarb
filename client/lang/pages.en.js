import { en as index } from './pages/index'
import { en as about } from './pages/about'
import { en as login } from './pages/login'
import { en as register } from './pages/register'
import { en as setPassword } from './pages/users/id/setPassword'
import { en as verifyEmail } from './pages/users/id/verifyEmail'

export default {
    index,
    about,
    login,
    register,
    users: { id: { setPassword, verifyEmail } },
}
