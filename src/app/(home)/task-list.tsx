'use client'

import { DatePickerDemo } from '@/components/datepicker'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { z } from 'zod'

interface TasksProps {
  id: string
  title: string
  description: string
  isCompleted: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(4, { message: 'Titulo muiito curto.' }),
  description: z.string().min(4, { message: 'Descrição muito curta.' }),
})

export function TaskList() {
  const [tasks, setTasks] = useState<TasksProps[]>()

  async function handleDeleteTask(taskId: string) {
    try {
      await api.delete(`/task/${taskId}`)

      toast.success('Tarefa removida com sucesso!')
    } catch (err) {
      toast.error('Houve um erro ao tentar deletar a tarefa.')

      console.error(err)
    }
  }

  async function handleUpdateTask(data: z.infer<typeof taskSchema>) {
    const { title, id, description } = data

    try {
      await api.put(`/task/${id}`, {
        id,
        title,
        description,
      })

      toast.success('Tarefa atualizada com sucesso!')
    } catch (err) {
      toast.error('Houve um erro ao tentar atualizar a tarefa.')

      console.error(err)
    }
  }

  useEffect(() => {
    api.get('/tasks').then((res) => setTasks(res.data.tasks))
  }, [])

  console.log(tasks)

  return (
    <>
      {tasks &&
        tasks.map((task: TasksProps) => {
          return (
            <div key={task.id} className="max-w-[40rem] w-full mt-10">
              <div className="mt-10 flex items-center justify-between gap-8 bg-zinc-800 rounded-xl px-4 py-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Checkbox
                        checked={task.isCompleted}
                        className="rounded-full border-todo-blue border-2 data-[state=checked]:bg-todo-purple-dark data-[state=checked]:hover:bg-todo-purple data-[state=checked]:border-0 data-[state=checked]:text-zinc-100 data-[state=checked]:font-semibold"
                      />
                    </TooltipTrigger>

                    <TooltipContent>
                      Marcar tarefa como finalizada.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex flex-col gap-2">
                  <h2 className="font-bold">{task.title}</h2>
                  <span className="text-zinc-400">{task.description}</span>
                </div>

                <div className="flex items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-zinc-400 hover:text-danger"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Deseja remover a tarefa ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Você tem certeza de
                          que deseja remover esta tarefa?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Sim, desejo remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-zinc-400 hover:text-todo-blue"
                      >
                        <Search className="size-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar tarefa</DialogTitle>
                      </DialogHeader>
                      <form action="" className="my-5 flex flex-col  gap-5">
                        <Input placeholder="Titulo" defaultValue={task.title} />
                        <Input
                          placeholder="Descrição"
                          defaultValue={task.description}
                        />

                        <Label className="text-zinc-400">
                          Adicionar data de conclusão
                        </Label>

                        <DatePickerDemo />
                      </form>

                      <DialogFooter>
                        <Button onClick={() => handleUpdateTask(task)}>
                          Salvar Alterações
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
