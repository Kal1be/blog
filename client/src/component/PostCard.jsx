import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

const  PostCard = ({post}) => {
  return (
    <div>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="" />
      </Link>
    </div>
  )
}



PostCard.PropTypes={
post:PropTypes.element.isRequired,
}

export default PostCard
