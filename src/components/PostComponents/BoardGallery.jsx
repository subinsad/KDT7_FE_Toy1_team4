import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import React from 'react';

import BoardListItem from './BoardListItem';

export default function BoardGallery({ pagination }) {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 4; // 페이지당 항목 수

    // slice() 메서드를 사용하여 현재 페이지에 해당하는 항목만 추출.
    // 이를 위해 currentPage와 itemsPerPage를 사용하여 시작 인덱스와 끝 인덱스를 계산
    // currentPage 값이 변경되는 시점에만 계산, 리렌더링 방지
    const currentPages = useMemo(() => {
        return posts.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [posts, currentPage]);

    // 삭제 등의 작업 후에 목록을 다시 가져오는 함수
    const fetchPosts = async () => {
        const postsQuery = query(
            collection(db, 'posts'),
            orderBy('createAt', 'desc')
        );

        try {
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map((doc) => {
                const {
                    title,
                    textContent,
                    createAt,
                    userId,
                    username,
                    photo,
                } = doc.data();
                return {
                    title,
                    textContent,
                    createAt,
                    userId,
                    username,
                    photo,
                    id: doc.id,
                };
            });
            setPosts(newPosts);
        } catch (error) {
            console.error('게시물 목록 가져오기 중 에러:', error);
        }
    };

    // 세부페이지 경로
    const ViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]); // 페이지 변경 시에만 fetchPosts 호출

    return (
        <div className={'gallery'}>
            <ul className={'board'}>
                {currentPages.map((post) => (
                    <li key={post.id}>
                        <BoardListItem
                            post={post}
                            key={post.id} // BoardListItem 컴포넌트에 key prop을 추가
                            id={post.id}
                            img={post.photo}
                            title={post.title}
                            username={post.username}
                            createAt={post.createAt} // createAt props를 전달
                            ViewPost={ViewPost} // ViewPost 함수를 전달
                        />
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {pagination && (
                <div className="align right">
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prevPage) => prevPage - 1)
                            }>
                            이전
                        </button>
                        <button
                            disabled={
                                posts.length <= itemsPerPage * currentPage
                            }
                            onClick={() =>
                                setCurrentPage((prevPage) => prevPage + 1)
                            }>
                            다음
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
