import {useState} from "react";

export default function Landing() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Landing</h1>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
    </>
  )
}
