const handleCastErrorDB = (err) => {
    return new APPError(`Invalid ${err.path}: ${err.value}`, 400);
}

const handleValidationErrorDB = (err) => {
    return new APPError(`Invalid input data: ${Object.values(err.errors).map(el => el.message).join('. ')}`, 400);
}

const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return new APPError(`Duplicate field value: ${field} = ${value}. Please use another value!`, 400);
};

const gobalErrorHandler = (err, req, res, next) => {
    console.error('Global Error Handler:', err);

    if (err.name === "CastError") err = handleCastErrorDB(err);
    else if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    else if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    
    // Set default status code
    const statusCode = err.statusCode || 500;
    
    // Set default error message
    const message = err.message || 'Internal Server Error';

    // Send response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
}

module.exports = gobalErrorHandler;