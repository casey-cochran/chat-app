import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
import {
  createConversation,
} from "../../store/conversationSlice.js";

const CreateConvoModal = ({ open, toggle }) => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username === user.username) return setError("Please enter another users username")
    const newConversation = { username: username, userId: user._id };
    const createConvo = await dispatch(createConversation(newConversation));
    console.log(createConvo.payload, ' this should be an error frontend')
    if (createConvo.payload?.err) {
      return setError(createConvo.payload.err);
    }
    toggle();
  };

  useEffect(() => {
    if (!username) setError("");
  }, [username]);

  return (
    <Modal isOpen={open} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>Create New Conversation</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="form w-100 p-3">
            <div className="pb-2">
              <Label>Enter friends username below</Label>
              <Input
                type="text"
                className="w-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                invalid={error ? true : false}
              />
              <FormFeedback>{error}</FormFeedback>
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateConvoModal;
