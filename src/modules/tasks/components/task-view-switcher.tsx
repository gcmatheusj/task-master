import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCreateTaskDialog } from "../hooks/use-create-task-dialog";

export function TaskViewSwitcher () {
  const [tab, setTab] = useQueryState('visualizao', {
    defaultValue: 'table'
  })
  const { open } = useCreateTaskDialog()

  return (
    <Tabs className="flex-1 w-full border bg-sidebar" defaultValue={tab} onValueChange={setTab}>
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value='table'>
              Tabela
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value='column'>
              Colunas
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value='calendar'>
              Calendário
            </TabsTrigger>
          </TabsList>

          <Button size='sm' className="w-full lg:w-auto" onClick={open}>
            <Plus className="size-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        <Separator className="my-4" />

        <>
          <TabsContent value='table' className="mt-0">
            Tabela
          </TabsContent>
          <TabsContent value='column' className="mt-0">
            Coluna
          </TabsContent>
          <TabsContent value='calendar' className="mt-0">
            Calendário
          </TabsContent>
        </>
      </div>
    </Tabs>
  )
}