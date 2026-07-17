import { Modal } from "react-bootstrap";

import ProductForm from "./ProductForm";

const ProductModal = () => {
  return (
    <Modal
      show={false}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add Product
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProductForm />
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;