import Text from "../Common/Text";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import Block from "../Common/Block";
import Heading from "../Common/Heading";

const PostDetailText = () => {
    const { userId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postDoc = await getDoc(doc(db, "posts", userId));

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPost(postData);
                } else {
                    console.log("No such document!");
                    setPost(null);
                }
            } catch (fetchError) {
                console.error(`사용자 ${userId}에 대한 포스트 가져오기 오류:`, fetchError);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Invalid post data. No post object.</p>;
    }

    return (
        <>
            <Block>
                <div className="align">
                    <Text type={"type1"} text={post.createAt} />
                    <Text type={"type1"} text={post.usernames} />
                </div>
                <Heading tag={"h2"} size={"small"} text={post.title} />
                <hr />
                {post.photo && <img src={post.photo} alt="포스트 이미지" />}
                <Text type={"type1"} text={post.textContent} />
            </Block>
        </>
    );
};

export default PostDetailText;
