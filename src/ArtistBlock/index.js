import React, { Component } from "react";
import Record from "../Record";
import styles from "./style.module.css";
import { Input, Button } from "reactstrap";

class ArtistBlock extends Component {
  state = { iconVisible: false, editActive: false, artistEdit: "" };

  toggleIcon = () => {
    this.setState(prevState => ({
      iconVisible: !prevState.iconVisible
    }));
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      editActive: !prevState.editActive
    }));
  };

  handleSubmit = () => {
    const { artist, updateArtist } = this.props;
    const artistUpdate = {
      oldName: artist,
      newName: this.state.artistEdit
    };
    updateArtist(artistUpdate);
    this.toggleEdit();
  };

  render() {
    const {
      artist,
      records,
      updateRecords,
      getNextResults,
      isLast
    } = this.props;
    const { editActive, iconVisible } = this.state;
    return (
      <div className={styles.rowContainer}>
        {!editActive && (
          <div
            className={styles.artistContainer}
            onMouseEnter={this.toggleIcon}
            onMouseLeave={this.toggleIcon}
            onClick={this.toggleEdit}
          >
            <i
              className={
                iconVisible ? "fas fa-pencil-alt" : "fas fa-user-circle"
              }
            />
            <p className={styles.artist}>{artist}</p>
          </div>
        )}
        {editActive && (
          <div className={styles.artistContainer}>
            <i
              onClick={this.toggleEdit}
              id={styles.editIcon}
              className="far fa-times-circle fa-2x"
            />
            <Input
              defaultValue={artist}
              className={styles.editField}
              onChange={e => this.setState({ artistEdit: e.target.value })}
            />
            <Button
              className={styles.button}
              onClick={() => this.handleSubmit()}
              onKeyPress={this.handleKeyPress}
            >
              Save
            </Button>
          </div>
        )}
        <div className={styles.recordGroup}>
          {records.map((record, i) => {
            return (
              <Record
                key={i}
                artistName={artist}
                record={record}
                isLast={i === records.length - 1}
                updateRecords={updateRecords}
              />
            );
          })}
          {isLast && (
            <div className={styles.paginationContainer}>
              <i
                id={styles.nextIcon}
                className="fas fa-fast-forward fa-5x"
                onClick={() => getNextResults(15)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ArtistBlock;
