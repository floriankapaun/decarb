import { ENUMS } from '../config/index.js';

export default (minimumRoleIndex) => async (req, res, next) => {
    const domainId = req.params.id;
    const domainUser = req.currentUser.domains.find((domain) => domain.domainId === domainId);
    if (!domainUser) {
        return res.status(401).send(`User has no access to this domain.`);
    }
    const domainUserRoleIndex = ENUMS.role.findIndex((role) => role === domainUser.role);
    // Permissions decline with an increasing roleIndex.
    // A roleIndex of `0` therefore has the most permissions.
    if (minimumRoleIndex < domainUserRoleIndex) {
        return res.status(401).send(`User role ${domainUser.role} is not enough to do this.`);
    }
    next();
};
