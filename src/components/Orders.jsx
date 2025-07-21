import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
// import { useFetcher } from "react-router-dom"; // This import is not used and can be removed
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit,setLimit]= useState(3)
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [status,page]);
  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      const result = await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div>
      <h2>Order Management</h2>
      <div className="orders-filter"> {/* Added a wrapper class for the filter */}
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending" >
            Pending
          </option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {/* <button>Show</button> */}
      </div>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      {orders &&
        orders.map((order) => (
          <li key={order._id}> {/* Added key for list items */}
            {order._id}-{order.orderValue}-{order.status}-
            {order.status === "Pending" && (
              <>
                <button onClick={() => updateOrder("cancelled", order._id)}>
                  Cancel
                </button>
                -
                <button onClick={() => updateOrder("completed", order._id)}>
                  Complete
                </button>
              </>
            )}
          </li>
        ))}
        <div className="pagination-controls"> {/* Applied pagination class */}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}