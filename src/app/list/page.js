'use client'
import React from 'react'

export default function page() {
  const [count, setCount] = React.useState(0);

    const handleClick = React.useCallback(() => {
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child handleClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ handleClick }) => {
  return <button onClick={handleClick}>Click Me</button>;
});