
const searchInput = document.getElementById("toolSearch");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".tool-card");
const emptyState = document.getElementById("emptyState");
const toolCount = document.getElementById("toolCount");
const year = document.getElementById("year");

let selectedCategory = "all";

function filterTools() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const category = card.dataset.category || "";
    const searchText =
      (card.dataset.search || "") + " " + card.innerText;
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesSearch = searchText.toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;

    card.hidden = !show;
    if (show) visible++;
  });

  if (emptyState) emptyState.hidden = visible !== 0;
  if (toolCount) toolCount.textContent = `${visible} Tools`;
}

searchInput?.addEventListener("input", filterTools);

filters.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category || "all";

    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    filterTools();
  });
});

if (year) year.textContent = new Date().getFullYear();

filterTools();
