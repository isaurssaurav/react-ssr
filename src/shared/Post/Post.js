import * as React from "react";
import "./Post.css";
import axios from "axios";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    let initialData;
    if (props.initialData) {
      initialData = props.initialData;
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }
    this.state = {
      posts: initialData
    };
  }

  static fetchInitialData = () => {
    return axios.get("http://localhost:3000/api/posts").then(response => {
      return response.data;
    });
  };

  hello = () => {
    alert("hello");
  };
  render() {
    return (
      <div className="col-md-12">
        <div className="title animated fadeInDown" id="title">
          React SSR
        </div>
        <nav>
          <div id="navigation">
            <a href="#">Home</a>
            <a href="#"> Post</a>
          </div>
        </nav>
        <div className="container">
          <ul className="blog-post columns-2">
            {this.state.posts
              ? this.state.posts.map((post, index) => {
                  return (
                    <li key={index}>
                      <img src="https://dummyimage.com/600x400/000/fff" />
                      <h3>{post.name}</h3>
                      <p>{post.description}</p>
                      <div onClick={this.hello} className="button">
                        Read More
                      </div>
                    </li>
                  );
                })
              : "No post found"}
          </ul>
        </div>
      </div>
    );
  }
}
