import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { getDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { useNavigate } from 'react-router-dom';

import Block from "../Common/Block";
import Heading from "../Common/Heading";
import AddFile from "../Form/AddFile";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";

const PostUpdate = () => {
    return (
        <div className="notice__wrapper">
            <Block>
                <Heading tag={"h2"} size={"large"} text={"Post Edit"} />
                <Text type={"type1"} text={"게시판에 등록할 글을 작성해주세요."} />
                <hr />

                <form onSubmit={""}>
                    <div className="notice__wrapper__contents">
                        <div className="align">
                            <Text type={"type2"} text={"작성자 : "} />
                            <Text type={"type1"} text={usernames || "익명"} />

                        </div>

                        <div className="file">
                            <Text className="align center" type={"type2"} text={"첨부파일 : "} />
                            <input onChange={""} width={"95%"} type="file" id="file" accept="image/*" />
                        </div>

                        <div>
                            <Input width={"100%"} placeholder="제목을 작성해주세요." onChange={""} required />
                        </div>

                        <div>
                            <Textarea onChange={onChangeTextContent} placeholder="글을 작성해주세요." width={"100%"} height={"22rem"} />

                        </div>

                        <AddFile id={"file"} file={file} />

                        <div className="align center">
                            <Input width={"100%"} type="submit" className="btn regular primary"
                                value={isLoading ? "로딩중" : "글쓰기"} onClick={""}
                            />
                            {/* 뒤로가기 색상추가 고려(회색) */}
                            <button type="button" className="btn regular danger" onClick={""} >뒤로가기</button>
                        </div>

                    </div>

                </form>
            </Block>
        </div>
    );
}

export default PostUpdate