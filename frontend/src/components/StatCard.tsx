import React from "react";

interface StatCardProps {
  title: string;
  description: string;
  total: number;
  date: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  total,
  date,
  description,
}) => {
  return (
    <div className="stats shadow bg-base-500 border-white">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">
          {total} {description}
        </div>
        <div className="stat-desc">
          Since : {new Date(date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
