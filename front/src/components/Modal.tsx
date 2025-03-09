import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ModalProps {
  buttonName: string;
  modalTitle: string;
  modalDescription: string;
  fields: { id: string; label: string; placeholder: string }[];
  onSubmit: (formData: any) => void;
  children?: React.ReactNode;
}

const Modal = ({
  buttonName,
  modalTitle,
  modalDescription,
  fields,
  onSubmit,
  children,
}: ModalProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitting formData:", formData); // Debug formData
    onSubmit(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {fields?.map((field: any) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.id}
                placeholder={field.placeholder}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Render children (for dropdown selection) */}
          {children}
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
