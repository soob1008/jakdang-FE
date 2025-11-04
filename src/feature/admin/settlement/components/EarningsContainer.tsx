"use client";

import { useState, useTransition } from "react";
import Title from "@/feature/admin/components/Title";
import EarningFilter from "@/feature/admin/settlement/components/EarningFilter";
import EarningTable from "@/feature/admin/settlement/components/EarningTable";
import useEarnings, { type UseEarningsParams } from "../hooks/useEarnings";

const DEFAULT_FILTER: UseEarningsParams = {
  work: null,
  status: null,
  start_date: null,
  end_date: null,
};

export default function EarningsContainer() {
  const [filters, setFilters] = useState<UseEarningsParams>(DEFAULT_FILTER);
  const [committedFilters, setCommittedFilters] =
    useState<UseEarningsParams>(DEFAULT_FILTER);

  const [isPending, startTransition] = useTransition();

  const { data: earnings = [], isFetching } = useEarnings(committedFilters);

  const handleApply = (next: UseEarningsParams) => {
    startTransition(() => {
      setCommittedFilters(next);
    });
  };

  const handleChange = (next: UseEarningsParams) => {
    setFilters(next);
  };

  const disableApply =
    isFetching ||
    isPending ||
    JSON.stringify(filters) === JSON.stringify(committedFilters);

  return (
    <>
      <Title title="정산 내역" />
      <EarningFilter
        value={filters}
        onApply={handleApply}
        onChange={handleChange}
        disableApply={disableApply}
      />
      <EarningTable earnings={earnings} />
    </>
  );
}
