import React, { useEffect, useState } from "react";
import axios from "axios";

export const Post = (props) => {
  console.log(props)
  const [state, setState] = useState({
    isLoading: true,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (props.staticContext) {
      setState({
        isLoading: false,
        title: props.staticContext.title,
        description: props.staticContext.body,
      });
    } else if (window.initial_state) {
      setState({
        isLoading: false,
        title: window.initial_state.title,
        description: window.initial_state.body,
      });
    } else {
      setState({
        isLoading: true,
        title: "",
        description: "",
      });
    }
  }, []);

  // fetch data
  const fetchData = () => {
    console.log("Post.fetchData()");

    return axios
      .get("https://jsonplaceholder.typicode.com/posts/3")
      .then((response) => {
        return {
          title: response.data.title,
          body: response.data.body,
        };
      });
  };

  // when component mounts, fetch data
  useEffect(() => {
    console.log("axios");
    if (state.isLoading) {
      console.log("Post.componentDidMount()");

      fetchData().then((data) => {
        setState({
          isLoading: false,
          title: data.title,
          description: data.body,
        });
      });
    }
  }, []);

  console.log("Post.render()");

  return (
    <div className="ui-post">
      <p className="ui-post__title">Post Widget</p>

      {state.isLoading ? (
        "loading..."
      ) : (
        <div className="ui-post__body">
          <p className="ui-post__body__title">{state.title}</p>
          <p className="ui-post__body__description">{state.description}</p>
        </div>
      )}
    </div>
  );
};

Post.getInitialProps = async () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts/3")
    .then((response) => {
      return {
        title: response.data.title,
        body: response.data.body,
      };
    });
};
