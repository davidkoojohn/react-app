import {memo, ReactNode, useState} from "react";
import * as api from "../../api"
import {useResource} from "../../utils/resource";


interface IStarButtonProps {
  watched: boolean
  onWatch: (watched: boolean) => void
}
function StarButton({ watched, onWatch }: IStarButtonProps) {
  const icon = watched
    ?
    <svg className="icon" viewBox="0 0 1056 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2763" width="20" height="20">
      <path d="M859.731434 1018.241799l-327.897532-179.815807-324.794502 185.542018 66.891097-372.587566-273.930397-256.783755 369.228616-50.448235L524.764111 0l161.293596 341.397313L1055.990103 385.383568l-269.547766 261.454295z" fill="#1296db" p-id="2764"></path>
    </svg>
    : <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2322" width="20" height="20">
      <path d="M939.408393 441.561741 699.453323 617.322767l97.696066 267.560802c4.069689 12.240789-0.190335 25.708522-10.576893 33.420157-5.304819 3.914146-11.603269 5.90243-17.898649 5.90243-6.03853 0-12.075013-1.813299-17.243733-5.435803L509.473457 746.369865 270.246981 919.942039c-10.488889 7.214309-24.405853 6.984065-34.69008-0.586354-10.254551-7.510044-14.647605-20.684088-10.92891-32.833803l79.256088-268.88189L82.084507 441.47476c-10.694573-7.510044-15.267728-21.064758-11.308557-33.506115 3.955078-12.416797 15.513322-20.86112 28.593222-20.86112l291.582915 0 88.023776-267.25688c3.927449-12.385075 19.041682-21.429055 32.079626-21.48636 0.046049 0 0.088004 0 0.130983 0 12.993942 0 20.905122 8.925277 24.920576 21.25407l90.720188 267.48917 295.41622 0c13.097296 0 24.681122 8.469905 28.623921 20.945031C954.788685 420.525636 950.146968 434.084443 939.408393 441.561741zM631.833249 425.328012c-16.627702 0-34.136471-10.657734-39.272445-26.433022l-84.219123-260.419148-82.977853 260.121366c-5.04183 15.885805-22.644743 26.730805-39.388079 26.730805L121.013121 425.328012l206.597335 164.54252c13.556761 9.534144 12.376888 26.657126 7.54279 42.47437L262.533298 885.519042l225.64004-166.150134c13.193487-9.045003 30.629601-8.936533 43.716664 0.260943l231.676523 167.409824L667.1148 630.809943c-5.343705-16.080234 0.545422-33.725102 14.476713-43.444465l223.99354-162.037467L631.833249 425.328012z" p-id="2323" fill="#cdcdcd"></path>
    </svg>

  return (
    <button
      className={"flex items-center text-center border rounded-md px-2 w-30 h-10 hover:bg-blue-100 "+`${watched && "border-blue-400 text-blue-400"}`}
      onClick={() => onWatch(!watched)}
    >
      {icon}&nbsp;Watch
    </button>
  )
}

interface Article {
  author: string
  formattedDate: string
  id: number
  image: string
  summary: string
  title: string
  url: string
}
interface IArticlesProps {
  data: Array<Article>
}

function ArticleItem({ title, summary, author, formattedDate, image }: Article) {
  return (
    <div className={"flex justify-between py-4 border-b hover:bg-blue-100 px-4"}>
      <div className={"mr-6"}>
        <div className={"text-2xl"}>{title}</div>
        <div className={"text-sm my-4 text-gray-600"}>{summary}</div>
        <div className={"text-md text-gray-600"}>
          <span className={"mr-10"}>{author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
      <img className={"bg-gray-300 h-40 w-40 rounded-lg object-cover"} src={image} alt=""/>
    </div>
  )
}

function ArticleList({ data }: IArticlesProps) {
  return (
    <div className={"border rounded-lg p-6 mt-4"}>
      {data.map((item, index) => (
        <ArticleItem
          key={item.id}
          author={item.author}
          formattedDate={item.formattedDate}
          id={item.id}
          image={item.image}
          summary={item.summary}
          title={item.title}
          url={item.url}
        />
      ))}
    </div>
  )
}


interface ITabItem {
  title: string,
  content: ReactNode
}
interface ITabsProps {
  tabs: ITabItem[]
  selectedIndex: number
  setSelectIndex: (index: number) => void
}
function Tabs({ tabs, selectedIndex, setSelectIndex }: ITabsProps) {
  const tabButtons = tabs.map((item, index) => (
    <button
      className={"mr-2 px-2 py-1 text-gray-500 "+`${index === selectedIndex && "border-b-2 border-gray-700 text-gray-700"}`}
      key={item.title}
      onClick={() => setSelectIndex(index)}
    >
      {item.title}
    </button>
  ))

  return (
    <dl>
      <dt className={"border-b"}>
        {tabButtons}
      </dt>
      <dd className={"pt-4"}>
        <div>{tabs[selectedIndex].content}</div>
      </dd>
    </dl>
  )
}

interface ITradeContentProps {
  price: string
  type: string
  symbol: string
}

function TradeContent({ price, type, symbol }: ITradeContentProps) {
  const [val, setVal] = useState<string>("")

  const toTransform = (type: string) => {
    switch (type) {
      case "Buy":
        return parseFloat((Number(val) / Number(price)).toFixed(7)).toString() + " BTC"
      case "Sell":
        return (Number(val) * Number(price)).toString() + " USD"
      case "Convert":
        return parseFloat((Number(val) / Number(price)).toFixed(7)).toString() + " BTC"
    }
  }

  return (
    <div className={"flex flex-col justify-center items-center h-40"}>
      <input
        className={"text-6xl text-gray-800 placeholder-opacity-50 text-center w-full focus:outline-none"}
        placeholder="0"
        type={"number"}
        value={val}
        onChange={(e) => {setVal(e.target.value)}}
      />
      <span className={"text-sm text-gray-400"}>Enter a value in {symbol}</span>
      <button
        className={"border rounded-md py-2 px-6 mt-4"}
        disabled={val.length === 0}
      >
        {type} {val.length > 0 && toTransform(type)}
      </button>
    </div>
  )
}

interface ITradeProps {
  price: string
}
function Trade({ price }: ITradeProps) {
  const [selectIndex, setSelectIndex] = useState<number>(0)

  return (
    <div className={"border rounded-md mt-4 p-6"}>
      <div className={"text-2xl pb-4"}>Trade</div>
      <Tabs
        tabs={[
          { title: "Buy", content: <TradeContent type={"Buy"} price={price} symbol={"USD"} /> },
          { title: "Sell", content: <TradeContent type={"Sell"} price={price} symbol={"BTC"} /> },
          { title: "Convert", content: <TradeContent type={"Buy"} price={price} symbol={"USD"} /> },
        ]}
        selectedIndex={selectIndex}
        setSelectIndex={setSelectIndex}
      />
    </div>
  )
}

type ILink = {
  url: string
  title: string
}
type IInfo = {
  content: string
  title: string
  price: string
  links: ILink[]
}

function Info({ content, title, links }: IInfo) {
  return (
    <div className={"border p-6 rounded-lg"}>
      <div className={"text-2xl"}>{title}</div>
      <p className={"my-4 text-sm text-gray-600"}>{content}</p>
      <dl>
        <dt className={"text-sm text-gray-600"}>RESOURCES</dt>
        <dd className={"p-2"}>
          <ul className={"list-disc ml-6 text-blue-500"}>
            {links.map(item => (
              <li key={item.title}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  )
}

const Overview = memo(() => {
  const info = useResource<IInfo>(api.info(1))
  const articles = useResource<Article[]>(api.articles())

  return <div>
    <Info price={info.price} content={info.content} title={info.title} links={info.links}/>
    <Trade price={info.price} />
    <ArticleList data={articles}/>
  </div>
})

export default function Dashboard() {
  const [selectIndex, setSelectIndex] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)

  return (
    <div className={""}>
      <div className={"flex justify-between items-center py-4"}>
        <span className={"text-3xl"}>Dashboard</span>
        <StarButton watched={watched} onWatch={setWatched}/>
      </div>
      <Tabs
        tabs={[
          { title: "Overview", content: <Overview /> },
          { title: "Wallet", content: "Test content" },
          { title: "Vault", content: "Test content" },
        ]}
        selectedIndex={selectIndex}
        setSelectIndex={setSelectIndex}
      />
    </div>
  )
}


