import React, { Component } from "react";
import Record from "../Record";
import styles from "./style.module.css";
import PropTypes from "prop-types";

export class RecordGrid extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    const { currentPage, pageCount, updatePage } = this.props;
    // account for case where user is on last page and updates search query
    if (currentPage > pageCount) {
      updatePage(pageCount);
    }
    return false;
  }

  handlePageChange = direction => {
    const { currentPage, pageCount, updatePage } = this.props;

    if (direction === "forward" && pageCount >= currentPage + 1) {
      updatePage(currentPage + 1);
      window.scrollTo(0, 0);
    } else if (direction === "backward" && currentPage - 1 !== 0) {
      updatePage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  render() {
    const {
      allRecords,
      filteredRecords,
      updateRecords,
      pageCount,
      currentPage
    } = this.props;
    const records = filteredRecords ? filteredRecords : allRecords;

    return (
      <div className={styles.container}>
        <div className={styles.recordsContainer}>
          {records[currentPage] &&
            records[currentPage].map((record, i) => {
              return (
                <Record
                  key={i}
                  record={record}
                  allRecords={allRecords}
                  updateRecords={updateRecords}
                  pageCount={pageCount}
                />
              );
            })}
        </div>
        <div className={styles.paginationContainer}>
          <i
            onClick={() => this.handlePageChange("backward")}
            id={styles.leftArrow}
            className="fa fa-fast-backward fa-3x"
            style={
              currentPage !== 1
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          />
          <p className={styles.pageLabel}>
            {currentPage}/{pageCount}
          </p>
          <i
            onClick={() => this.handlePageChange("forward")}
            id={styles.rightArrow}
            className="fa fa-fast-forward fa-3x"
            style={
              currentPage !== pageCount
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          />
        </div>
      </div>
    );
  }
}

RecordGrid.propTypes = {
  allRecords: PropTypes.object.isRequired,
  filteredRecords: PropTypes.object,
  updateRecords: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired
};

export default RecordGrid;
