import Image from 'next/image'
import logo from '../../assets/Logo.png'
import { TaskList } from './task-list'
import { Separator } from '@/components/ui/separator'
import { FormCreateNewTask } from './form-create-new-task'
import { api } from '@/lib/axios'

interface TasksProps {
  id: string
  title: string
  description: string
  isCompleted: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export default async function Home() {
  const tasks = await api.get('/tasks')

  const createdTasks = tasks.data

  const completedTasks = createdTasks.tasks.filter(
    (task: TasksProps) => task.isCompleted === true,
  )

  return (
    <>
      <header className="w-full h-[12rem] bg-zinc-900 p-8 flex items-center relative">
        <Image src={logo} alt="" />
      </header>
      <main className="flex items-center flex-col">
        <FormCreateNewTask />

        <div className="flex items-center justify-between max-w-[40rem] w-full mt-36">
          <span className="flex items-center gap-4 text-todo-blue font-semibold">
            Tarefas criadas
            <span className="text-zinc-100 bg-zinc-700 w-6 h-6 rounded-full text-center flex items-center justify-center">
              {createdTasks.tasks.length}
            </span>
          </span>

          <span className="flex items-center gap-4 text-todo-purple font-semibold">
            Concluídas
            <span className="text-zinc-100 bg-zinc-700 w-6 h-6 rounded-full text-center flex items-center justify-center">
              {completedTasks.length}
            </span>
          </span>
        </div>

        <Separator className="max-w-[40rem] w-full mt-10" />

        <TaskList />
      </main>
    </>
  )
}
