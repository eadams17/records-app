import React, { PureComponent } from "react";
import styles from "./style.module.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  Input
} from "reactstrap";
import { matchRecordEntry } from "../utils/helperFunctions";

class NavBar extends PureComponent {
  state = { searchType: "album", dropdownOpen: false, searchQuery: "" };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  changeValue = e => {
    this.setState({ searchType: e.currentTarget.textContent });
  };

  handleSearchQuery = e => {
    const searchString = e.currentTarget.value;
    this.setState({ searchQuery: searchString }, () => {
      this.filterRecordEntries(searchString);
    });
  };

  filterRecordEntries(searchString) {
    const { searchType } = this.state;
    const { allRecords, updateRecords } = this.props;
    const filteredRecords = allRecords.filter(record =>
      matchRecordEntry(record, searchString, searchType)
    );
    updateRecords(filteredRecords);
  }

  render() {
    const { searchType, dropdownOpen, searchQuery } = this.state;
    return (
      <div className={styles.container}>
        <a style={{ textDecoration: "none" }} href="/">
          <div className={styles.logo}>DISCOgraphy</div>
        </a>
        <div className={styles.searchContainer}>
          <InputGroup size="sm">
            <Input
              className={styles.searchBar}
              placeholder="type here..."
              defaultValue={searchQuery}
              onChange={this.handleSearchQuery}
            />
          </InputGroup>
          <div className={styles.label}>search by</div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className={styles.button} caret size="sm">
              {searchType}
            </DropdownToggle>
            <DropdownMenu className={styles.menu}>
              <DropdownItem onClick={this.changeValue} dropdownvalue="Artist">
                album
              </DropdownItem>
              <DropdownItem onClick={this.changeValue} dropdownvalue="Artist">
                artist
              </DropdownItem>
              <DropdownItem onClick={this.changeValue} dropdownvalue="Year">
                year
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

export default NavBar;
