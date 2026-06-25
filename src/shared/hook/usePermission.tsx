import { useMemo } from "react";

export enum Permission {
  SHOW_USER = "ShowUser",
  MODIFY_USER = "ModifyUser",
  USER_STATS = "UserStats",
  PLAN_STATS = "PlanStats",
  MODIFY_USER_PLAN = "ModifyUserPlan",
  ALL_PROVINCES = "AllProvincesAccess",
  USER_LOTTERY = "UserLottery",
  STATS = "Stats",
  ONLINE_USERS_STATS = "OnlineUsersStats",
  TOTAL_USERS_AND_USER_PLANS = "TotalUsersAndUserPlans",
  USER_TRAFFIC_STATS = "UserTrafficStats",
  PROVINCE_USER_PLANS_STATS = "ProvinceUserPlansStats",
  CITY_USER_PLANS_STATS = "CityUserPlansStats",
  REFERRAL_SUMMARY_STATS = "ReferralSummaryStats",
  PLAN_SUMMARY_STATS = "PlanSummaryStats",
  USER_AND_USER_PLANS_GRAPH = "UsersAndUserPlansGraph",
  SEND_USER_PLAN_COMPLETION_REMINDER = "SendUserPlanCompletionReminder",
  SHOW_BUSINESS_PLAN = "ShowBusinessPlan",
  USAGE_TYPE = "UsageType",
}
// CityUserPlansStats
export const usePermission = () => {
  const permissions: Permission[] = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("permissions") || "[]");
    } catch (error) {
      return [];
    }
  }, []);

  const hasPermission = (name: Permission | Permission[]) => {
    if (Array.isArray(name)) {
      return name.every((perm) => permissions.includes(perm));
    }
    return permissions.includes(name);
  };

  return { hasPermission };
};
