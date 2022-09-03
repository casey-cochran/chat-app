import { useState } from "react";
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
import "./Signup.css";
import { useNavigate } from "react-router";
import { signUpUser, SignUpUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

      const signInUser = await dispatch(signUpUser(user))
      if(signInUser.error){
        return setErrors(signInUser.payload.errors);
      }
      setUserName("");
      setEmail("");
      setPassword("");
      setErrors([]);
      navigate('/');
  };

  return (
    <div className="s-background">
      <Container className="min-vh-100 d-flex justify-content-center align-items-center ">
        <Form className="col-sm-6 form" onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up Here</h1>
          <FormGroup>
            <div className="pb-2">
              <Label>Username</Label>
              <Input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                invalid={errors.username || errors.exists ? true : false}
              />
              <FormFeedback>
                {errors.username || errors.exists}
              </FormFeedback>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="pb-2">
              <Label>Email</Label>
              <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={errors.email ? true : false}
              />
              <FormFeedback>
                {errors.email}
              </FormFeedback>
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
              <FormFeedback>
                {errors.password}
              </FormFeedback>
            </div>
          </FormGroup>
          <div className="d-flex align-items-center pb-3">
          <p className="mb-0">User already exists? Log in</p>
          <Button onClick={(() => navigate('/login'))} color="link">here</Button>
          </div>
          <Button color="primary">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
