import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import useGetLists from "../CustomHooks/useGetLists";
import axios from "axios";

const Chart1 = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [taskCounts, setTaskCounts] = useState([]);

  const { lists, getLists } = useGetLists();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (lists.length === 0) return; 

    const fetchTasks = async () => {
      const counts = [];

      // Loop through each list and fetch tasks
      for (const list of lists) {
        if (list.user === userId) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_KEY}/task/${list._id}`
            );
            counts.push({
              listName: list.name,
              taskCount: response.data.length,
            });
          } catch (err) {
            console.error("Error fetching tasks:", err);
          }
        }
      }

      setTaskCounts(counts); // Update taskCounts with fetched data
    };

    fetchTasks(); // Trigger the task fetching
  }, [lists, userId]); // Re-run whenever lists or userId changes

  useEffect(() => {
    if (!taskCounts.length || !chartRef.current) return; // Ensure taskCounts and canvas are available

    // Register necessary components from Chart.js
    Chart.register(...registerables);

    const ctx = chartRef.current.getContext("2d");

    // Destroy existing chart if one exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart with fetched task data
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: taskCounts.map((data) => data.listName),
        datasets: [
          {
            label: "Tasks per List",
            data: taskCounts.map((data) => data.taskCount),
            backgroundColor: "#87888a",
            borderRadius: 10, // Set borderRadius for bar corners
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Step size of the y-axis ticks, which forces integers
              callback: function(value) {
                return value % 1 === 0 ? value : ''; // Remove decimals
              }
            },
          },
        },
        // Optional: Add some styling to the chart
        elements: {
          bar: {
            borderRadius: 10, // Apply borderRadius to the bars
          },
        },
      },
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [taskCounts]); // Re-run when taskCounts change

  return (
    <div className="h-[500px] w-[47%] bg-gray-900 p-9 ml-6 rounded-lg">
      <canvas ref={chartRef} />
    </div>
  );
};

export default Chart1;
