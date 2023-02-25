import React from "react";
import { useAppSelector } from "../../redux/hooks/hooks";

import { Flex } from "@chakra-ui/react";
import { CartItem } from "../../components/cartItem";
import { cartDetails } from "../../redux/slices/cart/cartSlice";

export const Cart = () => {
  const cart = useAppSelector(cartDetails);
  console.log("Cart: ", cart);

  return (
    <Flex flexDirection="column" gap="20px">
      {cart?.map((item) => {
        return (
          <CartItem
            key={item._id.$oid}
            id={item?._id.$oid}
            image={item?.image}
            title={item?.title}
          />
        );
      })}
    </Flex>
  );
};
