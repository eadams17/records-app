import React, { Component, Fragment } from "react";
import Panel from "../Panel";
import RecordUpdate from "../RecordUpdate";

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
    const {
      record,
      updateRecords,
      allRecords,
      pageCount,
      currentPage
    } = this.props;
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
            currentPage={currentPage}
          />
        )}
      </Fragment>
    );
  }
}

export default Record;
