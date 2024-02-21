import Block from '../Common/Block';
import profileDefault from '../../assets/profile_default.png';
import { useNavigate } from 'react-router';

function BoardListItem(props) {
    const { post } = props;
    const navigate = useNavigate();

    // 세부페이지 경로
    const ViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    return (
        <Block>
            <a href="" onClick={() => ViewPost(post.id)}>
                <img src={post.photo || profileDefault} alt="" />
                <div className="gallery__info">
                    <div className="board__title">{post.title}</div>
                    <div className="board__content">{post.textContent}</div>
                    <div className="board__writer">{post.username}</div>
                </div>
            </a>
        </Block>
    );
}

export default BoardListItem;
