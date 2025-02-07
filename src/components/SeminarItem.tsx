import React, { useState } from "react";
import Modal from "../components/Modal";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { updateSeminar } from "../services/seminarService";

interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

interface SeminarItemProps {
  seminar: Seminar;
  onDeleted: () => void; // Колбэк для обновления списка после удаления
  onUpdated: () => void; // Колбэк для обновления списка после редактирования
}

const SeminarItem: React.FC<SeminarItemProps> = ({
  seminar,
  onDeleted,
  onUpdated,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);

  //   // Обработчик удаления семинара
  //   const handleDelete = async () => {
  //     try {
  //       await deleteSeminar(seminar.id);
  //       onDeleted();
  //     } catch (error) {
  //       alert("Failed to delete seminar");
  //     }
  //   };

  // Обработчик сохранения изменений при редактировании
  const handleSave = async () => {
    try {
      const updatedData = { title, description, date, time };
      await updateSeminar(seminar.id, updatedData);
      onUpdated();
      setIsEditModalOpen(false);
    } catch (error) {
      alert("Failed to update seminar");
    }
  };

  return (
    <div className="bg-[#e3e3e3] rounded-lg shadow-md p-4 text-black">
      {/* Изображение */}
      <img
        src={seminar.photo}
        alt={seminar.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Заголовок и описание */}
      <h3 className=" text-lg font-semibold mb-2">{seminar.title}</h3>
      <p className=" text-sm mb-4">{seminar.description}</p>

      {/* Дата и время */}
      <div className="flex justify-between text-sm mb-4">
        <span>{seminar.date}</span>
        <span>{seminar.time}</span>
      </div>

      {/* Кнопки управления */}
      <div className="flex justify-center space-x-2 xs:flex xs:justify-start">
        {/* Кнопка редактирования */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Редактировать
        </button>

        {/* Кнопка удаления */}
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Удалить
        </button>
      </div>

      {/* Модальное окно для редактирования */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          seminar={seminar}
          onUpdate={onUpdated}>
          <div className="mb-4">
            <label>Название:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label>Описание:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label>Дата:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label>Время:</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded">
              Закрыть
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded">
              Сохранить
            </button>
          </div>
        </Modal>
      )}

      {/* Диалоговое окно подтверждения удаления */}
      {isDeleteDialogOpen && (
        <ConfirmDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          seminarId={seminar.id}
          onDeleted={onDeleted}
        />
      )}
    </div>
  );
};

export default SeminarItem;
