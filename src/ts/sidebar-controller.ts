const SIDEBAR_STATE_KEY = "sidebar-collapsed";

export function setupSidebarToggle(): void {
  const sidebar = document.querySelector<HTMLElement>("#desktop-sidebar");
  const mainArea = document.querySelector<HTMLElement>(".main-area");
  const toggle = document.querySelector<HTMLButtonElement>("#sidebar-toggle");
  if (!sidebar || !mainArea || !toggle) return;

  const setCollapsed = (collapsed: boolean): void => {
    sidebar.classList.toggle("is-collapsed", collapsed);
    mainArea.classList.toggle("sidebar-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    toggle.querySelector("i")?.classList.toggle("ph-caret-right", collapsed);
    toggle.querySelector("i")?.classList.toggle("ph-caret-left", !collapsed);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(collapsed));
  };

  setCollapsed(localStorage.getItem(SIDEBAR_STATE_KEY) === "true");
  toggle.addEventListener("click", () => setCollapsed(!sidebar.classList.contains("is-collapsed")));
}
