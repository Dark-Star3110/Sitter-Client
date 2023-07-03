export type Sitter = {
  id: number;
  sitter_name: string;
  phone: string;
  address?: string;
  sex: string;
  avatar: string;
  certification: string;
  year_ex: number;
  hourly_salary: number;
  state: string;
  rate: number;
  food: string;
  language: string;
};

export type Parent = {
  id: number;
  parent_name: string;
  phone: string;
  address: string;
  avatar: string | null;
  emergecy_phone: string;
};

export type Request = {
  id: number;
  start_time: string;
  end_time: string;
  data: string;
  state: string;
  created_at: string;
  updated_at: string;
  parent_id: number;
  sitter_id: number;
  feedback_id: number | null;
  sitter: Sitter;
  parent: Parent;
};

export enum ERequestState {
  wait = "待機中",
  accepted = "承認",
  rejected = "拒否",
}

export enum EAccountRole {
  sitter = "sitter",
  parent = "parent",
  admin = "admin",
}

export type Account = {
  id: number;
  user_name: string;
  role: EAccountRole;
  created_at: string;
  updated_at: string;
};
