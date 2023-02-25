import { Flex, Box, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../../components/itemCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { updateCart } from "../../redux/slices/cart/cartSlice";
import { itemDetails } from "../../redux/slices/item/itemSlice";

export const Shop = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<boolean>(false);

  const onViewHandler = () => {
    setSelected(!selected);
    navigate("/item");
  };

  const Items = useAppSelector(itemDetails);

  return (
    <Flex>
      <SimpleGrid
        minChildWidth="380px"
        spacing="20px"
        width="100%"
        justifyItems="center"
      >
        {Items.map((item) => {
          return (
            <ItemCard
              key={item._id.$oid}
              id={item._id.$oid}
              image={item.image}
              title={item.title}
              onClick={onViewHandler}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
