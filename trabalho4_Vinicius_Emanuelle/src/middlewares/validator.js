const validate = (schema) => (req, res, next) => {
    try {
        schema.validateSync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.errors });
    }
};

export {
    validate
}