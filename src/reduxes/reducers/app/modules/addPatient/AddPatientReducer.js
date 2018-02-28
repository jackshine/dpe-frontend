import * as actionTypes from 'reduxes/actionTypes/index';

import Valid from 'vendors/Valid';

const initialState = {
    steps: [{
        title: 'Patient Information',
        route: '/app/add-patient/patient-information'
    }, {
        title: 'Analgesia Data',
        route: '/app/add-patient/analgesia-data'
    }, {
        title: 'Observal Data',
        route: '/app/add-patient/observal-data'
    }],
    activatedStep: 0,
    actionType: ''
};

function addPatient(state = initialState, action) {
    switch (action.type) {

        case actionTypes.ADD_PATIENT_STEP_PREV: {
            return {
                ...state,
                activatedStep: Valid.range(state.activatedStep - 1, 0, state.steps.length - 1)
            };
        }

        case actionTypes.ADD_PATIENT_STEP_NEXT: {

            const activatedStep = Valid.range(state.activatedStep + 1, 0, state.steps.length - 1),
                finishedStep = state.finishedStep > activatedStep ? state.finishedStep : activatedStep;

            return {
                ...state,
                activatedStep,
                finishedStep
            };
        }

        case actionTypes.ADD_PATIENT_STEP_UPDATE: {
            return {
                ...state,
                activatedStep: action.activatedStep
            };
        }

        // add patient
        case actionTypes.CREATE_PATIENT_INFORMATION_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_INFORMATION_REQUEST
            };
        }
        case actionTypes.CREATE_PATIENT_INFORMATION_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_INFORMATION_SUCCESS
            };
        }
        case actionTypes.CREATE_PATIENT_INFORMATION_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_INFORMATION_FAILURE
            };
        }

        default:
            return state;

    }
}

export default addPatient;