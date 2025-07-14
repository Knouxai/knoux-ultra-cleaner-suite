import React from "react";
import { useNavigate } from "react-router-dom";
import DedupliXAI from "@/components/DedupliXAI";

const DedupliXAIPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return <DedupliXAI onClose={handleClose} />;
};

export default DedupliXAIPage;
