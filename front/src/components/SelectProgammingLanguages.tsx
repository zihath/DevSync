import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SelectProgrammingLanguages = ({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="language" className="text-right">
        Language
      </Label>
      <Select
        onValueChange={(value) => {
          console.log("Selected value from dropdown:", value); // Debug log
          onSelect(value);
        }}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Pick a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Programming Languages</SelectLabel>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectProgrammingLanguages;
