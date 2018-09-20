import React, { Component } from "react";
import RModal from "../comman/RModal";

export default class ProductsComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      price: 0,
      author: ""
    };
    this.props.onFetchProducts("asc");
  }

  componentWillReceiveProps = props => {
    this.setState({
      name: "",
      price: 0,
      author: ""
    });
  };

  onChange = (field, event) => {
    event.preventDefault();
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    let { name, price, author } = this.state;
    let {
      products,
      onFetchProducts,
      onCreateProduct,
      onDeleteProduct
    } = this.props;
    return (
      <div style={{ margin: 10, padding: 20, background: "#eee" }}>
        <h1>LIST PRODUCTS</h1>

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
        <hr />

        <button
          onClick={() => {
            if (!name.length || !author.length) {
              alert("vui lòng nhập đầy đũ thông tin bên dưới!");
              return;
            }

            onCreateProduct(this.state);
          }}
        >
          Add new
        </button>
        <button onClick={() => onFetchProducts("asc")}>Refresh</button>

        {products &&
          products.map((x, i) => (
            <div
              key={i.toString()}
              style={{ marginTop: 10, padding: 20, background: "#fff" }}
            >
              <p>{x.name}</p>
              <p>{x.price}</p>
              <p>{x.author}</p>
              <button
                onClick={() => {
                  this.refs.RModal.setStateModal({
                    _id: x._id,
                    name: x.name,
                    price: x.price,
                    author: x.author
                  });
                  this.refs.RModal.openModal();
                }}
              >
                Edit
              </button>
              <button onClick={() => onDeleteProduct({ ...x })}>Delete</button>
            </div>
          ))}

        <RModal ref={"RModal"} productComponent={this} data={this.state} />
      </div>
    );
  }
}
