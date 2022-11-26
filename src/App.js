import { Button, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import MapUsers from "./components/MapUsers";
import UserForm from "./components/UserForm";
import { AuthContext } from "./context/AuthContext";
import useUsers, {
  useAddUser,
  useDeleteUser,
  useEditUser,
} from "./hooks/useUsers";

const App = () => {
  const { user, login, logout, register } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(null);
  const { data: users, isLoading, isFetching } = useUsers(page);

  const {
    mutate: deleteUser,
    isLoading: isDeleting,
    isSuccess: deletedUser,
  } = useDeleteUser();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    isSuccess: updatedUser,
  } = useEditUser();

  const {
    mutate: createUser,
    isLoading: isCreating,
    isSuccess: createdUser,
  } = useAddUser();

  const handleDeleteUser = (id) => {
    deleteUser({ id });
  };

  const handleUpdateUser = (id, e) => {
    e.preventDefault();
    const { first_name, last_name, email } = e.target;
    const data = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
    };
    updateUser({ id: id, data });
    setUpdate(null);
  };

  const prevPage = () => {
    page !== 1 && setPage(page - 1);
  };

  const nextPage = () => {
    page !== 2 && setPage(page + 1);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = e.target;
    const data = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
    };
    createUser(data);
  };

  useEffect(() => {
    if (deletedUser && !isDeleting) {
      alert("Deleted User successfully");
    }
  }, [deletedUser, isDeleting]);

  useEffect(() => {
    if (updatedUser && !isUpdating) {
      alert("Updated User successfully");
    }
  }, [updatedUser, isUpdating]);

  useEffect(() => {
    if (createdUser && !isCreating) {
      alert("Created User successfully");
    }
  }, [createdUser, isCreating]);

  return (
    <Container w="2xl" p="50px">
      {user && (
        <Button type="button" onClick={() => logout()}>
          Logout
        </Button>
      )}
      <Heading>Users</Heading>

      {!isLoading && !isFetching && (
        <MapUsers
          users={users?.data}
          setUpdate={setUpdate}
          update={update}
          handleDeleteUser={handleDeleteUser}
          handleUpdateUser={handleUpdateUser}
        />
      )}

      <Flex w="100%" py="20px">
        <Button onClick={() => prevPage()}>Prev</Button>
        <Spacer />
        <Button onClick={() => nextPage()}>Next</Button>
      </Flex>

      <Heading>Create User</Heading>
      <UserForm func={handleCreateUser} />

      {!user && (
        <>
          <Heading>Login User</Heading>
          <LoginForm func={login} isLoging={true} />
          <Heading>Register User</Heading>
          <LoginForm func={register} />
        </>
      )}
    </Container>
  );
};

export default App;
