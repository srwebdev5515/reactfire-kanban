import { useState } from "react";
import { Modal } from "../Modal";

const AddNewTicket = ({ open, onClose, onConfirm }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleConfirm = () => {
    onConfirm && onConfirm({ title, description });
    setTitle(null);
    setDescription(null);
    onClose && onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-2 text-lg font-medium text-gray-600 flex items-center">
        Create New Ticket
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Title"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="description"
            id="description"
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </textarea>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleConfirm}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddNewTicket;
