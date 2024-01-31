import Text from "../Common/Text";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";

const PostDetailText = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postDoc = await getDoc(doc(db, "posts", id));

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPost(postData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Text text={"hello"}>  </Text>
            <h2>{post.title}</h2>
            <p>{post.textContent}</p>
            {/* Add other details as needed */}
        </div>
    );
};

export default PostDetailText;
