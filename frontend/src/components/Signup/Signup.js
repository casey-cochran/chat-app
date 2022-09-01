import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { Form, FormGroup, Label, Input, Container, Col, Row, Button } from "reactstrap";
import './Signup.css';

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    try {
      const setUser = await csrfFetch("/user/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await setUser.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="s-background">
    <Container className="min-vh-100 f-center ">
      <Form className="col-sm-6 form"  onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up Here</h1>
        <FormGroup>
        <div className="pb-2">
          <Label>Username</Label>
          <Input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        </FormGroup>
        <FormGroup>
        <div className="pb-2">
          <Label>Email</Label>
          <Input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        </FormGroup>
        <FormGroup>
        <div className="pb-2">
          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        </FormGroup>
        <Button color='primary'>Submit</Button>
      </Form>
    </Container>
    </div>
  );
};

export default Signup;
