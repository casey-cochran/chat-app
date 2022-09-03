import {validationResult} from "express-validator";

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const e = {}
        validationErrors.errors.forEach((err) => e[err.param] = err.msg)
        // console.log(e, 'what is e here ?!!?? \n \n ')
        const errors = validationErrors.array().map((error) => `${error.msg}`);
        const err = Error('Bad request.');
        err.errors = e;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
}

export default handleValidationErrors;
