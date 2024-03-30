import {  useSelector } from "react-redux";
import PropTypes from 'prop-types';

const ThemeProvider=(props)=> {
    const {theme} = useSelector((state)=>state.theme)
  return (
    <div className={theme}>
        <div className="bg-white text-gray-700 dark:text-gray-100 dark:bg-gray-700 min-h-screen">
          {props.app}
        </div>
      
    </div>
  )
}

ThemeProvider.propTypes = {
  app: PropTypes.element.isRequired, // Example of prop validation
};

export default ThemeProvider
