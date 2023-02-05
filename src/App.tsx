import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "./redux/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  fetchData,
  createData,
  selectData,
  deleteData,
  editData,
} from "./redux/slices/posts/postSlice";

function App() {
  const dataRedux = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const bodyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const data = { title: title, body: body };

  const clickHandler = () => {
    createData(dispatch, data);
  };

  const editHandler = (title: string, body: string) => {
    console.log(title, body);
    setTitle(title);
    setBody(body);
  };

  const saveHandler = (id: string) => {
    // Send data to server
    const newData = { title: title, body: body };
    editData(dispatch, id, newData);
  };

  const deleteHandler = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    deleteData(dispatch, id);
  };

  return (
    <Flex
      height="100%"
      width="100vw"
      justify="center"
      align="center"
      direction="column"
      gap="20px"
    >
      <Input title="title" onChange={titleHandler} value={title} />
      <Input title="body" onChange={bodyHandler} value={body}/>
      <Button onClick={clickHandler}>add data</Button>
      {dataRedux?.map((data: any) => {
        return (
          <Flex
            key={data?._id?.$oid}
            direction="column"
            gap="10px"
            justify="center"
            align="center"
            backgroundColor="lightblue"
            borderRadius="10px"
          >
            <Text>{data.title}</Text>
            <Text>{data.body}</Text>
            <Button onClick={(e) => editHandler(data.title, data.body)}>
              Edit
            </Button>
            <Button onClick={(e) => saveHandler(data?._id?.$oid)}>Save</Button>
            <Button onClick={(e) => deleteHandler(data?._id?.$oid, e)}>
              Delete
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default App;
