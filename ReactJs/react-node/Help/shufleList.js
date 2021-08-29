import { render } from "react-dom";
import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash/shuffle";
import "./styles.css";

let data = [
  {
    name: "Rare Wind"
  },
  {
    name: "Saint Petersburg"
  },
  {
    name: "Deep Blue"
  },
  {
    name: "Ripe Malinka"
  },
  {
    name: "Near Moon"
  },
  {
    name: "Wild Apple"
  }
];

function App() {
  const [rows, set] = useState(data);
  const height = 20;
  const transitions = useTransition(
    rows.map((data, i) => ({ ...data, y: i * height })),
    d => d.name,
    {
      from: { position: "absolute", opacity: 0,marginLeft:100 },
      leave: { height: 0, opacity: 0,marginLeft:100 },
      enter: ({ y }) => ({ y, opacity: 1 ,marginLeft:0}),
      update: ({ y }) => ({ y })
    }
  );

  return (
    <div class="list">
      <button onClick={() => set(shuffle(rows))}>shuffle</button>
      <button onClick={() => set(rows.slice(1))}>remove first</button>
      <button
        onClick={() =>
          set([
            { name: `list item ${Math.floor(Math.random() * 1000)}` },
            ...rows
          ])
        }
      >
        add first
      </button>
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          class="card"
          style={{
            transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
            ...rest
          }}
        >
          <div class="cell">
            <div class="details">{item.name}</div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
