import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as actions from 'reduxes/actions/index';

import Table from 'alcedo-ui/Table';
import Switcher from 'alcedo-ui/Switcher';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import TextField from 'customized/CustomizedMaterialTextField';

import 'scss/containers/app/modules/patientList/PatientListTable.scss';

class PatientListTable extends Component {

    constructor(props) {

        super(props);

        this.nameChangeHandler = ::this.nameChangeHandler;
        this.groupChangeHandler = ::this.groupChangeHandler;
        this.statusChangeHandler = ::this.statusChangeHandler;

    }

    nameChangeHandler = _.debounce((id, value) => {
        this.props.updatePatientName(id, value);
    }, 250);

    groupChangeHandler(id, value) {
        this.props.updatePatientGroup(id, value);
    }

    statusChangeHandler(id, value) {
        const {enablePatient, disablePatient} = this.props;
        value ? enablePatient(id) : disablePatient(id);
    }

    render() {

        const {$groupList, $patientList} = this.props,
            self = this;

        return (
            <Table className="patient-list-table"
                   data={$patientList}
                   columns={[{
                       header: 'ID',
                       sortable: true,
                       sortProp: 'id',
                       renderer: 'id'
                   }, {
                       header: 'Name',
                       sortable: true,
                       sortProp: 'name',
                       renderer(rowData) {
                           return <TextField className="name-field"
                                             value={rowData.name}
                                             onChange={value => {
                                                 self.nameChangeHandler(rowData.id, value);
                                             }}/>;
                       }
                   }, {
                       header: 'Group',
                       sortable: true,
                       sortProp: 'groupId',
                       renderer(rowData) {
                           return <DropdownSelect className="group-select"
                                                  data={$groupList}
                                                  valueField="id"
                                                  displayField="name"
                                                  value={rowData.group}
                                                  onChange={value => {
                                                      self.groupChangeHandler(rowData.id, value);
                                                  }}/>;
                       }
                   }, {
                       header: 'Status',
                       sortable: true,
                       sortProp: 'status',
                       renderer(rowData) {
                           return <Switcher value={rowData.status === 1}
                                            size={Switcher.Size.SMALL}
                                            onChange={value => {
                                                self.statusChangeHandler(rowData.id, value);
                                            }}/>;
                       }
                   }]}/>
        );
    }
}

PatientListTable.propTypes = {

    $groupList: PropTypes.array,
    $patientList: PropTypes.array,

    updatePatientName: PropTypes.func,
    updatePatientGroup: PropTypes.func,
    enablePatient: PropTypes.func,
    disablePatient: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $groupList: state.group.list,
        $patientList: state.patients.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListTable);