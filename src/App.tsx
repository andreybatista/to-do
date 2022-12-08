import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react'
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'
import { v4 as uuidv4 } from 'uuid'

import Header from './components/Header'

import styles from './App.module.css'
import ListTasks from './components/ListTasks';


export interface TasksProps {
  id: string,
  title: string,
  isComplete: boolean
}
function App() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [newTask, setNewTask] = useState('');
  const [countChecked, setCountChecked] = useState(0)
  const [tasksConclusion, setTasksConclusion] = useState(false)

  const isNewTaskEmpty = newTask.length === 0

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    if (newTask.length === 0) {
      return (
        <>
          {toast.warn('O nome da Tarefa não pode ser enviado vazio!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })}
        </>
      )
    }
    if (newTask.length < 3) {
      return (
        <>
          {toast.error('E necessário dar um nome para a Tarefa!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })}
        </>
      )
    }

    const newNameTask = [
      {
        title: newTask,
        isComplete: false
      }
    ]

    setTasks(state => [...state, { id: uuidv4(),title: newTask, isComplete: false }])


    setNewTask('')

    toast.success('Tarefa criada!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  function onDeleteTask(taskToDelete: string) {
    const taskWithoutDeleteOne = tasks.filter(task => {
      return task.id != taskToDelete
    })

    setTasks(taskWithoutDeleteOne)
    toast.success('Tarefa deletada', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  function onCheckedTask(checked: boolean) {
    if (checked) {
      setCountChecked(state => state + 1)

      toast.success(`Tarefa concluída!`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    } else {
      setCountChecked(state => state - 1)
      toast.warn(`Ops, essa tarefa não esta mais concluída!`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    }
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Parece que você ainda não comentou')
  }



  useEffect(() => {
    if (tasks.length != 0) {
      if (countChecked === tasks.length) {
        setTasksConclusion(true)
      } else {
        setTasksConclusion(false)
      }
    }
  }, [countChecked])


  return (
    <>
      <Header />
      {(tasksConclusion) && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          tweenDuration={10000}
        />
      )}


      <main className={styles.main}>
        <form onSubmit={handleCreateNewTask} className={styles.form_search}>
          <input
            className={styles.form_search__input}
            type="text"
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button className={styles.form_search__button} disabled={isNewTaskEmpty} >Criar <PlusCircle className={styles.plusCircle} size={16} /></button>
        </form>

        <div className={styles.boxTasks}>
          <header>
            <p>Tarefas criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>{tasks.length > 0 ? `${countChecked} de ${tasks.length}` : tasks.length}</span></p>
          </header>

          <ul className={styles.listTasks}>
            {tasks.length > 0 ?
              tasks.map(task => (
                <ListTasks key={task.id} task={task} onDeleteTask={onDeleteTask} onCheckedTask={onCheckedTask} />
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
