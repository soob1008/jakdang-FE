import type { Author } from "@/entities/author/model/types";
import type { Payment } from "@/entities/payment/model/type";
import type { STATUS_CONFIG } from "@/entities/settlement/consts/status";

export interface EarningDto {
  id: string;
  work_title: string;
  writing_title: string | null;
  author: Author;
  gross_amount: number;
  fee: number;
  net_amount: number;
  status: keyof typeof STATUS_CONFIG;
  scheduled_at?: string | null;
  created_at: string;
  paid_at: Date | null;
  settled_at: Date | null;
  payment?: Payment | null;
}

export interface SettlementDto {
  id: string;
  executed_at: string;
  total_amount: number;
  success_count: number;
  failed_count: number;
  memo?: string | null;
}

export interface SettlementSummaryDto {
  month_earning: number;
  next_settlement_amount: number;
  next_settlement_date: Date;
  today_earning: number;
  week_scheduled: number;
}

export interface EarningWeekItem {
  week: string;
  amount: number;
}
export interface EarningCumulativeItem {
  title: string;
  percent: number;
  total_earning: number;
}
