import * as actionTypes from 'reduxes/actionTypes';
import AddPatientApi from 'apis/app/modules/AddPatientApi';
import {routerPush} from 'reduxes/actions/common/RouterAction';

export const updatePatientInformation = form => ({
    type: actionTypes.UPDATE_PATIENT_INFORMATION,
    form
});

export const addPatient = () => (dispatch, getState) => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.ADD_PATIENT_REQUEST,
                actionTypes.ADD_PATIENT_SUCCESS,
                actionTypes.ADD_PATIENT_FAILURE
            ],
            api: AddPatientApi.addPatient,
            params: getState().addPatientInformation.form,
            successCallback() {
                routerPush('/app/add-patient/analgesia-data');
            }
        }
    });
};