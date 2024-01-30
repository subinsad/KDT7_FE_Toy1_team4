import React, { useState } from "react";
import Board from "../components/Board/Board";
import Profile from "../components/Common/Profile";
import BoardList from "../components/Board/BoardList";
import { useNavigate } from 'react-router-dom';
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";
import "./AddPost.scss"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddPost = () => {
    const [isLoading, setLoading] = useState(false)
    const [Title, setTitle] = useState("")
    const [TextContent, setTextContent] = useState("")
    const [file, setFile] = useState(null)
    const onChange = (e) => {
        setTitle(e.target.value)
    }
    const onFileChange = (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser
        if (!user || isLoading || Title === "" || Title.length > 50) return; {
            try {
                setLoading(true);
                const collectionRef = collection(db, "posts");
                await addDoc(collectionRef, {
                    title: Title,
                    textContent: TextContent,
                    createAt: Date.now(),
                    usernames: user.displayName || "익명",
                    userId: user.uid,

                })

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
    }
    return (
        <div className="notice__wrapper">
            <Block onSubmit={onSubmit}>
                <Heading tag={"h2"} size={"large"} text={"Post Edit"} />
                <hr />
                <div className="align">
                    <Text type={"type2"} text={"작성자 : "} />
                    <Text type={"type1"} text={"박수빈"} />
                </div>

                <div className="align vm">
                    <Text className="align center" type={"type2"} text={"첨부파일 : "} />
                    {file ? "Photo added ✅" : "Add photo"}
                    <input onChange={onFileChange} width={"95%"} type="file" id="file" accept="image/*" />



                </div>



                <Text type={"type2"} text={"제목 : "} value={Title} maxLength={50} />
                <Input width={"100%"} />

                <Text type={"type2"} text={"내용 : "} value={TextContent} />
                <Textarea onChange={onChange} placeholder="글을 작성해주세요." width={"100%"} height={"10rem"} />

                <button className="btn regular primary" type="submit" >글 등록</button>
                {/* 뒤로가기 색상추가 고려(회색) */}
                <button className="btn regular " >뒤로가기</button>
            </Block>

        </div>
    );
};

export default AddPost;
