import Text from "../Common/Text";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import Block from "../Common/Block";
import Heading from "../Common/Heading";
import { BeatLoader } from "react-spinners";
import Button from "../Common/Button";
import { getAuth } from 'firebase/auth';
import { ref, deleteObject } from 'firebase/storage';

const PostDetailText = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [dialogStates, setDialogStates] = useState({});

    const location = useLocation();
    const postId = location.state ? location.state.postId : null;

    useEffect(() => {
        const fetchPosts = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            setUser(currentUser);

            try {
                const postDoc = await getDoc(doc(db, "posts", userId));

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPosts([postData]);  // 데이터를 배열로 감싸서 설정
                } else {
                    console.log("No such document!");
                    setPosts([]);  // 문서가 없을 경우 빈 배열로 설정
                }
            } catch (fetchError) {
                console.error(`사용자 ${userId}에 대한 포스트 가져오기 오류:`, fetchError);
                setPosts([]);  // 오류 발생 시 빈 배열로 설정
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId, postId]);

    const onDelete = async (postId, userId, photo) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (!ok || user?.uid !== userId) return;

        console.log("Deleting post. PostId:", postId, "UserId:", userId);

        try {
            // postId를 사용하여 deleteDoc 호출
            await deleteDoc(doc(db, "posts", postId));
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${postId}`)
                await deleteObject(photoRef);
            }
            // 삭제 후 다시 포스트를 가져오기
            fetchPosts();
        } catch (error) {
            console.error("게시물 삭제 중 에러:", error);
        }
    }

    const handleBtn = (postId) => {
        console.log("PostId in handleBtn:", postId);
        setDialogStates((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    if (loading) {
        return (
            <div className="align vm center">
                <BeatLoader size={15} color="#7366ff" />
            </div>
        );
    }

    if (!posts) {
        return <p>Invalid post data. No post object.</p>;
    }

    return (
        <Block>
            <>
                {posts && posts.map(post => (
                    <li key={user.uid}>
                        <div className="align">
                            <Text type={"type1"} text={post.createAt} />
                            <Text type={"type1"} text={post.username} />
                        </div>

                        <Heading tag={"h2"} size={"small"} text={post.title} />
                        <hr />
                        {post.photo && <img src={post.photo} alt="포스트 이미지" />}
                        <Text type={"type1"} text={post.textContent} />

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
            </>
        </Block>
    );
};

export default PostDetailText;
