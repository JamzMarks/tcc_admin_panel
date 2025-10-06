interface SimpleTableProps {
  head: React.ReactNode;
  body: React.ReactNode;
}
/**
 * SimpleTable é um componente de tabela estilizada com suporte a dark mode.
 * Use `SimpleTable.Head` e `SimpleTable.Body` para definir cabeçalho e corpo da tabela.
 * @param head Elemento `SimpleTable.Head` para o cabeçalho da tabela, nao necessita de `SimpleTableRow`.
 * @param body Elemento `SimpleTable.Body` para o corpo da tabela.
 */
export const SimpleTable = ({head, body}: SimpleTableProps) => {
    return(
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-zinc-800">
                <tr>
                    {head}
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-background-dark divide-y divide-gray-200 dark:divide-gray-700">
                {body}
            </tbody>
        </table>
    </div>
    )

}


export const SimpleTableRow = ({children}: {children: React.ReactNode}) => {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
            {children}
        </tr>
    )
}

export const SimpleTableCell = ({children}: {children: React.ReactNode}) => {
    return (
        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
            {children}
        </td>
    )
}

export const SimpleTableHeader = ({children}: {children: React.ReactNode}) => {
    return (
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            {children}
        </th>
    )
}

/**
 * SkeletonCell é um componente de célula de tabela com animação de carregamento.
 */
export const SkeletonCell = () => (
  <SimpleTableCell>
      <div className="h-5 w-12 rounded animate-pulse bg-gray-700 "></div>
  </SimpleTableCell>

);