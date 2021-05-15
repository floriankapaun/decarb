import { en as about } from './pages/about'
import { en as dashboardIndex } from './pages/dashboard/index'
import { en as dataPrivacy } from './pages/legal/dataPrivacy'
import { en as firstEstimation } from './pages/dashboard/firstEstimation'
import { en as imprint } from './pages/legal/imprint'
import { en as index } from './pages/index'
import { en as login } from './pages/login'
import { en as pageviewEstimation } from './pages/dashboard/pageviewEstimation'
import { en as payments } from './pages/dashboard/payments'
import { en as register } from './pages/register'
import { en as registerDomain } from './pages/dashboard/registerDomain'
import { en as setPassword } from './pages/users/id/setPassword'
import { en as setupSubscription } from './pages/dashboard/setupSubscription'
import { en as subscriptionSuccess } from './pages/dashboard/subscriptionSuccess'
import { en as termsAndConditions } from './pages/legal/termsAndConditions'
import { en as trackingCode } from './pages/dashboard/trackingCode'
import { en as traffic } from './pages/dashboard/traffic'
import { en as verifyDomainOwnership } from './pages/dashboard/verifyDomainOwnership'
import { en as verifyEmail } from './pages/users/id/verifyEmail'

export default {
    index,
    about,
    dashboard: {
        index: dashboardIndex,
        firstEstimation,
        pageviewEstimation,
        payments,
        registerDomain,
        setupSubscription,
        subscriptionSuccess,
        trackingCode,
        traffic,
        verifyDomainOwnership,
    },
    legal: { dataPrivacy, imprint, termsAndConditions },
    login,
    register,
    users: { id: { setPassword, verifyEmail } },
}
