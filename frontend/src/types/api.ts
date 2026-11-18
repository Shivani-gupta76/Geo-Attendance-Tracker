export interface ApiRecord {
  id: string | number;
  user_id?: number;
  name?: string;
  email?: string;
  date: string;
  timestamp?: string;
  status?: string;
  attendance_type?: string;
  check_in_time?: string | null;
  check_out_time?: string | null;
  is_late?: boolean;
  working_minutes?: number;
  not_onsite_minutes?: number;
  geofence_breach_count?: number;
  department_id?: string | number | null;
  department_name?: string | null;
  admin_note?: string | null;
  reason?: string | null;
  event_type?: string;
  accepted?: boolean;
  distance_from_office?: number | null;
  started_at?: string;
  ended_at?: string | null;
  current_duration_minutes?: number;
  office_name?: string;
  latitude?: number;
  longitude?: number;
  radius_meters?: number;
  distanceFromOffice?: number | null;
  todayBreachMinutes?: number;
  activeBreach?: { started_at: string } | null;
  breachIntervals?: { started_at: string; ended_at?: string | null; duration_minutes?: number }[];
  duration_minutes?: number;
  shift_start_time?: string;
  role?: string;
  is_active?: boolean;
  virtual?: boolean;
}

export interface AttendanceSummary {
  present_days?: number;
  working_minutes?: number;
  late_days?: number;
  absent_days?: number;
  wfh_days?: number;
  on_duty_days?: number;
  leave_days?: number;
}

export interface AdminDashboardSummary extends AttendanceSummary {
  active_employees?: number;
  present_today?: number;
  late_arrivals?: number;
  wfh_today?: number;
  on_duty_today?: number;
}

export interface OfficeSettingsData {
  office_name?: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
  late_threshold_minutes?: number;
  default_shift_start_time?: string;
  shift_checkout_time?: string;
  office_network_name_label?: string;
  allowed_ip_ranges?: string;
  enable_auto_checkin?: boolean;
  enable_auto_checkout?: boolean;
  auto_checkout_grace_minutes?: number;
}

export interface AutoStatusData {
  enable_auto_checkout?: boolean;
  auto_checkout_grace_minutes?: number;
  inside_geofence?: boolean;
  eligible?: boolean;
  office_network_name_label?: string;
}

export interface BreachInterval {
  started_at: string;
  ended_at?: string | null;
  duration_minutes?: number;
}

export interface OnsiteStatusData {
  activeBreach?: BreachInterval | null;
  breachIntervals?: BreachInterval[];
  distanceFromOffice?: number | null;
  todayBreachMinutes?: number;
}

export interface EmailAlertData {
  sent?: boolean;
  skipped?: boolean;
  attempted?: boolean;
}

export interface PunchResponseData {
  message?: string;
  distance?: number;
  record?: ApiRecord;
  closedCount?: number;
  emailAlert?: EmailAlertData;
}

export interface ApiErrorData {
  response?: { data?: { message?: string; distance?: number } };
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  const data = (error as ApiErrorData | null)?.response?.data;
  return data?.message || fallback;
}
