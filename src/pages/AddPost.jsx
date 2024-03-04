import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import Block from '../components/Common/Block';
import Heading from '../components/Common/Heading';
import Text from '../components/Common/Text';
import Input from '../components/Form/Input';
import Textarea from '../components/Form/Textarea';
import AddFile from '../components/Form/AddFile';

import { useSelector, useDispatch } from 'react-redux';

import './AddPost.scss';
import { addPost, addPostWithImg } from '../store/post.slice';

const AddPost = ({ username }) => {
    const { userInfo } = useSelector((state) => state.userSlice); //userSlice에서 user 정보들을 가져옴
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goTolist = () => {
        navigate('/notice');
    };
    const [isLoading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        //글 작성 하는 모든 인풋 데이터들을 한곳에 받음
        title: '',
        textContent: '',
        file: null,
    });

    const handleChange = (e) => {
        //title,textContent 인풋 타이핑
        const { id, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const onFileChange = (e) => {
        //file 등록
        const { files } = e.target;
        if (files && files.length === 1) {
            setPostData((prevData) => ({
                ...prevData,
                file: files[0],
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //postData의 객체로 지정해야함
        if (isLoading || postData.title === '' || postData.title.length > 50)
            return;

        try {
            const userConfirmed = window.confirm('글을 등록하시겠습니까?');
            if (!userConfirmed) {
                return;
            }
            setLoading(true);

            const docRef = await addDoc(collection(db, 'posts'), {
                title: postData.title,
                textContent: postData.textContent,
                createAt: new Date().toLocaleString(),
                username: userInfo.name,
                userId: userInfo.userId,
            });
            //dispatch로 작성한 값을 붙여주는 코드 추가
            dispatch(
                addPost({
                    title: postData.title,
                    textContent: postData.textContent,
                    createAt: new Date().toLocaleString(),
                    username: userInfo.name,
                    userId: userInfo.userId,
                })
            );

            if (postData.file) {
                const locationRef = ref(
                    storage,
                    `posts/${userInfo.userId}/${docRef.id}`
                );
                const result = await uploadBytes(locationRef, postData.file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(docRef, {
                    photo: url,
                });
                dispatch(
                    addPostWithImg({
                        photoURL: url,
                        id: docRef.id,
                    })
                );
            }
            navigate('/notice');
        } catch (error) {
            console.error('글 등록 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="notice__wrapper">
            <Block>
                <Heading tag={'h2'} size={'large'} text={'Post Edit'} />
                <Text
                    type={'type1'}
                    text={'게시판에 등록할 글을 작성해주세요.'}
                />
                <hr />

                <form onSubmit={onSubmit}>
                    <div className="notice__wrapper__contents">
                        <div className="file">
                            <Text
                                className="align center"
                                type={'type2'}
                                text={'첨부파일 : '}
                            />
                            <input
                                onChange={onFileChange}
                                width={'95%'}
                                type="file"
                                id="file"
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <Input
                                width={'100%'}
                                placeholder="제목을 작성해주세요."
                                id="title"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Textarea
                                onChange={handleChange}
                                id="textContent"
                                placeholder="글을 작성해주세요."
                                width={'100%'}
                                height={'22rem'}
                            />
                        </div>
                        <AddFile
                            id={'file'}
                            text={
                                postData.file
                                    ? '파일이 추가되었습니다'
                                    : '첨부파일'
                            }
                            file={postData.file}
                        />
                        <div className="align center">
                            <button
                                type="button"
                                className="btn regular danger"
                                onClick={goTolist}>
                                뒤로가기
                            </button>
                            <Input
                                width={'100%'}
                                type="submit"
                                className="btn regular primary"
                                value={isLoading ? '로딩중' : '글쓰기'}
                                onClick={onSubmit}
                            />
                        </div>
                    </div>
                </form>
            </Block>
        </div>
    );
};

export default AddPost;
