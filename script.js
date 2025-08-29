async function searchBooks() {
  const query = document.getElementById("bookInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a book title.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${query}`
    );
    const data = await response.json();

    if (data.docs.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    data.docs.slice(0, 12).forEach((book) => {
      const title = book.title || "No Title";
      const author = book.author_name
        ? book.author_name.join(", ")
        : "Unknown Author";
      const year = book.first_publish_year || "N/A";
      const detailsUrl = `https://openlibrary.org${book.key}`;
      const coverId = book.cover_i;
      const coverImg = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://via.placeholder.com/200x300?text=No+Cover";

      const bookCard = `
          <div class="book-card">
            <img src="${coverImg}" alt="${title}">
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Year:</strong> ${year}</p>
            <a href="${detailsUrl}" target="_blank" class="details-btn">
            View Details</a>
</a>

          </div>
        `;
      resultsDiv.innerHTML += bookCard;
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching books. Please try again.</p>";
    console.error(error);
  }
}
