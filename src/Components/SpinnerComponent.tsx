import { Spinner } from "flowbite-react";

export default function SpinnerComponent() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-6">
      <h1 className="text-3xl font-semibold">Loading...</h1>
      <Spinner className="custom-spinner" aria-label="Default status example" />
    </div>
  );
}
