import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import SolidGaugeChart from 'components/SolidGaugeChart';

import 'scss/containers/app/modules/dashboard/Dashboard.scss';

class Dashboard extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        const {$patientList} = this.props;

        return (
            <div className="dpe-dashboard">

                <div className="row">
                    <SolidGaugeChart className="col-4 chart"
                                     title="Patients"
                                     value={$patientList.length}
                                     total={120}/>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {
    $patientList: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        $patientList: state.patients.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);