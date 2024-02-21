import { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Profile from '../Common/Profile';

import { deleteObject, ref } from 'firebase/storage';
import BoardListItem from './BoardListItem';

export default function PostList({ currentPage, itemsPerPage, username }) {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [postsList, setPostsList] = useState([]); // posts 변수명을 postsList로 변경

    // 게시물 목록 가져오기
    const fetchPosts = async () => {
        const postsQuery = query(
            collection(db, 'posts'),
            orderBy('createAt', 'desc')
        );

        try {
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPostsList(newPosts);
        } catch (error) {
            console.error('게시물 목록 가져오기 중 에러:', error);
        }
    };

    // 게시물 삭제
    const handleDelete = async (postId, userId, photo) => {
        const ok = confirm('삭제하시겠습니까?');
        if (!ok || user?.uid !== userId) return;

        try {
            await deleteDoc(doc(db, 'posts', postId));
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${postId}`);
                await deleteObject(photoRef);
            }
            fetchPosts(); // 삭제 후 목록 다시 가져오기
        } catch (error) {
            console.error('게시물 삭제 중 에러:', error);
        }
    };

    // 페이지 변경 시 게시물 목록 다시 가져오기
    useEffect(() => {
        fetchPosts();
    }, [currentPage]); // currentPage가 변경될 때마다 호출

    return (
        <div className="list">
            <ul className={'board'}>
                {postsList.map((post) => (
                    <>
                        <li key={post.id}>
                            <a
                                href=""
                                onClick={() => navigate(`/posts/${post.id}`)}>
                                <Profile filename={post.photo} />
                                <div className="board__status">
                                    {post.createAt}
                                </div>
                                <div className="board__title">{post.title}</div>
                                <div className="board__writer">{username}</div>
                            </a>
                        </li>
                        <BoardListItem
                            key={post.id} // BoardListItem 컴포넌트에 key prop을 추가
                            id={post.id}
                            img={post.photo}
                            title={post.title}
                            username={post.username}
                            createAt={post.createAt} // createAt props를 전달
                            ViewPost={ViewPost} // ViewPost 함수를 전달
                        />
                    </>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <div className="align right">
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => currentPage((prevPage) => prevPage - 1)}>
                        이전
                    </button>
                    <button
                        disabled={
                            postsList.length <= itemsPerPage * currentPage
                        }
                        onClick={() => currentPage((prevPage) => prevPage + 1)}>
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}
