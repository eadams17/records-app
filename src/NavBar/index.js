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
import { matchRecordEntry } from "./helperFunctions";
import { getFullCollection } from "../utils/sharedHelperFunctions.js";
import PropTypes from "prop-types";

export class NavBar extends PureComponent {
  state = { searchType: "Search By", dropdownOpen: false, searchQuery: "" };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  changeValue = e => {
    this.setState({ searchType: e.currentTarget.textContent, searchQuery: "" });
    this.input.focus();
  };

  handleSearchQuery = e => {
    const searchString = e.currentTarget.value;

    this.setState({ searchQuery: searchString }, () => {
      this.filterRecordEntries(searchString);
    });
  };

  filterRecordEntries(searchString) {
    const { searchType } = this.state;
    // have default search to all without any user interaction with dropdown
    const searchCategory = searchType === "Search By" ? "all" : searchType;
    const { allRecords, updateRecords } = this.props;
    const pageCount = Object.keys(allRecords).length;
    const fullCollection = getFullCollection(allRecords, pageCount);

    const filteredRecords = fullCollection.filter(record =>
      matchRecordEntry(record, searchString, searchCategory)
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
        <p className={styles.instructions}>
          The ultimate record collection application. Click on any album to
          update the record's information.
        </p>
        <div className={styles.searchContainer}>
          <InputGroup size="sm">
            <Input
              innerRef={ref => {
                this.input = ref;
              }}
              id={styles.searchBar}
              placeholder="type here..."
              value={searchQuery}
              onChange={this.handleSearchQuery}
            />
          </InputGroup>
          <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className={styles.button} caret size="sm">
              {searchType}
            </DropdownToggle>
            <DropdownMenu className={styles.menu}>
              {searchType !== "Search By" && (
                <DropdownItem onClick={this.changeValue} dropdownvalue="all">
                  all
                </DropdownItem>
              )}
              <DropdownItem onClick={this.changeValue} dropdownvalue="album">
                album
              </DropdownItem>
              <DropdownItem onClick={this.changeValue} dropdownvalue="artist">
                artist
              </DropdownItem>
              <DropdownItem onClick={this.changeValue} dropdownvalue="year">
                year
              </DropdownItem>
              <DropdownItem
                onClick={this.changeValue}
                dropdownvalue="condition"
              >
                condition
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  allRecords: PropTypes.object.isRequired,
  filteredRecords: PropTypes.object,
  updateRecords: PropTypes.func.isRequired,
  currentPage: PropTypes.number
};

export default NavBar;
