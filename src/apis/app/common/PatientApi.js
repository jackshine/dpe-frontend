import config from 'src/config';
import Api from 'apis/Api';

export default {

    getPatients(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/patient/getPatients`,
            cancelable: false
        });
    }
};
