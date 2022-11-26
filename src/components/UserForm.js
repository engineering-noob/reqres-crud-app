import { Button, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const UserForm = ({ func, user, isUpdate, setUpdate }) => {
  return (
    <form onSubmit={(e) => (isUpdate ? func(user.id, e) : func(e))}>
      <FormLabel>First Name</FormLabel>
      <Input defaultValue={user?.first_name} name="first_name" />
      <FormLabel>Last Name</FormLabel>
      <Input defaultValue={user?.last_name} name="last_name"></Input>
      <FormLabel>Email</FormLabel>
      <Input defaultValue={user?.email} name="email" type="email"></Input>
      <Button my="10px" type="submit">
        {isUpdate ? "Update User" : "Create User"}
      </Button>
      {isUpdate && (
        <Button my="10px" type="button" onClick={() => setUpdate(null)}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default UserForm;
