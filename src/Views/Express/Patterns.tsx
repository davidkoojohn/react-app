import {Children, ReactNode, useEffect, useState, CSSProperties} from "react";

const styled: Record<string, CSSProperties> = {
  list: {
    display: "flex",
    flexDirection: "column"
  },
  span: {
    background: "#0ff",
    padding: "5px 10px",
    marginBottom: "10px"
  }
}

interface IButtonProps {
  title: ReactNode
  onClick?: () => void,
}
function Button({ onClick, title }: IButtonProps) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}

interface IChildrenButton {
  children: ReactNode,
  onClick: () => void
}
function ChildrenButton({ onClick, children }: IChildrenButton) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

interface ITab {
  id: string
  title: string
  content: string
}

interface ITabsProps {
  tabs: ITab[]
}
function Tabs({ tabs }: ITabsProps) {
  const [activeIndex, setActiveIndex] = useState<string>(tabs[0].id)
  useEffect(() => {
    console.log(activeIndex)
  }, [activeIndex])

  return (
    <dl>
      <dt>
        {tabs.map(item => (
          <ChildrenButton
            key={item.id}
            onClick={() => setActiveIndex(item.id)}
          >
            <span className={"m-1 p-1 bg-green-200"}>{item.title}</span>
          </ChildrenButton>
        ))}
      </dt>
      <dd className={"border border-gray-400"}>
        <div>
          {tabs.find(item => (item.id === activeIndex))?.content}
        </div>
      </dd>
    </dl>
  )
}

interface IRenderProps {
  tabIds: string[],
  renderTitle: (id: string) => ReactNode
  renderContent: (id: string) => ReactNode
}
function RenderTabs({ tabIds, renderTitle, renderContent }: IRenderProps) {
  const [activeId, setActiveId] = useState(tabIds[0])
  return (
    <dl>
      <dt>
        {tabIds.map(item => (
          <ChildrenButton key={item} onClick={() => setActiveId(item)}>
            {renderTitle(item)}
          </ChildrenButton>
        ))}
      </dt>
      <dd>
        <div>{renderContent(activeId)}</div>
      </dd>
    </dl>
  )
}

interface ITextInputProps {
  onSubmit: () => void,
  val: string,
  setVal: (value: string) => void,
}
function TextInput({ onSubmit, val, setVal }: ITextInputProps) {
  return (
    <form
      onSubmit={
        e => {
          e.preventDefault()
          onSubmit()
          setVal("")
        }
      }
    >
      <input
        className={"border border-gray-700"}
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </form>
  )
}

interface IListProps {
  children: ReactNode
}
function List({ children }: IListProps) {
  console.log(children)
  return (
    <div style={styled.list}>
      {Children.toArray(children).map((child, index, array) => (
        <div key={index} style={styled.span}>
          {child}
          {index < array.length - 1 && <hr key={`hr-${index}`} />}
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: 'a', title: 'Tab A', content: 'Tab content A' },
  { id: 'b', title: 'Tab B', content: 'Tab content B' },
  { id: 'c', title: 'Tab C', content: 'Tab content C' },
]
export default function Patterns() {
  const [val, setVal] = useState("")

  return (
    <div>
      <div>Patterns</div>
      <List>
        <span key={"f"}>first</span>
        <span key={"s"}>second</span>
        <span key={"t"}>third</span>
      </List>
      <hr/>
      <TextInput
        val={val}
        setVal={setVal}
        onSubmit={ () => { console.log(val) } }
      />
      <hr/>
      <RenderTabs
        tabIds={TABS.map(item => item.id)}
        renderTitle={
          (id) => TABS.find(item => item.id === id)?.title
        }
        renderContent={
          (id) => [1,2,3].map(i => (<div key={i}>{TABS.find(item => item.id === id)?.content}</div>))
        }
      />
      <hr/>
      <Tabs tabs={ TABS }/>
      <hr/>
      <Button
        title={<>Hello, <span className={"text-red-400"}>world!</span></>}
        onClick={() => {console.log("button clicked")}}
      />
      <br/>
      <ChildrenButton onClick={() => {console.log("button clicked")}}>
        Hello, <span className={"text-red-400"}>children!</span>
      </ChildrenButton>
    </div>
  )
}



