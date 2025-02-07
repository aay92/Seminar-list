import React, { useState } from "react";
import { updateSeminar } from "../services/seminarService";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  seminar: any;
  onUpdate: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  seminar,
  onUpdate,
}) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);

  const handleSubmit = async () => {
    try {
      const updatedData = { title, description, date, time };
      await updateSeminar(seminar.id, updatedData);
      onUpdate();
      onClose();
    } catch (error) {
      alert("Failed to update seminar");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-400 p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Редактировать семинар</h2>
        <div className="mb-4">
          <label>Название:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-1 mt-1 bg-slate-100"
          />
        </div>
        <div className="mb-4">
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1 mt-1 bg-slate-100"
          />
        </div>
        <div className="mb-4">
          <label>Дата:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-2 py-1 mt-1 bg-slate-100"
          />
        </div>
        <div className="mb-4">
          <label>Время:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded px-2 py-1 mt-1 bg-slate-100"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded">
            Закрыть
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
