import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logInUser } from "../../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const logUser = await dispatch(logInUser(user));
    if (logUser.error) {
      return setErrors(logUser.payload.errors);
    }
    setEmail("");
    setPassword("");
    setErrors([]);
    navigate("/");
  };

  return (
    <div className="s-background">
      <Container className="min-vh-100 d-flex justify-content-center align-items-center ">
        <Form className="col-sm-6 form" onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up Here</h1>
          <FormGroup>
            <div className="pb-2">
              <Label>Email</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={errors.email ? true : false}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="pb-2">
              <Label>Password</Label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                invalid={errors.password ? true : false}
              />
              <FormFeedback>{errors.password}</FormFeedback>
            </div>
          </FormGroup>
          <div className="d-flex align-items-center pb-3">
            <p className="mb-0">Not a user yet? Sign up</p>
            <Button onClick={() => navigate("/signup")} color="link">
              here
            </Button>
          </div>
          <Button color="primary">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
