import { en as about } from './pages/about'
import { en as dataPrivacy } from './pages/legal/dataPrivacy'
import { en as imprint } from './pages/legal/imprint'
import { en as index } from './pages/index'
import { en as login } from './pages/login'
import { en as register } from './pages/register'
import { en as setPassword } from './pages/users/id/setPassword'
import { en as termsAndConditions } from './pages/legal/termsAndConditions'
import { en as verifyEmail } from './pages/users/id/verifyEmail'

export default {
    index,
    about,
    legal: { dataPrivacy, imprint, termsAndConditions },
    login,
    register,
    users: { id: { setPassword, verifyEmail } },
}
