import React, { useState } from "react";
import {Helmet} from "react-helmet";

export const Counter = (props) => {
  const [count, setCount] = useState(0);
  // increment the `state.count` value
  const increment = () => {
    console.log("Counter.increment()");

    setCount((prevState) => prevState + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Counter Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="ui-counter">
        <p className="ui-counter__title">Counter Widget</p>

        <div className="ui-counter__body">
          <p className="ui-counter__body__name">{props.name}</p>
          <p className="ui-counter__body__count">{count}</p>
          <button
            className="ui-counter__body__button"
            onClick={() => increment()}
            disabled={count === 3}
          >
            Increment
          </button>
        </div>
      </div>
    </>
  );
};
