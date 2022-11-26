import { Button, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const LoginForm = ({ func, isLoging = false }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const data = {
          email: email.value,
          password: password.value,
        };
        func(data);
      }}
    >
      <FormLabel>Email</FormLabel>
      <Input type="email" name="email" />
      <FormLabel>Password</FormLabel>
      <Input name="password"></Input>
      <Button my="10px" type="submit">
        {isLoging ? "Login" : "Register"}
      </Button>
    </form>
  );
};

export default LoginForm;
