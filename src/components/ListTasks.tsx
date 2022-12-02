import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { useState } from 'react'

import styles from './ListTasks.module.css'

interface TaskProp {
  task: string
  onDeleteTask: (task: string) => void
  onCheckedTask: (checked: boolean) => void
}



function ListTasks({ task, onDeleteTask, onCheckedTask }: TaskProp) {
  const [checked, setChecked] = useState(false);

  function handleDeleteTask() {
    onDeleteTask(task);
  }

  function handleCheckedTask() {
    onCheckedTask(!checked)
    setChecked(!checked)
  }

  return (
    <li className={`${styles.task} ${checked ? styles.taskChecked : ''}`}>
      <div>
        <span>
          <Circle onClick={handleCheckedTask} className={styles.trash__iconCircle} size={18} />
          <CheckCircle onClick={handleCheckedTask} className={styles.trash__iconChecked} weight="duotone" size={18} />
        </span>
        <p>
          {task}
        </p>
      </div>

      <button className={styles.btn__delete} onClick={handleDeleteTask}>
        <Trash className={styles.trash__iconTrash} size={16} />
      </button>
    </li>
  )
}

export default ListTasks
