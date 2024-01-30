import React, { useState } from "react";
import Heading from "../components/Common/Heading";
import Block from "../components/Common/Block";
import Board from "../components/Board/Board";
import Profile from "../components/Common/Profile";
import pic1 from "../assets/profile1.jpg";
import BusinessCard from "../components/BusinessCard";
import Text from "../components/Common/Text";
import Dialog from "../components/Common/Dialog";
import Button from "../components/Common/Button";
import Badge from "../components/Common/Badge";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import { testOption, tel } from "../data/selectOption";
import Textarea from "../components/Form/Textarea";
import Checkbox from "../components/Form/Checkbox";
import PersonInfoList from "../components/PersonInfoList";
import TimeBlock from "../components/TimeBlock";
import Radio from "../components/Form/Radio";

const StyleGuide = () => {
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

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
      <Text type={"type2"} text={"type2"} />

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

      <Button
        className={"btn regular primary"}
        text="경고창"
        onClick={() => {
          setAlertModal(true);
        }}
      />

      <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
        경고창
      </Dialog>

      <hr />

      <Input width={"20rem"} />
      <br />
      <Select placeholder={"선택하세요"} options={testOption} onChangeOption={nullOption} />
      <br />
      <Textarea width={"100%"} height={"10rem"} />
      <br />
      {/* 체크박스 라디오버튼 디자인필요 */}
      {/* https://react.pixelstrap.com/cuba-context/app/ecommerce/product/Rome#javascript */}
      <Checkbox type={"type1"} id={"chk1_1"} text="선택하세요" />
      <Radio type={"type1"} id={"chk1_1"} text="선택하세요" />

      <hr />

      <PersonInfoList />
      <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico1"} />
      <TimeBlock time={"11:00:20"} title={"근무종료"} icon={"ico2"} />
      <TimeBlock time={"11:00:20"} title={"근무시각"} icon={"ico3"} />
      <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico4"} />
    </div>
  );
};

export default StyleGuide;
