import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarWithHeader from "../../components/sidebar";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getUser } from "../../redux/slices/users/userSlice";
import { Shop } from "../shop/shop";
import { Profile } from "../Profile/profile";
import { Cart } from "../cart/cart";
import { Trending } from "../trending/trending";
import { fetchItem } from "../../redux/slices/item/itemSlice";
import { fetchCart } from "../../redux/slices/cart/cartSlice";
import { fetchPost } from "../../redux/slices/posts/postSlice";

export const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(dispatch);
    fetchItem(dispatch);
    fetchCart(dispatch);
    fetchPost(dispatch, 1);
  }, [location, navigate, dispatch]);

  const renderComponent = () => {
    switch (location.pathname) {
      case "/shop":
        return <Shop />;

      case "/trending":
        return <Trending />;

      case "/cart":
        return <Cart />;

      case "/profile":
        return <Profile />;

      default:
        return <Shop />;
    }
  };

  //   const dispatch = useAppDispatch();
  //   const reduxPosts = useAppSelector(selectPost);
  //   const reduxComments = useAppSelector(selectComment);
  //   const username = useAppSelector(selectUserName);
  //   const email = useAppSelector(selectUserEmail);
  //   const [title, setTitle] = useState < string > "";
  //   const [body, setBody] = useState < string > "";

  //   useEffect(() => {
  //     fetchPost(dispatch);
  //     fetchComment(dispatch);
  //   }, [dispatch]);

  //   const fetchHandler = () => {
  //     fetchPost(dispatch);
  //   };

  //   const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitle(event.target.value);
  //   };

  //   const bodyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setBody(event.target.value);
  //   };

  //   // const data = {
  //   //   title: title,
  //   //   body: body,
  //   //   user_id: "63e8acf877bd493a82a8cfa2",
  //   // };
  //   const data = {
  //     title: title,
  //     body: body,
  //     user_id: "63e8b65577bd493a82a8cfa8",
  //   };

  //   const clickHandler = () => {
  //     createPost(dispatch, data);
  //   };

  //   const addCommentHandler = (id: string) => {
  //     createComment(dispatch, { name: "comment", message: "message", id: id });
  //   };

  //   const editHandler = (title: string, body: string) => {
  //     setTitle(title);
  //     setBody(body);
  //   };

  //   const saveHandler = (id: string) => {
  //     // Send data to server
  //     const newData = { title: title, body: body };
  //     editPost(dispatch, id, newData);
  //   };

  //   const deleteHandler = (
  //     id: string,
  //     event: React.MouseEvent<HTMLButtonElement>
  //   ) => {
  //     deletePost(dispatch, id);
  //   };

  //   const createUserHandler = (name: string, email: string, password: string) => {
  //     createUser(dispatch, { name, email, password });
  //   };

  //   const loginUserHandler = (name: string, email: string, password: string) => {
  //     loginUser(dispatch, { name, email, password });
  //     fetchPost(dispatch);
  //   };

  //   const logoutUserHandler = () => {
  //     logoutUser(dispatch);
  //   };

  return (
    <SidebarWithHeader>{renderComponent()}</SidebarWithHeader>
    // <Flex
    //   height="100%"
    //   width="100%"
    //   justify="center"
    //   align="center"
    //   direction="column"
    //   gap="20px"
    // >
    //   <Button
    //     onClick={(e) =>
    //       createUserHandler("123123", "ganny123@gmail.com", "123123123")
    //     }
    //   >
    //     NEW USER
    //   </Button>
    //   <Button
    //     onClick={(e) =>
    //       loginUserHandler("gasdfn", "ganny@gmail.com", "123123123")
    //     }
    //   >
    //     LOGIN
    //   </Button>
    //   <Button onClick={(e) => logoutUserHandler()}>LOGOUT</Button>
    //   <Text>{username}</Text>
    //   <Text>{email}</Text>
    //   <Input title="title" onChange={titleHandler} value={title} />
    //   <Input title="body" onChange={bodyHandler} value={body} />
    //   <Button onClick={clickHandler}>add data</Button>
    //   <Button onClick={(e) => fetchHandler()}>fetch</Button>
    //   {
    //     <SimpleGrid minChildWidth="200px" spacing="40px" width="100vw">
    //       {reduxPosts?.map((data: any) => {
    //         return (
    //           <Flex
    //             key={data?._id?.$oid}
    //             direction="column"
    //             gap="10px"
    //             justify="center"
    //             align="center"
    //             backgroundColor="lightblue"
    //             borderRadius="10px"
    //             width="180px"
    //           >
    //             <Text as="b">Comments</Text>
    //             {data?.comments?.map((comment: any) => {
    //               return <Text key={comment._id.$oid}>{comment.message}</Text>;
    //             })}
    //             <Text as="b">Content</Text>
    //             <Text>{data?.title}</Text>
    //             <Text>{data?.body}</Text>
    //             <Button onClick={(e) => editHandler(data?.title, data?.body)}>
    //               Edit
    //             </Button>
    //             <Button onClick={(e) => addCommentHandler(data?._id.$oid)}>
    //               Add Comment
    //             </Button>
    //             <Button onClick={(e) => saveHandler(data?._id?.$oid)}>
    //               Save
    //             </Button>
    //             <Button onClick={(e) => deleteHandler(data?._id?.$oid, e)}>
    //               Delete
    //             </Button>
    //           </Flex>
    //         );
    //       })}
    //     </SimpleGrid>
    //   }
    // </Flex>
  );
};
