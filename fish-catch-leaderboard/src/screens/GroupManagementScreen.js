import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGroups } from "../context/GroupContext";
import { regenerateInviteToken } from "../api/firebase";
import { useToast } from "../context/ToastContext";

const GroupManagementScreen = () => {
  const { user } = useContext(AuthContext);
  const { groups, addGroup, joinByToken, activeGroupId, setActiveGroupId } =
    useGroups();
  const [newGroup, setNewGroup] = useState("");
  const [inviteTokenInput, setInviteTokenInput] = useState("");
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  if (!user)
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "var(--color-primary)" }}>Groups</h1>
        <p>Please log in.</p>
      </div>
    );

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  // Deep link handling (?invite=token)
  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");
    if (invite) {
      joinByToken(invite).then((g) => {
        if (g) toast.push(`Joined group '${g.name}'`, "success");
      });
    }
  }, [user]);
  const inviteLink = activeGroup
    ? `${window.location.origin}/MoreThenRobin/groups?invite=${activeGroup.inviteToken}`
    : "";

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newGroup.trim()) return;
    const g = await addGroup(newGroup.trim());
    toast.push(`Group '${g.name}' created`, "success");
    setNewGroup("");
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!inviteTokenInput.trim()) return;
    const g = await joinByToken(inviteTokenInput.trim());
    if (g) toast.push(`Joined group '${g.name}'`, "success");
    else toast.push("Invalid invite token", "error");
    setInviteTokenInput("");
  };

  const regenToken = async () => {
    if (!activeGroup) return;
    setUpdating(true);
    try {
      await regenerateInviteToken(activeGroup.id);
      toast.push("Invite token regenerated", "success");
      // Update local object (simple approach)
      // (Simplified) Could refetch groups here if needed.
    } catch {
      toast.push("Could not regenerate token", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "var(--color-primary)" }}>Groups</h1>
      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Your Groups
        </h2>
        {groups.length === 0 && <p>No groups yet.</p>}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: ".6rem",
          }}
        >
          {groups.map((g) => (
            <li
              key={g.id}
              className="surface-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontWeight: g.id === activeGroupId ? "600" : "400" }}
              >
                {g.name}
              </span>
              <button
                className="btn-secondary"
                onClick={() => setActiveGroupId(g.id)}
                disabled={g.id === activeGroupId}
              >
                Activate
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Create Group
        </h2>
        <form
          onSubmit={handleCreate}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <input
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="Group name"
          />
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Join via Invite Token
        </h2>
        <form
          onSubmit={handleJoin}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <input
            value={inviteTokenInput}
            onChange={(e) => setInviteTokenInput(e.target.value)}
            placeholder="Invite token"
          />
          <button className="btn" type="submit">
            Join
          </button>
        </form>
      </section>

      {activeGroup && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Invite Link
          </h2>
          <p style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>
            {inviteLink}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                toast.push("Copied link", "info");
              }}
            >
              Copy Link
            </button>
            <button
              className="btn-secondary"
              type="button"
              disabled={updating}
              onClick={regenToken}
            >
              {updating ? "Regenerating..." : "Regenerate Token"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default GroupManagementScreen;
