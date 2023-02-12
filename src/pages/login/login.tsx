import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  loginUser,
  selectValidation,
} from "../../redux/slices/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {  useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validation = useAppSelector(selectValidation);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (validation === true) {
      navigate("/");
    } else {
      console.log("Login failed");
    }
  }, [validation, navigate]);

  const loginUserHandler = () => {
    loginUser(dispatch, { email, password })
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={emailHandler} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={passwordHandler} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={loginUserHandler}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an account?{" "}
              <Link color={"blue.400"} href={"/signup"}>
                Sign Up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
