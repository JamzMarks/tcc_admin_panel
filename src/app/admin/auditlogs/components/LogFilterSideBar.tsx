import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LogFilterSidebar() {
  return (
    <div className="p-4 border-r space-y-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Tipo de Log" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="info">Info</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="error">Error</SelectItem>
        </SelectContent>
      </Select>
      {/* Outros filtros: usuário, período, serviço */}
    </div>
  );
}
