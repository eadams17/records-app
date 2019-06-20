import React, { PureComponent } from "react";
import ArtistBlock from "../ArtistBlock";
import styles from "./style.module.css";

class RecordGrid extends PureComponent {
  state = { records: null };

  render() {
    const {
      recordsByArtist,
      updateArtist,
      updateRecords,
      getNextResults
    } = this.props;
    const artists = Object.keys(recordsByArtist);
    console.log("record-grid", recordsByArtist);
    return (
      <div className={styles.container}>
        {artists.map((artist, i) => {
          const records = recordsByArtist[artist].records;
          return (
            <ArtistBlock
              key={i}
              artist={artist}
              records={records}
              updateArtist={updateArtist}
              updateRecords={updateRecords}
              getNextResults={getNextResults}
              isLast={i === artists.length - 1}
            />
          );
        })}
      </div>
    );
  }
}

export default RecordGrid;
