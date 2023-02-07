import { Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "./redux/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  fetchPost,
  createPost,
  selectPost,
  deletePost,
  editPost,
  createComment,
} from "./redux/slices/posts/postSlice";
import {
  fetchComment,
  selectComment,
} from "./redux/slices/comments/commentSlice";
import {
  createUser,
  loginUser,
  logoutUser,
  selectUserEmail,
  selectUserName,
} from "./redux/slices/users/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const reduxPosts = useAppSelector(selectPost);
  const reduxComments = useAppSelector(selectComment);
  const username = useAppSelector(selectUserName);
  const email = useAppSelector(selectUserEmail);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    fetchPost(dispatch);
    fetchComment(dispatch);
  }, [dispatch]);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const bodyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const data = { title: title, body: body };

  const clickHandler = () => {
    createPost(dispatch, data);
  };

  const addCommentHandler = (id: string) => {
    createComment(dispatch, { name: "comment", message: "message", id: id });
  };

  const editHandler = (title: string, body: string) => {
    setTitle(title);
    setBody(body);
  };

  const saveHandler = (id: string) => {
    // Send data to server
    const newData = { title: title, body: body };
    editPost(dispatch, id, newData);
  };

  const deleteHandler = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    deletePost(dispatch, id);
  };

  const createUserHandler = (name: string, email: string, password: string) => {
    createUser(dispatch, { name, email, password });
  };

  const loginUserHandler = (name: string, email: string, password: string) => {
    loginUser(dispatch, { name, email, password });
  };

  const logoutUserHandler = () => {
    logoutUser(dispatch);
  };

  return (
    <Flex
      height="100%"
      width="100%"
      justify="center"
      align="center"
      direction="column"
      gap="20px"
    >
      <Button
        onClick={(e) => createUserHandler("gan", "zz@gmail.com", "123123123")}
      >
        NEW USER
      </Button>
      <Button
        onClick={(e) => loginUserHandler("gan", "zz@gmail.com", "123123123")}
      >
        LOGIN
      </Button>
      <Button onClick={(e) => logoutUserHandler()}>LOGOUT</Button>
      <Text>{username}</Text>
      <Text>{email}</Text>
      <Input title="title" onChange={titleHandler} value={title} />
      <Input title="body" onChange={bodyHandler} value={body} />
      <Button onClick={clickHandler}>add data</Button>
      {
        <SimpleGrid minChildWidth="200px" spacing="40px" width="100vw">
          {reduxPosts?.map((data: any) => {
            return (
              <Flex
                key={data?._id?.$oid}
                direction="column"
                gap="10px"
                justify="center"
                align="center"
                backgroundColor="lightblue"
                borderRadius="10px"
                width="180px"
              >
                <Text as="b">Comments</Text>
                {data?.comments?.map((comment: any) => {
                  return <Text key={comment._id.$oid}>{comment.message}</Text>;
                })}
                <Text as="b">Content</Text>
                <Text>{data?.title}</Text>
                <Text>{data?.body}</Text>
                <Button onClick={(e) => editHandler(data?.title, data?.body)}>
                  Edit
                </Button>
                <Button onClick={(e) => addCommentHandler(data?._id.$oid)}>
                  Add Comment
                </Button>
                <Button onClick={(e) => saveHandler(data?._id?.$oid)}>
                  Save
                </Button>
                <Button onClick={(e) => deleteHandler(data?._id?.$oid, e)}>
                  Delete
                </Button>
              </Flex>
            );
          })}
        </SimpleGrid>
      }
    </Flex>
  );
}

export default App;
