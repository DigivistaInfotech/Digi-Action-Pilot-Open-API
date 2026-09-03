let state;
const $ = selector => document.querySelector(selector);

async function request(url, options = {}) {
  const response = await fetch(url, { headers: { "content-type": "application/json" }, ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function start() {
  state = await request("/api/sessions", { method: "POST", body: "{}" });
  render();
}

function render() {
  $("#model").textContent = state.model;
  $("#workspace").textContent = state.workspace;
  $("#key").textContent = state.keyConfigured ? "Configured" : "Setup needed";
  $("#key").style.color = state.keyConfigured ? "var(--accent)" : "#ffd878";
  $("#systemStatus").innerHTML = `<i></i> ${state.status === "working" ? "Working" : state.status === "approval" ? "Waiting" : state.status === "stopped" ? "Stopped" : "Ready"}`;
  document.body.classList.toggle("busy", state.status === "working" || state.status === "approval");
  const messages = $("#messages");
  if (state.messages.length) messages.innerHTML = state.messages.map(m => `<div class="message ${m.role}">${escapeHtml(m.text)}</div>`).join("");
  const approval = $("#approval");
  if (state.pending) {
    approval.classList.remove("hidden");
    approval.innerHTML = `<h3>Approval required · ${escapeHtml(state.pending.risk)} risk</h3><p>${escapeHtml(state.pending.summary)}</p><pre>${escapeHtml(JSON.stringify(state.pending.args, null, 2))}</pre><div class="buttons"><button class="approve">Approve action</button><button class="deny">Decline</button></div>`;
    approval.querySelector(".approve").onclick = () => decide(true);
    approval.querySelector(".deny").onclick = () => decide(false);
  } else approval.classList.add("hidden");
  const activity = $("#activity");
  $("#activityCount").textContent = `${state.activity.length} action${state.activity.length === 1 ? "" : "s"}`;
  activity.innerHTML = state.activity.length ? [...state.activity].reverse().map(a => `<div class="event ${a.outcome}"><b>${escapeHtml(a.summary)}</b><small>${escapeHtml(a.outcome)} · ${new Date(a.at).toLocaleTimeString()}</small></div>`).join("") : `<div class="empty"><span>⌁</span><p>Actions will appear here as the agent works.</p></div>`;
  messages.scrollTop = messages.scrollHeight;
}

async function send(message) {
  try {
    state.messages.push({ role: "user", text: message }); state.status = "working"; render();
    state = await request(`/api/sessions/${state.id}/message`, { method: "POST", body: JSON.stringify({ message, mode: document.querySelector("[name=mode]:checked").value }) });
  } catch (error) { state.status = "idle"; state.messages.push({ role: "assistant", text: `I couldn't continue: ${error.message}` }); }
  render();
}

async function decide(approved) {
  try {
    state.status = "working"; render();
    state = await request(`/api/sessions/${state.id}/approval`, { method: "POST", body: JSON.stringify({ id: state.pending.id, approved }) });
  } catch (error) { state.status = "idle"; state.messages.push({ role: "assistant", text: `I couldn't continue: ${error.message}` }); }
  render();
}

$("#composer").addEventListener("submit", event => { event.preventDefault(); const input = $("#prompt"); const message = input.value.trim(); if (message) { input.value = ""; send(message); } });
$("#stop").addEventListener("click", async () => { state = await request(`/api/sessions/${state.id}/stop`, { method: "POST", body: "{}" }); render(); });
document.querySelectorAll(".suggestions button").forEach(button => button.addEventListener("click", () => send(button.textContent)));
$("#prompt").addEventListener("input", event => { event.target.style.height = "auto"; event.target.style.height = `${event.target.scrollHeight}px`; });
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])); }
start().catch(error => { $("#messages").textContent = error.message; });
