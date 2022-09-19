import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Container } from "reactstrap";
import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useSelector, dispatch, useDispatch } from "react-redux";
import {addNewConversation} from '../../store/conversationSlice.js';

const CreateConvoModal = ({ open, toggle }) => {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    //TODO need members and userId to create a chatroom, currently members are optional
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        //change friendId to username
        //Need to add the createconvo as a redux state slice to show on side.
        const createConversation = await csrfFetch('/conversation/new', {
            method: "POST",
            body: JSON.stringify({username: username, userId: user._id})
        })
        const newConversation = await createConversation.json();
        if(newConversation.err){
         return setErrors(newConversation.err);
        }
        dispatch(addNewConversation(newConversation));
        toggle()
    };


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
                invalid={errors ? true : false}
              />
              <FormFeedback>{errors}</FormFeedback>
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
