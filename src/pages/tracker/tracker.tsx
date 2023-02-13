import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  fetchPost,
  selectPost,
  selectTotal,
} from "../../redux/slices/posts/postSlice";
import { Flex, Text, Button } from "@chakra-ui/react";

export const Tracker = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const post = useAppSelector(selectPost);
  const total = useAppSelector(selectTotal);

  useEffect(() => {
    fetchPost(dispatch, page);
  }, [page]);

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <Flex>
      {post?.map((data: any) => {
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
          </Flex>
        );
      })}
      {page === 1 ? null : <Button onClick={prevPage}>Prev</Button>}
      {total - page * 5 > 0 ? <Button onClick={nextPage}>Next</Button> : null}
    </Flex>
  );
};
