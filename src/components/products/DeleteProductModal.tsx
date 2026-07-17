import { Modal } from "react-bootstrap";
import { Trash2 } from "lucide-react";

const DeleteProductModal = () => {
  return (
    <Modal
      show={false}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Product
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
              Are you sure you want to delete this product?
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
          className="rounded bg-gray-200 px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="button"
          className="rounded bg-red-600 px-5 py-2 text-white"
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;