import React from "react";
import Block from "../Common/Block";
import { IPost } from "./PostList";

export default function Post({ username, photo, title }) {
    return
    <Block>
        {username}
        {title}
    </Block>
}