import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "./redux/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  selectCount,
  increment,
  decrement,
} from "./redux/slices/counter/counterSlice";
import {
  fetchData,
  createData,
  selectData,
} from "./redux/slices/posts/postSlice";

function App() {
  const count = useAppSelector(selectCount);
  const dataRedux = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const bodyHandler = (e: any) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const data = { title: title, body: body };

  const ClickHandler = () => {
    createData(dispatch, data);
  };

  return (
    <Flex
      height="100vh"
      width="100vw"
      justify="center"
      align="center"
      direction="column"
      gap="20px"
    >
      <Text>{count}</Text>
      <Input title="title" onChange={titleHandler} />
      <Input title="body" onChange={bodyHandler} />
      <Button onClick={() => dispatch(increment())}>add</Button>
      <Button onClick={() => dispatch(decrement())}>minus</Button>
      <Button onClick={ClickHandler}>add data</Button>
      {dataRedux?.map((data: any) => {
        return <Text key={data.title}>{data.title}</Text>;
      })}
    </Flex>
  );
}

export default App;
