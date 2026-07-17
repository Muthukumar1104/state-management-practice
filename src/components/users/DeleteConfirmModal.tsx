import { Modal } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { useUserStore } from "../../store/userstore";


const DeleteConfirmModal = () => {
  const isDeleteModalOpen = useUserStore(
    (state) => state.isDeleteModalOpen
  );

  const deleting = useUserStore(
    (state) => state.deleting
  );

  const removeUser = useUserStore(
    (state) => state.removeUser
  );

  const closeDeleteModal = useUserStore(
    (state) => state.closeDeleteModal
  );

  return (
    <Modal
      show={isDeleteModalOpen}
      onHide={closeDeleteModal}
      centered
      backdrop="static"
      keyboard={!deleting}
    >
      <Modal.Header
        closeButton={!deleting}
      >
        <Modal.Title>
          Delete User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="flex items-start gap-3">
          <Trash2
            size={24}
            className="mt-1 text-red-600"
          />

          <div>
            <p className="font-medium">
              Are you sure you want to delete this user?
            </p>

            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          onClick={closeDeleteModal}
          disabled={deleting}
          className="rounded bg-gray-200 px-5 py-2 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={removeUser}
          disabled={deleting}
          className="rounded bg-red-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {deleting
            ? "Deleting..."
            : "Delete"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;