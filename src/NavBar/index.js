import React, { PureComponent } from "react";
import styles from "./style.module.css";
import { Input } from "reactstrap";
// import { debounce } from "lodash";

class NavBar extends PureComponent {
  state = { searchQuery: "" };

  handleSearchQuery = e => {
    const queryString = e.currentTarget.value;
    this.setState({ searchQuery: queryString }, () => {
      this.props.fetchRecords(queryString);
    });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            DISCOgraphy{" "}
            <span role="img" aria-label="space-invader">
              👾
            </span>
          </a>
        </div>
        <Input
          className={styles.searchBar}
          placeholder="type your search query here..."
          defaultValue={searchQuery}
          onChange={this.handleSearchQuery}
        />
      </div>
    );
  }
}

export default NavBar;
