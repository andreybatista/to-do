import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle, ClipboardText, Circle, CheckCircle, Trash } from 'phosphor-react'

import Header from './components/Header'

import styles from './App.module.css'
import ListTasks from './components/ListTasks';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('')
  const [countChecked, setCountChecked] = useState(0)

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks,  newTask])


    setNewTask('')
  }

  function onDeleteTask(taskToDelete: string) {
    const taskWithoutDeleteOne = tasks.filter(task => {
      return task != taskToDelete
    })

    setTasks(taskWithoutDeleteOne)
  }

  function onCheckedTask() {
    
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleCreateNewTask} className={styles.form_search}>
          <input
            className={styles.form_search__input}
            type="text"
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className={styles.form_search__button} >Criar <PlusCircle className={styles.plusCircle} size={16} /></button>
        </form>

        <div className={styles.boxTasks}>
          <header>
            <p>Tarefas criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>0</span></p>
          </header>

          <ul className={styles.listTasks}>
            {tasks.length > 0 ?
              tasks.map(task => (
                <ListTasks key={task} task={task} onDeleteTask={onDeleteTask} onCheckedTask={onCheckedTask} />
              ))
              :
              <li className={styles.listEmpty}>
                <ClipboardText color='#3d3d3d' size={56} />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  Crie treas e organize seus itens a fazer
                </p>
              </li>
            }
          </ul>

        </div>
      </main>
    </>
  )
}

export default App
