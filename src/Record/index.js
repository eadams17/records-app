import React, { Component, Fragment } from "react";
import Panel from "../Panel";
import RecordUpdate from "../RecordUpdate";
import PropTypes from "prop-types";

const PHOTO_URL = "https://picsum.photos/300";

export class Record extends Component {
  state = { visible: false, imageUrl: null };

  async componentDidMount() {
    // API that returns a random photo to be used for record panel background
    const response = await fetch(PHOTO_URL);
    this.setState({ imageUrl: response.url });
  }

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
    const { visible, imageUrl } = this.state;

    return (
      <Fragment>
        {imageUrl && (
          <Panel
            record={record}
            imageUrl={imageUrl}
            toggleModal={this.toggleModal}
            handleKeyPress={this.handleKeyPress}
          />
        )}
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
