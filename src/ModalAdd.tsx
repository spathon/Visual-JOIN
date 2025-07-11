import { useState } from 'react'
import type { Like, User } from './types'

type ModalTypes = 'users' | 'likes' | null;

export default function ModalAdd({ modalType, addUser, addLike, closeModal }: {
  modalType: ModalTypes;
  addUser: (user: User) => void;
  addLike: (like: Like) => void;
  closeModal: () => void;
}) {
  const [addId, setAddId] = useState('');
  const [addName, setAddName] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'users') {
      if (!addId || !addName) return;
      addUser({ id: Number(addId), name: addName });
    } else if (modalType === 'likes') {
      if (!addId || !addName) return;
      addLike({ user_id: Number(addId), like: addName });
    }
    closeModal();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <form onSubmit={addItem}>
        <input
          type="number"
          id="addId"
          value={addId}
          onChange={e => setAddId(e.target.value)}
          placeholder="ID"
          className="input-sm"
        />
        <input
          type="text"
          value={addName}
          onChange={e => setAddName(e.target.value)}
          placeholder={modalType === 'likes' ? 'Like' : 'Name'}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
