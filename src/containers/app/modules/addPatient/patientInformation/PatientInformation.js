import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import TextField from 'customized/CustomizedMaterialTextField';
import TextArea from 'customized/CustomizedMaterialTextArea';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import StepAction from 'components/StepAction';
import Msg from 'components/Msg';

import 'scss/containers/app/modules/addPatient/patientInformation/PatientInformation.scss';

class PatientInformation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            errorMsg: ''
        };

        this.updateField = ::this.updateField;
        this.next = ::this.next;

    }

    updateField(fieldName, fieldValue) {

        if (this.state.errorMsg) {
            this.setState({
                errorMsg: ''
            });
        }

        const {updatePatientInformationField} = this.props;
        updatePatientInformationField(fieldName, fieldValue);

    }

    next() {

        const {$form} = this.props;

        if (!$form.groupId || !$form.id || !$form.patientName) {
            this.setState({
                errorMsg: 'Group ID, ID and Patient Name is required!'
            });
            return;
        }

        this.props.routerPush('/app/add-patient/analgesia-data');

    }

    componentDidMount() {
        this.props.updateAddPatientStep(0);
    }

    render() {

        const {$groupList, $form} = this.props,
            {errorMsg} = this.state;

        return (
            <div className="patient-information">

                <form className="patient-information-form row">

                    <DropdownSelect className="col-3"
                                    label="Group"
                                    data={$groupList}
                                    valueField="id"
                                    displayField="groupName"
                                    value={$form.group}
                                    onChange={value => this.updateField('group', value)}
                                    required={true}/>

                    <TextField className="col-3"
                               label="ID"
                               value={$form.id}
                               onChange={value => this.updateField('id', value)}
                               required={true}/>

                    <TextField className="col-3"
                               label="Patient Name"
                               value={$form.patientName}
                               onChange={value => this.updateField('patientName', value)}/>

                    <TextField className="col-3"
                               label="Age"
                               value={$form.age}
                               onChange={value => this.updateField('age', value)}/>

                    <TextField className="col-3 gestational-weeks"
                               label="Gestational Days"
                               rightIconCls="unit"
                               value={$form.gestationalDaysWeek}
                               onChange={value => this.updateField('gestationalDaysWeek', value)}/>
                    <TextField className="col-3 gestational-days"
                               label=" "
                               rightIconCls="unit"
                               value={$form.gestationalDaysDay}
                               onChange={value => this.updateField('gestationalDaysDay', value)}/>

                    <TextField className="col-3 height"
                               label="Height"
                               rightIconCls="unit"
                               value={$form.height}
                               onChange={value => this.updateField('height', value)}/>
                    <TextField className="col-3 weight"
                               label="Weight"
                               rightIconCls="unit"
                               value={$form.weight}
                               onChange={value => this.updateField('weight', value)}/>

                    <TextField className="col-3"
                               label="Heart Rate"
                               value={$form.heartRate}
                               onChange={value => this.updateField('heartRate', value)}/>
                    <TextField className="col-3"
                               label="Initial Vas Score"
                               value={$form.initialVasScore}
                               onChange={value => this.updateField('initialVasScore', value)}/>
                    <TextField className="col-6"
                               label="Cervical Dilation At Time Of EA"
                               value={$form.cervicalDilationAtTimeOfEA}
                               onChange={value => this.updateField('cervicalDilationAtTimeOfEA', value)}/>

                    <TextField className="col-4"
                               label="Systolic Blood Pressure"
                               value={$form.systolicBloodPressure}
                               onChange={value => this.updateField('systolicBloodPressure', value)}/>
                    <TextField className="col-4"
                               label="Diastolic Blood Pressure"
                               value={$form.diastolicBloodPressure}
                               onChange={value => this.updateField('diastolicBloodPressure', value)}/>
                    <TextField className="col-4"
                               label="Foetal Heart Rate"
                               value={$form.foetalHeartRate}
                               onChange={value => this.updateField('foetalHeartRate', value)}/>

                    <TextArea className="col-12"
                              label="Description"
                              maxLength={1000}
                              wordCountVisible={true}
                              value={$form.description}
                              onChange={value => this.updateField('description', value)}/>

                    {
                        errorMsg ?
                            <Msg type={Msg.Type.ERROR}>
                                {errorMsg}
                            </Msg>
                            :
                            null
                    }

                </form>

                <StepAction isFirst={true}
                            onNext={this.next}/>

            </div>
        );
    }
}

PatientInformation.propTypes = {

    $groupList: PropTypes.array,
    $form: PropTypes.object,

    routerPush: PropTypes.func,
    updateAddPatientStep: PropTypes.func,
    addPatient: PropTypes.func,
    updatePatientInformationField: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $groupList: state.group.list,
        $form: state.patientInformation.form
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInformation);