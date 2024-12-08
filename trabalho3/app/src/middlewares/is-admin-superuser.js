

const isAdminSuperuser = (req, res, next) => {
    if (req.session.user?.role !== "ADMIN" && req.session.user?.role !== "SUPERUSER") {
        return res.redirect('/error-forbidden');
    }   
    next();
}

export default isAdminSuperuser ;