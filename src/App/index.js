import React, { PureComponent, Fragment } from "react";
import NavBar from "../NavBar";
import RecordGrid from "../RecordGrid";
import styles from "./style.module.css";
import { getRecords } from "../client/records.js";

class App extends PureComponent {
  state = { records: null };

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async query => {
    const response = await getRecords({ query: query });
    this.setState({ records: response });
  };

  render() {
    const { records } = this.state;
    return (
      <div className={styles.container}>
        {records && (
          <Fragment>
            <NavBar records={records} fetchRecords={this.fetchRecords} />
            <RecordGrid records={records} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
