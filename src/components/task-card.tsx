'use client'

import { Search, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
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
} from './ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { DatePickerDemo } from './datepicker'

export function TaskCard() {
  return (
    <div className="mt-10 flex items-center justify-between gap-8 bg-zinc-800 rounded-xl px-4 py-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Checkbox className="rounded-full border-todo-blue border-2 data-[state=checked]:bg-todo-purple-dark data-[state=checked]:hover:bg-todo-purple data-[state=checked]:border-0 data-[state=checked]:text-zinc-100 data-[state=checked]:font-semibold" />
          </TooltipTrigger>

          <TooltipContent>Marcar tarefa como finalizada.</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span className="text-zinc-400">
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </span>

      <div className="flex items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-zinc-400 hover:text-danger">
              <Trash2 className="size-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja remover a tarefa ?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Você tem certeza de que deseja
                remover esta tarefa?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Sim, desejo remover</AlertDialogAction>
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
              <Input placeholder="Titulo" />
              <Input placeholder="Descrição" />

              <Label className="text-zinc-400">
                Adicionar data de conclusão
              </Label>

              <DatePickerDemo />
            </form>

            <DialogFooter>
              <Button>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
