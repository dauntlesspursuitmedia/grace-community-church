
import { z } from "zod";
import { columnsModuleZ } from "~/types/shared";
import { Column } from "./Column";




export type ColumnsProps = z.infer<typeof columnsModuleZ>;
type GridCols = typeof gridCols;
type ColumnCount = keyof GridCols;
const gridCols = {
  1: "md:[grid-template-columns:repeat(auto-fill,_minmax(calc(100%-2rem),_1fr))]",
  2: "md:[grid-template-columns:repeat(auto-fill,_minmax(calc((100%/2)-2rem),_1fr))] ",
  3: "md:[grid-template-columns:repeat(auto-fill,_minmax(calc((100%/3)-2rem),_1fr))]",
  4: "md:[grid-template-columns:repeat(auto-fill,_minmax(calc((100%/3)-2rem),_1fr))] lg:[grid-template-columns:repeat(auto-fill,_minmax(calc((100%/4)-2rem),_1fr))]",
} as const;

export const Columns = (props: ColumnsProps) => {
  const { columns  } = props;
  const columnCount =
    columns?.length && columns?.length > 4
      ? 4
      : columns?.length && columns.length > 1
      ? (columns.length as ColumnCount)
      : 1;
  return (
    // <pre className="container overflow-clip">{JSON.stringify(props, null, 2)}</pre>
    <section
      className={`container mx-auto grid gap-8 py-16 ${gridCols[columnCount]} `}
    >
			{/* <h2>Columns</h2> */}
      {columns?.map((column) => (
				<Column className={`column mx-auto flex  flex-col gap-4 ${columnCount === 2 ? "lg:max-w-xl" : ""}`} key={column?._key} items={column.items} _type={"column"} />

      ))}
    </section>
  );
};
