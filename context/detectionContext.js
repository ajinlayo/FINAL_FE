import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // State
  const [loading, setLoading] = useState(false);
  const [detections, setDetections] = useState([]);

  // Get Detections
  const getAllDetections = async () => {
    setLoading(true);
    try {
      console.log("Refreshing detections....");
      const { data } = await axios.get("/get-all-results");
      setLoading(false);
      setDetections(data?.detections);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Initial Detections
  useEffect(() => {
    getAllDetections();
  }, []);

  return (
    <PostContext.Provider value={[detections, setDetections, getAllDetections]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
