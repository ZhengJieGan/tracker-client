import { Button, Flex, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "./redux/hooks/hooks";
import React from "react";
import {
  selectCount,
  increment,
  decrement,
} from "./redux/slices/counter/counterSlice";
import * as API from "./api/index";

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  async function fetchData(): Promise<any> {
    try {
      await API.fetchPosts().then((res) => console.log(res));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  fetchData()

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
      <Button onClick={() => dispatch(increment())}>add</Button>
      <Button onClick={() => dispatch(decrement())}>minus</Button>
      <Button>getData</Button>
    </Flex>
  );
}

export default App;
