import React, { useState } from "react";
import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Divider,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { updateCart } from "../redux/slices/cart/cartSlice";
import { selectUserId } from "../redux/slices/users/userSlice";

const ItemCard = (props: any) => {
  const { id, title, image, onClick } = props;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const addToCartHandler = () => {
    updateCart(dispatch, {
      itemId: id,
      quantity: 1,
      userId: userId,
    });
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Flex justify="center">
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            height="150px"
            width="150px"
          />
        </Flex>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Text>
          <Text color="green.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      {/* <Divider /> */}
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
          <Button variant="ghost" colorScheme="grey" onClick={onClick}>
            View Details
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
