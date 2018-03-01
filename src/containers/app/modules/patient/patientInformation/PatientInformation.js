import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import PatientForm from './PatientForm';
import Msg from 'components/Msg';
import StepAction from 'components/StepAction';

import 'scss/containers/app/modules/patient/patientInformation/PatientInformation.scss';

class PatientInformation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            errorMsg: ''
        };

        this.updateFieldHandler = ::this.updateFieldHandler;
        this.save = ::this.save;

    }

    updateFieldHandler() {
        if (this.state.errorMsg) {
            this.setState({
                errorMsg: ''
            });
        }
    }

    save() {

        const {$form, createOrUpdatePatient} = this.props;

        if (!$form.group || !$form.id || !$form.patientName) {
            this.setState({
                errorMsg: 'Group, ID and Patient Name is required!'
            });
            return;
        }

        createOrUpdatePatient();

    }

    componentWillReceiveProps(nextProps) {

        const {match: nextMatch} = nextProps,
            {match, getPatientInformation} = this.props;

        if (nextMatch && nextMatch.params && nextMatch.params.id && match && match.params
            && nextMatch.params.id !== match.params.id) {
            getPatientInformation(nextMatch.params.id);
        }

    }

    componentDidMount() {

        const {match, updatePatientStep, getPatientInformation} = this.props;

        updatePatientStep(0);

        if (match && match.params && match.params.id) {
            getPatientInformation(match.params.id);
        }

    }

    render() {

        const {errorMsg} = this.state;

        return (
            <div className="patient-information">

                <PatientForm onUpdateField={this.updateFieldHandler}/>

                {
                    errorMsg ?
                        <Msg type={Msg.Type.ERROR}>
                            {errorMsg}
                        </Msg>
                        :
                        null
                }

                <StepAction isFirst={true}
                            onNext={this.save}/>

            </div>
        );
    }
}

PatientInformation.propTypes = {

    $form: PropTypes.object,

    getPatientInformation: PropTypes.func,
    updatePatientStep: PropTypes.func,
    createOrUpdatePatient: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $form: state.patientInformation.form
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInformation);