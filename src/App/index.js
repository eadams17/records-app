import React, { PureComponent, Fragment } from "react";
import NavBar from "../NavBar";
import RecordGrid from "../RecordGrid";
import styles from "./style.module.css";

const LIMIT = 15;

export class App extends PureComponent {
  state = {
    allRecordData: null,
    filteredRecordData: null,
    currentPage: 1,
    pageCount: null
  };

  async componentDidMount() {
    const response = await fetch("./data.json").then(result => result.json());

    response.sort((recordA, recordB) => {
      return recordA.artist.name.localeCompare(recordB.artist.name);
    });

    const paginatedRecords = this.paginateRecordData(response);

    this.setState({
      allRecordData: paginatedRecords[0],
      pageCount: paginatedRecords[1]
    });
  }

  updateRecordData = records => {
    const paginatedRecords = this.paginateRecordData(records);

    this.setState({
      filteredRecordData: paginatedRecords[0],
      pageCount: paginatedRecords[1]
    });
  };

  paginateRecordData(records) {
    const recordHash = {};
    let index = 0;
    let id = 1;

    while (index < records.length) {
      recordHash[id] = records.slice(index, LIMIT + index);
      index += LIMIT;
      id += 1;
    }

    // handle case when search yields no results, pageCount should always be at least 1
    let pageCount = Object.keys(recordHash).length;
    pageCount = pageCount ? pageCount : 1;
    return [recordHash, pageCount];
  }

  updatePage = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const {
      allRecordData,
      filteredRecordData,
      currentPage,
      pageCount
    } = this.state;
    return (
      <div className={styles.container}>
        {allRecordData && (
          <Fragment>
            <NavBar
              allRecords={allRecordData}
              filteredRecords={filteredRecordData}
              updateRecords={this.updateRecordData}
              currentPage={currentPage}
            />
            <RecordGrid
              allRecords={allRecordData}
              filteredRecords={filteredRecordData}
              updateRecords={this.updateRecordData}
              currentPage={currentPage}
              pageCount={pageCount}
              updatePage={this.updatePage}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
