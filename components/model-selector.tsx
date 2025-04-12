import { SUPPORTED_MODELS } from "@/types/model-types";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

export const ModelSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {SUPPORTED_MODELS.map((model, index) => (
            <SelectItem key={index} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
