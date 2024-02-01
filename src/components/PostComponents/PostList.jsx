import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db, storage } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import Profile from "../Common/Profile";
import Button from "../Common/Button";
import { deleteObject, ref } from "firebase/storage";

export default function PostList() {
    const user = auth.currentUser;
    const [dialogStates, setDialogStates] = useState({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    // 삭제기능
    const onDelete = async (postId, userId, photo) => {
        const ok = confirm("삭제하시겠습니까?")
        if (!ok || user?.uid !== userId) return;
        try {
            // postId를 사용하여 deleteDoc 호출
            await deleteDoc(doc(db, "posts", postId));
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${postId}`)
                await deleteObject(photoRef);
            }
            // 삭제 후 게시물 목록 갱신
            fetchPosts();
        } catch (error) {
            console.error("게시물 삭제 중 에러:", error);
        }
    }

    // 수정삭제버튼
    const handleBtn = (postId) => {
        setDialogStates((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    // 세부페이지 경로
    const ViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    // 쿼리등록 (posts에 등록)
    const fetchPosts = async () => {
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("createAt", "desc")
        );

        try {
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map(doc => {
                const { title, textContent, createAt, userId, usernames, photo } = doc.data();
                return {
                    title, textContent, createAt, userId, usernames, photo, id: doc.id
                };
            });
            setPosts(newPosts);
        } catch (error) {
            console.error("게시물 목록 가져오기 중 에러:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="list">
            <ul className={"board"}>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href="" onClick={() => ViewPost(post.id)}>
                            <Profile filename={"pic1"} />
                            <div className="board__status">{post.createAt}</div>
                            <div className="board__title">{post.title}</div>
                            <div className="board__writer">{post.usernames}</div>
                        </a>

                        {user?.uid === post.userId ? (
                            <div className="board__more">
                                <Button className={"btn-more"} onClick={() => handleBtn(post.id)} />
                                <dialog open={dialogStates[post.id] || false} >
                                    <ul>
                                        <li>
                                            <button>수정</button>
                                        </li>
                                        <li>
                                            <button onClick={() => onDelete(post.id, post.userId, post.photo)}>삭제</button>
                                        </li>
                                    </ul>
                                </dialog>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );

}
