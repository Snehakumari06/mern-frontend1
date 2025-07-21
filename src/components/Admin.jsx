import React from "react";
import { Outlet, Link } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div className="admin-nav"> {/* This div contains the navigation links */}
        <Link to="/admin">Users</Link>-
        <Link to="/admin/products">Products</Link>-
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div className="admin-content"> {/* Added a wrapper for the content of the admin section */}
        <Outlet />
      </div>
    </div>
  );
}