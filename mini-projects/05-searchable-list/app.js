const items = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "Docker",
  "GraphQL"
];

const searchInput = document.querySelector("#search-input");
const itemsList = document.querySelector("#items-list");

function renderList(filteredItems) {
  itemsList.innerHTML = "";

  if (filteredItems.length === 0) {
    itemsList.innerHTML = `<li class="empty-msg">No results found</li>`;
    return;
  }

  filteredItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    itemsList.append(li);
  });
}

// Listen for keyboard input to filter array
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query)
  );

  renderList(filtered);
});

// Initial render
renderList(items);