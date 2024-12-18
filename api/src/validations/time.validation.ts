import { checkSchema } from "express-validator";

export const TimeCreateSchema = checkSchema({
    doctor_id: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'Doctor ID must be an integer',
    },
    start_time: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        matches: {
            options: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: 'Start time must be in the format "hh:mm" (e.g. 12:30)',
        },
        errorMessage: 'Start time is required and must be a string',
    },
    end_time: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        matches: {
            options: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: 'Start time must be in the format "hh:mm" (e.g. 12:30)',
        },
        errorMessage: 'End time is required and must be a string',
    },
});