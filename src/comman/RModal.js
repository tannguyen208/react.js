import React, { Component } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default class RModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      price: 0,
      author: "",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  setStateModal(item) {
    this.setState({
      _id: item._id,
      name: item.name,
      price: item.price,
      author: item.author
    });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChange = (field, event) => {
    event.preventDefault();
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    let { name, price, author } = this.state;

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <form>
          <h1>UPDATE PRODUCT</h1>
          <input
            name="name"
            type="text"
            placeholder="product name"
            value={name}
            onChange={this.onChange.bind(this, "name")}
          />
          <br />
          <input
            name="price"
            type="number"
            placeholder="product price"
            value={price}
            onChange={this.onChange.bind(this, "price")}
          />
          <br />
          <input
            name="author"
            type="text"
            placeholder="product author"
            value={author}
            onChange={this.onChange.bind(this, "author")}
          />
        </form>

        <hr />
        <button
          onClick={() => {
            if (!name.length || !author.length) {
              alert("vui lòng nhập đầy đũ thông tin bên dưới!");
              return;
            }
            this.props.productComponent.props.onUpdateProduct(this.state);
            this.closeModal();
          }}
        >
          Update
        </button>
        <button onClick={this.closeModal}>close</button>
      </Modal>
    );
  }
}
