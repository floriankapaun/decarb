
// TODO: Handle domain access and role stuff in here
export default (requiredRole) => async (req, res, next) => {
    
    console.log(requiredRole, req.currentUser);
    // if ()
    next();
};
