import { Component, useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import "./App.css";
import CardComponent from "./Components/CardComponent";
import NavBarComponent from "./Components/NavBarComponent";
import FooterComponent from "./Components/FooterComponent";
import SpinnerComponent from "./Components/SpinnerComponent";
import FormCreateProductComponent from "./Components/FormCreateProductComponent";

type Status = "idle" | "loading" | "success" | "error";
type Product = {
  readonly id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen grid place-content-center">
        <SpinnerComponent />
      </div>
    );
  }

  function getDataForm(product: any) {
    setDataForm(product);
  }

  const createProduct = () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json;",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product created successfully!");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenModal(false);
  };

  return (
    <div>
      {/* Nav Bar */}
      <NavBarComponent />

      <div className="grid place-content-center gap-2 bg-gray-100">
        <h1 className="text-center text-3xl mt-10">This is Counting Number</h1>
        <p className="text-center text-6xl">{count}</p>
        <div className="flex flex-row gap-3 justify-center mb-10">
          <Button onClick={() => setCount(count + 1)}>Increment</Button>
          <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        </div>
        <hr />

        {/* Button */}
        <div className="flex justify-center my-8">
          <Button onClick={() => setOpenModal(true)}>Create New Product</Button>
        </div>

        <div className="mx-16 grid grid-flow-row sm:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden mb-10">
          {products.map((product) => (
            <CardComponent
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <FormCreateProductComponent getDataForm={getDataForm} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default App;
