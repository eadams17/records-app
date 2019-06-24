import React, { Component, Fragment } from "react";
import Panel from "../Panel";
import RecordUpdate from "../RecordUpdate";
import PropTypes from "prop-types";

export class Record extends Component {
  state = { visible: false };

  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  handleKeyPress = e => {
    e.key === "Enter" && this.toggleModal();
  };

  render() {
    const { record, updateRecords, allRecords, pageCount } = this.props;
    const { visible } = this.state;

    return (
      <Fragment>
        <Panel
          record={record}
          toggleModal={this.toggleModal}
          handleKeyPress={this.handleKeyPress}
        />
        {visible && (
          <RecordUpdate
            record={record}
            allRecords={allRecords}
            visible={visible}
            toggle={this.toggleModal}
            updateRecords={updateRecords}
            pageCount={pageCount}
          />
        )}
      </Fragment>
    );
  }
}

Record.propTypes = {
  record: PropTypes.object.isRequired,
  allRecords: PropTypes.object.isRequired,
  updateRecords: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired
};

export default Record;
