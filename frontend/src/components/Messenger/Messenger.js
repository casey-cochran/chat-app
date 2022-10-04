import { useEffect, useState } from "react";
import Socket from "../Socket/Socket";
import { csrfFetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import Conversation from "../Conversation/Conversation";
import { useDispatch } from "react-redux";
import { setCurrentConversation, loadConversations } from "../../store/conversationSlice";
import "./Messenger.css";
import { BsPlusCircle } from "react-icons/bs";
import CreateConvoModal from "../CreateConversationModal/CreateConvoModal.js";

const Messenger = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.conversation?.currentConversation);
  const userConvos = useSelector((state) => state.conversation.userConvos);
  const [conversations, setConversations] = useState([]);
  const [errors, setErrors] = useState([]);


  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const setCurrConvo = (convo) => {
    dispatch(setCurrentConversation(convo));
  };

  useEffect(() => {
    try {
      const getUserConversations = async () => {
        const conversation = await csrfFetch(`/conversation/${user._id}`);
        const response = await conversation.json();
        const { rooms } = response;
        console.log(rooms ,' where are all my rooms')
        dispatch(loadConversations(rooms));
      };
      getUserConversations();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="d-flex w-100 convo-cont-bg calc-height ">
      <div className="w-25">
        {userConvos?.map((convo, idx) => {
          return (
            <div className="border-bottom" onClick={() => setCurrConvo(convo)} key={idx}>
              <div className="card-body p-5 text-center conv-bg  text-dark ">
                <Conversation convo={convo} userId={user._id} />
              </div>
            </div>
          );
        })}
        <div className="w-100">
          <div className="border-bottom">
            <div
              onClick={toggle}
              className="card-body border-0 p-5 text-center conv-bg  text-dark bg-opacity-25"
            >
              <BsPlusCircle className="icon-add" />
            </div>
          </div>
        </div>
      </div>
      <Socket currentConvo={conversation} />
      <div className="w-25">online users here</div>
      <CreateConvoModal open={open} toggle={toggle} />
    </div>
  );
};

export default Messenger;
