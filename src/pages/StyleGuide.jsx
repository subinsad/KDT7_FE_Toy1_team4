import React, { useState } from "react";
import Heading from "../components/Heading";
import Block from "../components/Block";
import Board from "../components/Board/Board";
import Profile from "../components/Profile";
import pic1 from "../assets/profile1.jpg";
import BusinessCard from "../components/BusinessCard";
import Text from "../components/Text";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import { testOption } from "../data/selectOption";
import Textarea from "../components/Form/Textarea";
import Checkbox from "../components/Form/Checkbox";

const StyleGuide = () => {
  const [modal, setModal] = useState(false);

  const nullOption = () => {
    return "";
  };

  return (
    <div>
      <Heading tag={"h2"} size={"large"} text={"large"} />
      <Heading tag={"h2"} size={"regular"} text={"regular"} />
      <Heading tag={"h2"} size={"small"} text={"small"} />

      <hr />

      <Text type={"type1"} text={"type1"} />

      <hr />

      <Button className={"btn regular primary"} text="btn regular primary" />
      <Button className={"btn regular danger"} text="btn regular danger" />
      <Button className={"btn regular success"} text="btn regular success" />
      <br />
      <Badge situation={"primary"} text={"primary"} />
      <Badge situation={"danger"} text={"danger"} />
      <Badge situation={"success"} text={"success"} />

      <hr />

      <Block>block</Block>

      <hr />

      {/* 파일은 import해서 적용해야함. */}
      <Profile filename={pic1} />

      <hr />

      {/*  */}
      <BusinessCard />

      <hr />

      {/* 
        종류 : card, list 
      */}
      <Board type={"card"} headingTag={"h2"} headingText={"Card List"} />
      <Board type={"list"} headingTag={"h2"} headingText={"Board List"} />

      <hr />

      <Button
        className={"btn regular primary"}
        text="팝업열기"
        onClick={() => {
          setModal(true);
        }}
      />
      <Dialog openModal={modal} closeModal={() => setModal(false)} title={"popuptitle"}>
        팝업내용
      </Dialog>

      <hr />

      <Input width={"20rem"} />
      <br />
      <Select placeholder={"선택하세요"} options={testOption} onChangeOption={nullOption} />
      <br />
      <Textarea width={"100%"} height={"10rem"} />
      <br />
      {/* 체크박스 라디오버튼 디자인필요 */}
      {/* https://react.pixelstrap.com/cuba-context/app/ecommerce/checkout/Dubai */}
      <Checkbox type={"type1"} id={"chk1_1"} text="선택하세요" />
    </div>
  );
};

export default StyleGuide;
