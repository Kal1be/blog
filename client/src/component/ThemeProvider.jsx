import {  useSelector } from "react-redux";


const ThemeProvider=(props)=> {
    const {theme} = useSelector((state)=>state.theme)
  return (
    <div className={theme}>
        <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
          {props.app}
        </div>
      
    </div>
  )
}

export default ThemeProvider
