export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong on the server';
    res.status(statusCode).json({ message });
};
