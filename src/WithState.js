import React, { useRef, useState, useContext, createContext } from "react";
import Draggable from "react-draggable";

const MyContext = createContext({ boxes: [], selected: null });

function App() {
  const [boxes, setBoxes] = useState({});
  const [selected, setSelected] = useState(null);

  return (
    <MyContext.Provider
      value={{
        boxes,
        setBoxes,
        selected,
        setSelected,
        total: Object.keys(boxes).length,
        createBox: () => {
          const id = new Date().toISOString();
          setBoxes({ ...boxes, [id]: { x: 100, y: 100 } });
        },
      }}
    >
      <Under />
    </MyContext.Provider>
  );
}

const Under = React.memo(() => {
  return (
    <>
      <Create />
      <Boxes />
      <BigNumber />
    </>
  );
});

function Create() {
  const { createBox } = useContext(MyContext);
  return <button onClick={createBox}>add</button>;
}

function Boxes() {
  const { boxes } = useContext(MyContext);

  return (
    <div>
      {Object.entries(boxes).map(([id, box]) => (
        <DrawBox key={id} id={id} box={box} />
      ))}
    </div>
  );
}

function DrawBox({ id, box }) {
  const { setBoxes, selected, setSelected } = useContext(MyContext);
  const ref = useRef(null);

  return (
    <Draggable
      nodeRef={ref}
      position={{ x: box.x, y: box.y }}
      onStop={(_event, data) => {
        setBoxes((cur) => ({ ...cur, [id]: { ...box, x: data.x, y: data.y } }));
      }}
    >
      <div
        ref={ref}
        onClick={() => {
          setSelected(id);
        }}
        className={`box ${selected ? "box__selected" : ""}`}
      >
        box
      </div>
    </Draggable>
  );
}

function BigNumber() {
  const { total } = useContext(MyContext);
  return <div className="big-number">{total}</div>;
}

export default App;
