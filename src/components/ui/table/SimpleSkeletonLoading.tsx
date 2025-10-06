import { SimpleTableRow, SkeletonCell } from "./SimpleTable";

interface SimpleSkeletonLoadingProps {
    cellsLength: number;
    skeletonslength?: number;
}
/**
 * SimpleSkeletonLoading é um componente de UI que exibe linhas e células
 * com efeito de carregamento (skeleton), útil enquanto os dados reais da tabela
 * ainda estão sendo carregados.
 *
 * @param cellsLength Número de células por linha (baseado nas colunas da tabela).
 * @param skeletonslength Número de linhas a serem exibidas (default = 3).
 */
export const SimpleSkeletonLoading = ({cellsLength, skeletonslength = 3}: SimpleSkeletonLoadingProps) => {
  return (
    <>
      {Array.from({ length: skeletonslength}).map((_, index) => (
        <SimpleTableRow key={`Skelet_${index}`}>
          {Array.from({ length: cellsLength }).map((_, cellIndex) => (
            <SkeletonCell key={cellIndex} />
          ))}
        </SimpleTableRow>
      ))}
    </>
  );
};
