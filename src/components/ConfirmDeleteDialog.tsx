import React from "react";
import { deleteSeminar } from "../services/seminarService";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  seminarId: number;
  onDeleted: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  seminarId,
  onDeleted,
}) => {
  const handleDelete = async () => {
    try {
      await deleteSeminar(seminarId);
      onDeleted();
      onClose();
    } catch (error) {
      alert("Ошибка при удаление семинара");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
      <div className="bg-slate-300 p-6 rounded-md shadow-lg ">
        <p className="text-lg font-semibold mb-4">
          Вы правда хотите удалить семинар ?
        </p>
        <div className="flex justify-center space-x-2 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded">
            Закрыть
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
