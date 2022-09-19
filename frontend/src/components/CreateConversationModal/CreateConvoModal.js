import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Container } from "reactstrap";
import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useSelector } from "react-redux";

const CreateConvoModal = ({ open, toggle }) => {
    const user = useSelector((state) => state.user?.user)
    //TODO need members and userId to create a chatroom, currently members are optional
    const [friendId, setFriendId] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        //change friendId to username
        const convoMembers = [friendId, user._id]
        //Need to add the createconvo as a redux state slice to show on side.
        const createConversation = await csrfFetch('/conversation/new', {
            method: "POST",
            body: JSON.stringify({members: convoMembers, userId: user._id})
        })
        //invoke toggle to close modal
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
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                invalid={errors.email ? true : false}
              />
              <FormFeedback>{errors.email}</FormFeedback>
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
