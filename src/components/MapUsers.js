import { Button, Card, Grid } from "@chakra-ui/react";
import React from "react";
import UserForm from "./UserForm";

const MapUsers = ({
  users,
  handleDeleteUser,
  setUpdate,
  handleUpdateUser,
  update,
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {users?.map((user) =>
        user.id !== update ? (
          <div key={user.id}>
            <Card p="20px" textAlign="center">
              <img src={user.avatar} alt="profile_picture" />
              <h1>{user.id}</h1>
              <h1>
                {user.last_name} {user.first_name}
              </h1>
              <h4>{user.email}</h4>
              <Button onClick={() => handleDeleteUser(user.id)} my="10px">
                Delete
              </Button>
              <Button onClick={() => setUpdate(user.id)}>Update</Button>
            </Card>
          </div>
        ) : (
          <UserForm
            func={handleUpdateUser}
            user={user}
            isUpdate={true}
            setUpdate={setUpdate}
          />
        )
      )}
    </Grid>
  );
};

export default MapUsers;
