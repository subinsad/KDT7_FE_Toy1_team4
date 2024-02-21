import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import BoardListItem from './BoardListItem';
import PageNation from './PageNation';

export default function BoardGallery({ pagination }) {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 4; // 페이지당 항목 수

    useEffect(() => {
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

        fetchPosts();
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
                {posts
                    .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )
                    .map((post) => (
                        <li key={post.id}>
                            <BoardListItem
                                post={post}
                                key={post.id}
                                id={post.id}
                                img={post.photo}
                                title={post.title}
                                username={post.username}
                                createAt={post.createAt}
                            />
                        </li>
                    ))}
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
