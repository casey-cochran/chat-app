import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { Form, FormGroup, Label, Input, Container, Col, Row } from "reactstrap";

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
    <div >
      <Container>
        <Row>
        <Col></Col>
        <Col>
      <Form className=".col-6 .col-sm-4"  onSubmit={handleSubmit}>
        <FormGroup>
        <div>
          <Label>Username</Label>
          <Input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
        </FormGroup>
      </Form>
      </Col>
      <Col></Col>
      </Row>
      </Container>
    </div>
  );
};

export default Signup;
