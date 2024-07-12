'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { PlusCircle } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

export function FormCreateNewTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleCreateTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await api.post('/tasks', {
        title,
        description,
        isCompleted: false,
      })

      toast.success('Tarefa cadastrada com sucesso!')
    } catch (err) {
      toast.error('Houve um erro ao criar a tarefa')

      console.error(err)
    }
  }

  return (
    <form
      className="max-w-[40rem] w-full flex flex-col items-center gap-2 absolute top-[6rem]"
      onSubmit={handleCreateTask}
    >
      <div className="w-full space-y-4">
        <Input
          className="bg-zinc-800 text-zinc-200 outline-none border-0 p-5"
          placeholder="Adicione um titulo para a tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="bg-zinc-800 text-zinc-200 outline-none border-0 p-5"
          placeholder="Adicione uma nova tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button className="bg-todo-blue-dark hover:bg-todo-blue text-zinc-100 font-semibold flex items-center gap-2 mt-6">
        Criar
        <PlusCircle className="size-5" />
      </Button>
    </form>
  )
}
