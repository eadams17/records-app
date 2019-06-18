import React, { PureComponent, Fragment } from "react";
import NavBar from "../NavBar";
import RecordGrid from "../RecordGrid";
import styles from "./style.module.css";

class App extends PureComponent {
  state = { allRecordData: null, filteredRecordData: null };
  componentDidMount() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl =
      "https://gist.githubusercontent.com/seanders/df38a92ffc4e8c56962e51b6e96e188f/raw/b032669142b7b57ede3496dffee5b7c16b8071e1/page1.json";
    const url = proxyUrl + targetUrl;
    fetch(url)
      .then(result => result.json())
      .then(response => {
        this.setState({
          allRecordData: response.results,
          nextPageUrl: response.nextPage
        });
      });
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
