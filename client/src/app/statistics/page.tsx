'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getBoardData } from '@/store/slices/boardSlice';
import { getColumnData, setColumns } from '@/store/slices/columnSlice';
import { TColumn } from '@/types/types';
import { useEffect, useState } from 'react';

type TStats = {
  total: number;
  columnsStat: Record<string, number>;
};

export default function Statistics() {
  const { columns } = useAppSelector((state) => state.column);
  const { boards } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const [stats, setStats] = useState<TStats>({
    total: 0,
    columnsStat: { Backlog: 0 },
  });

  useEffect(() => {
    dispatch(getBoardData());
    boards && dispatch(setColumns(boards[0].columns));
  }, []);

  useEffect(() => {
    boards && dispatch(setColumns(boards[0].columns));
  }, [boards]);

  useEffect(() => {
    if (Object.keys(columns).length > 0) {
      const total = Object.values(columns).reduce((prev, curr) => {
        return prev + curr.jobs.length;
      }, 0);
      setStats((prev) => ({ ...prev, total }));
      const columnsStat: Record<string, number> = {};
      Object.values(columns).forEach(
        (column) => (columnsStat[column.title] = column.jobs.length)
      );
      setStats((prev) => ({ ...prev, columnsStat }));
    }
  }, [columns]);

  return (
    <section className="flex flex-col max-full items-center">
      <h1 className="my-4 font-semibold text-xl">STATISTICS: WIP</h1>
      <h2 className="my-4 font-semibold text-lg">
        Applications: {stats.total}
      </h2>
      <table className="table-auto w-96">
        <thead>
          <tr>
            <th>Status</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {stats &&
            stats.columnsStat &&
            Object.entries(stats.columnsStat).map(([title, qty], index) => {
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td className="text-center">{qty}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
