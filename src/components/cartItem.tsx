import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { deleteFromCart } from "../redux/slices/cart/cartSlice";

export const CartItem = (props: any) => {
  const { id, image, title } = props;
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    deleteFromCart(dispatch, id);
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width="100%"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={image}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={removeHandler}>
            Remove
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
