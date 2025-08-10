import React, { useEffect, useState } from "react";
import LeaderboardList from "../components/LeaderboardList";
import { filterLeaderboard, getSpeciesList } from "../api/firebase";
import { useGroups } from "../context/GroupContext";

const LeaderboardScreen = () => {
  const { activeGroupId, loadGroupLeaderboard } = useGroups();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, total: 0, pageSize: 20 });
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: "",
    timeframe: "all",
    search: "",
    sort: "size",
    onlyVerified: true,
    page: 1,
    pageSize: 10,
  });

  const updateFilter = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      page:
        name === "pageSize"
          ? 1
          : name === "species" ||
            name === "timeframe" ||
            name === "sort" ||
            name === "search" ||
            name === "onlyVerified"
          ? 1
          : prev.page,
    }));
  };

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        setSpeciesOptions(await getSpeciesList());
      } catch {
        /* ignore */
      }
    };
    loadSpecies();
  }, []);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const result = activeGroupId
          ? await loadGroupLeaderboard(filters)
          : await filterLeaderboard(filters);
        setLeaderboardData(result.data);
        setPageInfo({
          page: result.page,
          total: result.total,
          pageSize: result.pageSize,
        });
      } catch (error) {
        setLeaderboardData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(pageInfo.total / pageInfo.pageSize));
  const goPage = (p) =>
    setFilters((prev) => ({
      ...prev,
      page: Math.min(Math.max(1, p), totalPages),
    }));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">
        🏆 {activeGroupId ? "Group" : "Global"} Leaderboard
      </h1>
      <div
        className="filter-bar"
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <select name="species" value={filters.species} onChange={updateFilter}>
          <option value="">All Species</option>
          {speciesOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="timeframe"
          value={filters.timeframe}
          onChange={updateFilter}
        >
          <option value="all">All Time</option>
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7d</option>
          <option value="30d">Last 30d</option>
        </select>
        <select name="sort" value={filters.sort} onChange={updateFilter}>
          <option value="size">Size (desc)</option>
          <option value="recent">Most Recent</option>
        </select>
        <select
          name="pageSize"
          value={filters.pageSize}
          onChange={updateFilter}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <label className="checkbox-row">
          <input
            type="checkbox"
            name="onlyVerified"
            checked={filters.onlyVerified}
            onChange={updateFilter}
          />{" "}
          Verified only
        </label>
        <input
          type="search"
          name="search"
          value={filters.search}
          onChange={updateFilter}
          placeholder="Search species / angler"
        />
      </div>
      <LeaderboardList data={leaderboardData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
          Page {pageInfo.page} / {totalPages} • Total {pageInfo.total}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-secondary"
            disabled={filters.page <= 1 || loading}
            onClick={() => goPage(filters.page - 1)}
          >
            Prev
          </button>
          <button
            className="btn-secondary"
            disabled={filters.page >= totalPages || loading}
            onClick={() => goPage(filters.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
