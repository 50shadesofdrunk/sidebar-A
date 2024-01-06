const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content");

// Handle click events on tabs
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    const linkId = link.id;
    const tabContentId = linkId + "-content";

    // Update link and tab states
    allLinks.forEach((otherLink) => otherLink.classList.toggle("active", otherLink.href === link.href));
    allTabs.forEach((tab) => tab.classList.toggle("tab-content--active", tab.id === tabContentId));

    // Generate content for the active tab
    const activeTab = document.getElementById(tabContentId);
    generateTabItems(link, activeTab);
  });
});

// Mocked data for example
const tabRecords = [
  // ...records
];

// Predefined filter functions
const filter = {
  games: (record) => record.type === "games",
  movies: (record) => record.type === "movies",
  books: (record) => record.type === "books",
};

// Generate tab items based on filter
const generateTabItems = (link, tabContent) => {
  const filterName = link.name;
  const filterFunction = filter[filterName];

  const mappedRecords = tabRecords
    .filter(filterFunction)
    .map((record) =>
      DOMPurify.sanitize(
        `<div class="record">
          <div class="avatar__wrapper">
            <img src="${record.src}" class="avatar avatar--${record.type}" alt="Profile">
          </div>
          <div class="content">
            <div class="title-description">
              <div class="title">${record.name}</div>
              <div class="description">${record.description}</div>
            </div>
            <a href="#explore-more" class="explore-button" title="Explore">Explore</a>
          </div>
        </div>`
      )
    );

  tabContent.innerHTML = mappedRecords.join("");
};

// Handle initial load based on hash
const currentHash = window.location.hash;
let activeLink = document.querySelector(`.tabs a[href="${currentHash}"]`);

if (!activeLink) {
  activeLink = document.querySelector(".tabs a"); // Default to first tab if no hash
}

const activeTabId = activeLink.id + "-content";
const activeTab = document.getElementById(activeTabId);

activeLink.classList.add("active");
activeTab.classList.add("tab-content--active");

generateTabItems(activeLink, activeTab);
