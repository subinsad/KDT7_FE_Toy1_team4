import { useEffect, useState } from "react";
import Block from "../Common/Block";
import React from "react";
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import Profile from "../Common/Profile";
import Button from "../Common/Button";



export interface IPost {
    id: string;
    photo?: string;
    title: string;
    textContent: string;
    userId: string;
    username: string
    createdAt: number;
}

export default function PostList() {
    const [dialogStates, setDialogStates] = useState<{ [postId: string]: boolean }>({});

    const handleBtn = (postId: string) => {
        setDialogStates((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    const navigate = useNavigate();
    const ViewPost = () => {
        // navigate 함수를 사용하여 경로를 변경
        navigate('/post/${post.id}');
    };


    const [posts, setPosts] = useState<IPost[]>([])

    const fetchPosts = async () => {
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("createAt", "desc")
        )
        const spanshot = await getDocs(postsQuery)
        const posts = spanshot.docs.map(doc => {
            const { title, textContent, createdAt, userId, username, photo } = doc.data();
            return {
                title, textContent, createdAt, userId, username, photo, id: doc.id
            }
        });
        setPosts(posts)
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    return <>
        <div className="list">
            <ul className={"board"}>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href="" onClick={ViewPost}>

                            <Profile filename={"pic1"} />
                            <div className="board__status">2023-01-29</div>
                            <div className="board__title">{post.title}</div>
                            <div className="board__writer">{post.userId}</div>


                        </a>
                        <div className="board__more">
                            <Button className={"btn-more"} onClick={() => handleBtn(post.id)} />
                            {dialogStates[post.id] && (
                                <dialog open>
                                    <ul>
                                        <li>
                                            <button>수정</button>
                                        </li>
                                        <li>
                                            <button>삭제</button>
                                        </li>
                                    </ul>
                                </dialog>
                            )}

                        </div>
                    </li>
                ))}

            </ul>
        </div >
    </>;
}