

const Table = ({ children, className = "", containerClassName = "", ...props }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-base-200 shadow-sm bg-base-100 ${containerClassName}`}>
      <table className={`table w-full text-left border-collapse text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = "", ...props }) => (
  <thead className={`bg-base-200/50 border-b border-base-200 text-xs font-bold uppercase tracking-wider text-base-content/70 ${className}`} {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, className = "", ...props }) => (
  <tbody className={`divide-y divide-base-200 text-base-content/85 ${className}`} {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, className = "", ...props }) => (
  <tr className={`hover:bg-base-200/30 transition-colors duration-200 ${className}`} {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, className = "", ...props }) => (
  <th className={`px-6 py-4 font-bold text-left align-middle ${className}`} {...props}>
    {children}
  </th>
);

const TableCell = ({ children, className = "", ...props }) => (
  <td className={`px-6 py-4 align-middle ${className}`} {...props}>
    {children}
  </td>
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default Table;
