import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

type ErrorType = {
  title: string;
  price: string;
};

export default function FormCreateProductComponent({getDataForm}:any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronic");
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const [error, setError] = useState<ErrorType>({
    title: "",
    price: "",
  });

  // Validaton
  useEffect(() => {
    if (title.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          title: "Title must be at least 3 characters",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          title: "",
        };
      });
    }

    if (price < 0) {
      setError((prev) => {
        return {
          ...prev,
          price: "Price must be greater than 0",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          price: "",
        };
      });
    }
  }, [title, price]);

  useEffect(() => {
    getDataForm({ title, price, description, category, image });
  }, [title, price, description, category, image]);

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Product Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Apple Vision Pro"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {error.title && <p className="text-red-500">{error.title}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
        {error.price && <p className="text-red-500">{error.price}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Product Description" />
        </div>
        <Textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
}
