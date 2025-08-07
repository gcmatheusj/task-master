import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreateProjectModal } from "../hooks/use-create-projects-modal";
import { CreateProjectForm } from "./create-project-form";

export function CreateProjectDialog() {
  const { isOpen, setIsOpen, close } = useCreateProjectModal()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">Criar Projeto</DialogTitle>
      <DialogContent className="w-full sm:max-w-lg p-0 border-none rounded-none overflow-y-auto hide-scrollbar max-h-[85vh]">
        <CreateProjectForm onCancel={close} />
      </DialogContent>
    </Dialog>
  )
}