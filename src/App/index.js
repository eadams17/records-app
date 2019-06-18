import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import ItemGrid from "../ItemGrid";
import styles from "./style.module.css";

class App extends PureComponent {
  state = { recordData: null };
  componentDidMount() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl =
      "https://gist.githubusercontent.com/seanders/df38a92ffc4e8c56962e51b6e96e188f/raw/b032669142b7b57ede3496dffee5b7c16b8071e1/page1.json";
    const url = proxyUrl + targetUrl;
    fetch(url)
      .then(result => result.json())
      .then(response => {
        this.setState({
          recordData: response.results,
          nextPageUrl: response.nextPage
        });
      });
  }
  render() {
    const { recordData } = this.state;
    return (
      <div className={styles.container}>
        <NavBar />
        {recordData && <ItemGrid records={recordData} />}
      </div>
    );
  }
}

export default App;
