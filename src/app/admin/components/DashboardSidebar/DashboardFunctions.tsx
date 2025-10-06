interface DarshBoardFunctionsProps {
  children: React.ReactNode;
  title: string;
}
export const DarshBoardFunctions = ({ children, title }: DarshBoardFunctionsProps) => {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2 pl-2 font-inter ">
        {title}
      </h2>
      <ul className="space-y-1">
        {children}
      </ul>
    </div>
  );
};

