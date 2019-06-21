import React, { PureComponent, Fragment } from "react";
import NavBar from "../NavBar";
import RecordGrid from "../RecordGrid";
import styles from "./style.module.css";

class App extends PureComponent {
  state = { allRecordData: null, filteredRecordData: null };

  async componentDidMount() {
    console.log("hit");
    const response = await fetch("./data.json")
      .then(result => result.json())
      .then(response => {
        return response;
      });
    this.setState({ allRecordData: response });
  }

  updateRecordData = data => {
    this.setState({ filteredRecordData: data });
  };

  render() {
    const { allRecordData, filteredRecordData } = this.state;
    return (
      <div className={styles.container}>
        {allRecordData && (
          <Fragment>
            <NavBar
              allRecords={allRecordData}
              filteredRecords={filteredRecordData}
              updateRecords={this.updateRecordData}
            />
            <RecordGrid
              allRecords={allRecordData}
              filteredRecords={filteredRecordData}
              updateRecords={this.updateRecordData}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
