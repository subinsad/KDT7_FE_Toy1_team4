import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import BoardListItem from './BoardListItem';
import PageNation from './PageNation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/post/postSlice';

export default function BoardGallery({ pagination }) {
    const user = auth.currentUser;
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 4; // 페이지당 항목 수

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postSlice);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        // 글이 추가될 때마다 페이지 수 다시 계산
        const totalPages = Math.ceil(posts.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [posts, itemsPerPage]); // currentPage를 의존성 배열에서 제거

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 초기 렌더링 시에 첫 번째 페이지를 보여주도록 설정
    useEffect(() => {
        setCurrentPage(1);
    }, [posts, itemsPerPage]);

    return (
        <div className={'gallery'}>
            <ul className={'board'}>
                {/* 비동기로 가져오기 때문에 post가 undefined로 오류발생, 비어있는지 확인 후 slice를 호출 */}
                {posts && posts.length > 0 ? (
                    posts
                        .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                        )
                        .map((post) => (
                            <li key={post.id}>
                                <BoardListItem post={post} />
                            </li>
                        ))
                ) : (
                    <li>No posts available</li>
                )}
            </ul>

            {pagination && (
                <PageNation
                    currentPage={currentPage}
                    totalPages={Math.ceil(posts.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
