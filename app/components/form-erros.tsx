import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrosProps {
    message?: string;
}

export const FormErros = ({message}:FormErrosProps) => {
    if (!message) return
    return (
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="size-4" />
        <p>{message}</p>
      </div>
    );
}