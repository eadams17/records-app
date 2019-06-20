import React, { Component, Fragment } from "react";
import NavBar from "../NavBar";
import RecordGrid from "../RecordGrid";
import styles from "./style.module.css";
import { getRecords } from "../client/records.js";

class App extends Component {
  state = { recordsByArtist: null };

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async query => {
    const response = await getRecords({ query: query });
    this.setState({ recordsByArtist: response });
  };

  getNextResults = async offset => {
    const response = await getRecords({ offset: offset });
    this.setState({ recordsByArtist: response });
  };

  updateArtist = artist => {
    const { recordsByArtist } = this.state;
    const { oldName, newName } = artist;

    const { [oldName]: data, ...records } = recordsByArtist;

    const result = { ...records, [newName]: data };

    this.setState({ recordsByArtist: result });
  };

  updateRecords = recordData => {
    const artistName = recordData.artist.name;
    const { recordsByArtist } = this.state;
    const updatedRecords = recordsByArtist;
    const index = updatedRecords[artistName].records.findIndex(
      record => record.id === recordData.id
    );
    updatedRecords[artistName].records[index] = recordData;
    this.setState({ recordsByArtist: updatedRecords });
  };

  render() {
    const { recordsByArtist } = this.state;
    // console.log("app-state", recordsByArtist);
    return (
      <div className={styles.container}>
        {recordsByArtist && (
          <Fragment>
            <NavBar
              records={recordsByArtist}
              fetchRecords={this.fetchRecords}
            />
            <RecordGrid
              recordsByArtist={recordsByArtist}
              updateArtist={this.updateArtist}
              updateRecords={this.updateRecords}
              getNextResults={this.getNextResults}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
