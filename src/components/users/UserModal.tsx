import { Modal } from "react-bootstrap";
import UserForm from "./UserForm";
import { useUserStore } from "../../store/userstore";


const UserModal = () => {
  const isUserModalOpen = useUserStore(
    (state) => state.isUserModalOpen
  );

  const selectedUser = useUserStore(
    (state) => state.selectedUser
  );

  const submitting = useUserStore(
    (state) => state.submitting
  );

  const closeUserModal = useUserStore(
    (state) => state.closeUserModal
  );

  return (
    <Modal
      show={isUserModalOpen}
      onHide={closeUserModal}
      centered
      backdrop="static"
      keyboard={!submitting}
    >
      <Modal.Header
        closeButton={!submitting}
      >
        <Modal.Title>
          {selectedUser
            ? "Edit User"
            : "Add User"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UserForm />
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;