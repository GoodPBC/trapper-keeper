import React, { Component } from "react";
import "./Application.css";

import { Storage } from "aws-amplify";

class S3Image extends Component {
  // set src to null in state. We wont show component until image is ready
  state = { src: null };

  async componentDidMount() {
    const { S3Key } = this.props;
    const src = await Storage.get(S3Key);
    this.setState({ src });
  }
  render() {
    const { src } = this.state;
    //if we do not have src url,
    if (!src) return null;
    return (
      <article>
        <img src={src} alt="" />
      </article>
    );
  }
}

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
    this.setState({ files: urls });
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
        <section className="Application-images">
          {this.state.files.map(file => {
            return <S3Image file={file} key={file} />;
          })}
        </section>
      </div>
    );
  }
}

export default Application;
