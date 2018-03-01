import * as actionTypes from 'reduxes/actionTypes';

export const patientStepPrev = () => dispatch => {
    return dispatch({
        type: actionTypes.PATIENT_STEP_PREV
    });
};

export const patientStepNext = () => dispatch => {
    return dispatch({
        type: actionTypes.PATIENT_STEP_NEXT
    });
};

export const updatePatientStep = activatedStep => dispatch => {
    return dispatch({
        type: actionTypes.PATIENT_STEP_UPDATE,
        activatedStep
    });
};