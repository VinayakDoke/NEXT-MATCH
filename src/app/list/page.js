'use client'
import React from 'react'

export default function page() {
  const [count, setCount] = React.useState(0);

    const handleClick = React.useCallback(() => {
    console.log("Clicked!",count);
  }, []);

  // const handleClick = () => {
  //   console.log("Clicked!",count);
  // };
  console.log("Clicked!",count);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child handleClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ handleClick }) => {
  console.log("Child rendered");
  return <button onClick={handleClick}>Click Me</button>;
});