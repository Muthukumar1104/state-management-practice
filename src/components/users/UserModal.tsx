import { Modal } from "react-bootstrap";
import UserForm from "./UserForm";

const UserModal = () => {
  return (
    <Modal
      show={false}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UserForm />
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;