import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

type ErrorType = {
  title: string;
  price: string;
};

export default function FormCreateProductComponent() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronic");
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const [errpr, setError] = useState<ErrorType>({
    title: "",
    price: "",
  });

  // Validaton
  useEffect(() => {
    if (title.length < 3) {
      setError((prev) => {
        return { ...prev, title: "Title must be at least 3 characters" };
      });
    }
  }, [title, price]);
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
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
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
