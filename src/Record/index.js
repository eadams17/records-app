import React, { Component, Fragment } from "react";
import Panel from "../Panel";
import UpdateRecord from "../UpdateRecord";

class Record extends Component {
  state = { visible: false, isActive: false };

  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  toggleActiveState = () => {
    if (!this.state.visible) {
      this.setState(prevState => ({
        isActive: !prevState.isActive
      }));
    }
  };

  handleKeyPress = e => {
    e.key === "Enter" && this.toggleModal();
  };

  render() {
    const { record, isLast, updateRecords, artistName } = this.props;
    const { visible, isActive } = this.state;

    return (
      <Fragment>
        <Panel
          isLast={isLast}
          isActive={isActive}
          record={record}
          artistName={artistName}
          toggleModal={this.toggleModal}
          toggleActiveState={this.toggleActiveState}
          handleKeyPress={this.handleKeyPress}
        />
        {visible && (
          <UpdateRecord
            record={record}
            visible={visible}
            toggle={this.toggleModal}
            toggleActiveState={this.toggleActiveState}
            updateRecords={updateRecords}
          />
        )}
      </Fragment>
    );
  }
}

export default Record;
