import { ENUMS } from '../config/index.js';

export default (minimumRoleIndex) => async (req, res, next) => {
    const domainId = req.params.id;
    const domainUser = req.currentUser.domains.find((domain) => domain.domainId === domainId);
    if (!domainUser) {
        const message = `User has no access to this domain.`;
        return res.status(401).json({ message });
    }
    const domainUserRoleIndex = ENUMS.role.findIndex((role) => role === domainUser.role);
    // Permissions decline with an increasing roleIndex.
    // A roleIndex of `0` therefore has the most permissions.
    if (minimumRoleIndex < domainUserRoleIndex) {
        const message = `User role ${domainUser.role} is not enough to do this.`
        return res.status(401).json({ message });
    }
    next();
};
