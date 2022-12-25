import React from "react";
import { NavLink as Link, Route, Routes } from "react-router-dom";

// import child components
import { Counter } from "../counter";
import { Post } from "../post";
import { Helmet } from "react-helmet";

// export entry application component
export const App = (props) => {
  // render view
    console.log(props)

  return (
    <div className="ui-app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="ui-app__navigation">
        <Link
          className={({ isActive }) =>
            isActive
              ? "ui-app__navigation__link ui-app__navigation__link--active"
              : "ui-app__navigation__link"
          }
          to="/"
        >
          Counter
        </Link>

        <Link
          className={({ isActive }) =>
            isActive
              ? "ui-app__navigation__link ui-app__navigation__link--active"
              : "ui-app__navigation__link"
          }
          to="/post"
        >
          Post
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Counter name="Monica Geller" />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
};
