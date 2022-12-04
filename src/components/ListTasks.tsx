import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { useState } from 'react'
import { TasksProps } from '../App'

import styles from './ListTasks.module.css'

interface TaskProp {
  task: TasksProps
  onDeleteTask: (task: string) => void
  onCheckedTask: (checked: boolean) => void
}



function ListTasks({ task, onDeleteTask, onCheckedTask }: TaskProp) {
  const [checked, setChecked] = useState(false);

  function handleDeleteTask() {
    onDeleteTask(task.id);
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
          {task.title}
        </p>
      </div>

      <button className={styles.btn__delete} onClick={handleDeleteTask}>
        <Trash className={styles.trash__iconTrash}/>
      </button>
    </li>
  )
}

export default ListTasks
