import {createContext, memo, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState} from "react"

const randomDiceRoll = (): number => Math.floor(Math.random() * 6) + 1

function UseStateComponent() {
  const [diceRolls, setDiceRolls] = useState<number[]>([1, 2, 3])

  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>useState</div>
      <button
        className={"bg-green-500 rounded-md px-2 py-1 text-white"}
        onClick={() => setDiceRolls([...diceRolls, randomDiceRoll()])}
      >
        Roll dice
      </button>
      <ul className={"flex"}>
        {diceRolls.map((item, index) => <li key={index} className={"mx-2"}>{item}, </li>)}
      </ul>
    </div>
  );
}


interface IAction {
  value: string;
  type: string
}
interface IInitialState {
  color: string;
  pet: string;
}

const types = {
  PET: 'PET',
  COLOR: 'COLOR',
}
const reducer = (state: any, action: IAction) => {
  switch (action.type) {
    case types.COLOR:
      return { ...state, color: action.value }
    case types.PET:
      return { ...state, pet: action.value }
  }
}
const initialState = {
  color: 'black',
  pet: 'cat',
} as IInitialState

function UseReducerComponent() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>useReducer</div>
      <label>Choose a color and a pet: </label>
      <br />
      <select
        value={state.color}
        onChange={event => {
          dispatch({ type: types.COLOR, value: event.target.value })
        }}
      >
        <option value="black">Black</option>
        <option value="pink">Pink</option>
        <option value="blue">Blue</option>
      </select>
      <select
        value={state.pet}
        onChange={event => {
          dispatch({ type: types.PET, value: event.target.value })
        }}
      >
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="mouse">Mouse</option>
      </select>
      <br />
      <br />
      You chose a {state.color} {state.pet}
    </div>
  )
}


function UseEffect() {
  const [count, setCount] = useState<number>(0)
  const color: string = count % 5 === 0 ? "red" : "blue"

  useEffect(() => {
    console.log(color, count)
    // document.documentElement.style.backgroundColor = color
  }, [color])
  // []- 只调用一次
  // undefined- 未定义或空的依赖项数组，在每个组件渲染时调用

  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>useEffect</div>
      <button
        className={"bg-green-500 rounded-md px-2 py-1 text-white"}
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click HERE to increment: {count}
      </button>
    </div>
  )
}

// memo 记忆值作为性能优化。useMemo，不随state变化而re-render
const Heading = memo(({style, title}: any) => {
  console.log('Rendered:', title)
  return <h1 style={style}>{title}</h1>
})

const Logger = memo((props: any) => {
  props.log()
  return null
})

function UseMemo() {
  const [count, setCount] = useState(0)
  const normalStyle = {
    backgroundColor: 'teal',
    color: 'white',
  }

  const memoizedStyle = useMemo(() => {
    return {
      backgroundColor: 'red',
      color: 'white',
    }
  }, [])

  // 记住函数，除非依赖项数组发生更改
  // 依赖项发生更改，则返回一个新函数。useCallback===
  // 防止不必要的重新渲染
  const count5: number = Math.floor(count / 5)
  const memoizedFunction = useCallback(() => {
    console.log('useCallback')
  }, [count5])
  const normalFunction = () => {
    console.log('normal')
  }

  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>memo & useMemo</div>
      <div className={"text-lg"}>memo & useCallback</div>
      <button
        className={"bg-green-500 rounded-md px-2 py-1 text-white"}
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Increment {count}
      </button>
      <Heading style={memoizedStyle} title="Memoized" />
      <Heading style={normalStyle} title="Normal" />

      <hr/>
      <Logger log={memoizedFunction} />
      <Logger log={normalFunction} />
    </div>
  )
}

function UseRef() {
  const intervalRef = useRef<any>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    intervalRef.current = setInterval(() => setCount(count+1), 1000)
    console.log(intervalRef)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>useRef</div>
      <div style={{ fontSize: 120 }}>{count}</div>
      <button
        className={"bg-green-500 rounded-md px-2 py-1 text-white"}
        onClick={() => {
          clearInterval(intervalRef.current)
        }}
      >
        Stop
      </button>
    </div>
  )
}

/*
function Title({ theme }: any) {
  const style = {
    background: theme.primary,
    color: theme.text,
  }
  return <h1 style={style}>Title</h1>
}

function Nested({ theme }: any) {
  return <Title theme={theme} />
}

function NestedTwice({ theme }: any) {
  return <Nested theme={theme} />
}*/

const ThemeContext: any = createContext({})
function Title() {
  const theme: any = useContext(ThemeContext)
  const style = {
    background: theme.primary,
    color: theme.text,
  }
  return <h1 style={style}>Title</h1>
}

function Nested() {
  return <Title />
}

function NestedTwice() {
  return <Nested />
}

function UseContext() {
  const theme = {
    primary: 'dodgerblue',
    text: 'white',
  }
  return (
    <div className={"border border-gray-400 p-4"}>
      <div className={"text-lg"}>useContext</div>
      <ThemeContext.Provider value={theme}>
        <NestedTwice/>
      </ThemeContext.Provider>
    </div>
  )
}

export default function HookDemo() {
  return (
    <div>
      <div className={"text-2xl"}>Hook Demo</div>
      <UseStateComponent/>
      <br/>
      <UseReducerComponent/>
      <br/>
      <UseEffect/>
      <br/>
      <UseMemo/>
      <br/>
      <UseRef/>
      <br/>
      <UseContext/>
    </div>
  )
}

