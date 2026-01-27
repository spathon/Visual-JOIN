import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { MODAL_TYPES, type ModalType } from './constants'
import { useI18n } from './i18n'
import type { Like, User } from './types'

export default function ModalAdd({
  modalType,
  addUser,
  addLike,
  closeModal,
  defaultId,
}: {
  modalType: ModalType
  addUser: (user: User) => void
  addLike: (like: Like) => void
  closeModal: () => void
  defaultId: number
}) {
  const { t } = useI18n()
  const [addId, setAddId] = useState(String(defaultId))
  const [addName, setAddName] = useState('')

  const addItem = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault()

    const parsedId = Number(addId)

    if (modalType === MODAL_TYPES.USERS) {
      addUser({ uuid: crypto.randomUUID(), id: parsedId, name: addName.trim() })
    } else if (modalType === MODAL_TYPES.LIKES) {
      addLike({
        uuid: crypto.randomUUID(),
        user_id: parsedId,
        like: addName.trim(),
      })
    }

    setAddId('')
    setAddName('')
    closeModal()
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <form onSubmit={addItem} className="add-form">
        <input
          type="number"
          required
          min="1"
          step="1"
          value={addId}
          onInput={(e) => setAddId(e.currentTarget.value)}
          placeholder={t.id}
          className="input-sm"
        />
        <input
          type="text"
          required
          pattern=".*\S.*"
          value={addName}
          onInput={(e) => setAddName(e.currentTarget.value)}
          placeholder={modalType === MODAL_TYPES.LIKES ? t.like : t.name}
        />
        <button className="button" type="submit">
          {t.add}
        </button>
      </form>
    </div>
  )
}
