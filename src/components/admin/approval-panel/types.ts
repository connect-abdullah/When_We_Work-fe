import type { ApprovalPanelItem } from "@/lib/api/job-applications/schema";

export type { ApprovalPanelItem };

/** Group of approval-panel items for the same job (same naming as API). */
export interface ApprovalPanelJobGroup {
  job_id: number;
  job_name: string;
  items: ApprovalPanelItem[];
}
