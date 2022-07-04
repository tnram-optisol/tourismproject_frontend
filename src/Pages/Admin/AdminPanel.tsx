import React, { useEffect } from "react";

import AdminLayout from "Component/Wrapper/AdminLayout";
import { getUserTourData } from "store/reducers/tourReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAdminNotifications } from "store/reducers/adminReducer";

function AdminPanel() {
  const totalNotifications = useAppSelector(
    (state) => state.admin.value.totalNotifications
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserTourData());
    dispatch(getAdminNotifications());
  }, [dispatch]);
  return <AdminLayout messages={totalNotifications} />;
}

export default AdminPanel;
