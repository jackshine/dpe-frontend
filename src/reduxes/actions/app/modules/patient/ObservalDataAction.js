import * as actionTypes from 'reduxes/actionTypes/index';
import {routerPush} from 'reduxes/actions/common/RouterAction';
import ObservalApi from 'apis/app/modules/addPatient/ObservalApi';

export const updateObservalDataField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_OBSERVAL_DATA_FIELD,
    fieldName,
    fieldValue
});

export const createOrUpdateObservalData = patientId => (dispatch, getState) => {

    const observalData = getState().observalData.form;

    if (!patientId || !observalData) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_OBSERVAL_DATA_REQUEST,
                actionTypes.UPDATE_OBSERVAL_DATA_SUCCESS,
                actionTypes.UPDATE_OBSERVAL_DATA_FAILURE
            ],
            api: ObservalApi.createOrUpdateObservalData,
            params: {
                patientId,
                observalData
            },
            successCallback() {
                routerPush('/app/patient-list')(dispatch);
            }
        }
    });

};