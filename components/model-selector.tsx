import { ModelType, SUPPORTED_CHAT_MODELS } from "@/types/model-types";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: ModelType;
  onChange: (model: ModelType) => void;
}

export const ModelSelector = ({
  selectedModel,
  onChange,
}: ModelSelectorProps) => {
  return (
    <Select
      value={selectedModel}
      onValueChange={(val) => onChange(val as ModelType)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {SUPPORTED_CHAT_MODELS.map((model, index) => (
            <SelectItem key={index} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
