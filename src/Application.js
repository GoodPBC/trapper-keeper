import React, { Component } from "react";
import "./Application.css";

import { Storage } from "aws-amplify";

class Application extends Component {
  state = {
    files: []
  };

  async componentDidMount() {
    //get s3 bucket key list
    const files = await Storage.list("");
    //log list to console
    console.log(files);

    const urls = await Promise.all(
      files.map(async file => await Storage.get(file.key))
    );
    console.log({ urls });
  }

  handleSubmit = event => {
    event.preventDefault();

    const file = this.fileInput.files[0];
    const { name } = file;

    console.log(file, name);
  };

  render() {
    return (
      <div className="Application">
        <form className="NewItem" onSubmit={this.handleSubmit}>
          <input type="file" ref={input => (this.fileInput = input)} />
          <input className="full-width" type="submit" />
        </form>
        <section className="Application-images" />
      </div>
    );
  }
}

export default Application;
