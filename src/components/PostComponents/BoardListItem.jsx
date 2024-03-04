import Block from '../Common/Block';
import profileDefault from '../../assets/profile_default.png';
import { Link } from 'react-router-dom';

function BoardListItem({ post }) {
    return (
        <Block>
            <Link to={`/posts/${post.id}`}>
                <img src={post.photo || profileDefault} alt="" />
                <div className="gallery__info">
                    <div className="board__title">{post.title}</div>
                    <div className="board__content">{post.textContent}</div>
                    <div className="board__writer">{post.username}</div>
                </div>
            </Link>
        </Block>
    );
}

export default BoardListItem;
