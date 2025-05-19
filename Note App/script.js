document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const notesList = document.getElementById("notes-list");
  const noteEditor = document.getElementById("note-editor");
  const editorContainer = noteEditor.querySelector(".editor-container");
  const emptyState = noteEditor.querySelector(".empty-state");
  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-content");
  const noteCategory = document.getElementById("note-category");
  const noteTags = document.getElementById("note-tags");
  const noteColor = document.getElementById("note-color");
  const saveNoteBtn = document.getElementById("save-note");
  const deleteNoteBtn = document.getElementById("delete-note");
  const addNoteBtn = document.getElementById("add-note-btn");
  const searchInput = document.getElementById("search-notes");
  const searchBtn = document.getElementById("search-btn");
  const filterCategory = document.getElementById("filter-category");
  const filterTags = document.getElementById("filter-tags");
  const lastSaved = document.getElementById("last-saved");
  const autoSaveToggle = document.getElementById("auto-save");
  const themeToggle = document.getElementById("theme-toggle");
  const tagsPreview = document.querySelector(".tags-preview");

  // State
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let currentNoteId = null;
  let searchQuery = "";
  let currentFilter = "all";
  let currentTagFilter = "all";
  let allTags = getAllTags();
  let autoSaveEnabled = false;
  let easyMDE = null;
  let saveTimeout = null;

  // Initialize the app
  function init() {
    loadThemePreference();
    renderNotesList();
    populateTagFilter();
    setupEventListeners();
    setupMarkdownEditor();
  }

  // Set up event listeners
  function setupEventListeners() {
    addNoteBtn.addEventListener("click", createNewNote);
    saveNoteBtn.addEventListener("click", saveNote);
    deleteNoteBtn.addEventListener("click", deleteNote);
    searchInput.addEventListener("input", handleSearch);
    searchBtn.addEventListener("click", handleSearch);
    filterCategory.addEventListener("change", handleFilterChange);
    filterTags.addEventListener("change", handleTagFilterChange);
    autoSaveToggle.addEventListener("change", toggleAutoSave);
    themeToggle.addEventListener("click", toggleTheme);

    // Tag input handling
    noteTags.addEventListener("input", handleTagInput);
    noteTags.addEventListener("focus", showTagSuggestions);
    noteTags.addEventListener("blur", () => {
      setTimeout(() => (tagsPreview.style.display = "none"), 200);
    });

    // Auto-save triggers
    noteTitle.addEventListener("input", triggerAutoSave);
    noteCategory.addEventListener("change", triggerAutoSave);
    noteColor.addEventListener("change", triggerAutoSave);
  }

  // Set up Markdown editor
  function setupMarkdownEditor() {
    easyMDE = new EasyMDE({
      element: noteContent,
      autoDownloadFontAwesome: false,
      spellChecker: false,
      status: false,
      sideBySideFullscreen: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "code",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],
      initialValue: noteContent.value,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
      previewRender: function (plainText) {
        return marked(plainText, {
          breaks: true,
          gfm: true,
        });
      },
    });

    easyMDE.codemirror.on("change", triggerAutoSave);
  }

  // Render notes list
  function renderNotesList() {
    notesList.innerHTML = "";

    const filteredNotes = notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        currentFilter === "all" || note.category === currentFilter;
      const matchesTagFilter =
        currentTagFilter === "all" ||
        (note.tags && note.tags.includes(currentTagFilter));
      return matchesSearch && matchesFilter && matchesTagFilter;
    });

    if (filteredNotes.length === 0) {
      notesList.innerHTML = '<div class="empty-notes">No notes found</div>';
      return;
    }

    filteredNotes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = `note-item ${
        note.id === currentNoteId ? "active" : ""
      }`;
      noteElement.setAttribute("data-id", note.id);
      noteElement.setAttribute("data-category", note.category);

      if (note.color && note.color !== "#ffffff") {
        noteElement.style.borderLeft = `4px solid ${note.color}`;
      }

      const previewContent =
        note.content.length > 100
          ? note.content.substring(0, 100) + "..."
          : note.content;

      const updatedAt = new Date(note.updatedAt).toLocaleString();
      const tagsHtml =
        note.tags && note.tags.length > 0
          ? `<div class="note-tags">${note.tags
              .map((tag) => `<span class="note-tag">${tag}</span>`)
              .join("")}</div>`
          : "";

      noteElement.innerHTML = `
                <h4>${highlightMatches(note.title, searchQuery)}</h4>
                <p>${highlightMatches(previewContent, searchQuery)}</p>
                ${tagsHtml}
                <div class="note-meta">
                    <span class="note-category">${note.category}</span>
                    <span>${updatedAt}</span>
                </div>
            `;

      noteElement.addEventListener("click", () => openNote(note.id));
      notesList.appendChild(noteElement);
    });
  }

  // Highlight search matches
  function highlightMatches(text, query) {
    if (!query) return text;

    const regex = new RegExp(query, "gi");
    return text.replace(
      regex,
      (match) => `<span class="search-highlight">${match}</span>`
    );
  }

  // Create a new note
  function createNewNote() {
    currentNoteId = Date.now().toString();

    // Hide empty state and show editor with animation
    emptyState.classList.add("fade-out");
    setTimeout(() => {
      emptyState.classList.add("hidden");
      emptyState.classList.remove("fade-out");
      editorContainer.classList.remove("hidden");
      editorContainer.classList.add("fade-in");
    }, 300);

    // Reset form
    noteTitle.value = "";
    easyMDE.value("");
    noteCategory.value = "personal";
    noteTags.value = "";
    noteColor.value = "#ffffff";

    // Focus on title
    noteTitle.focus();

    // Update last saved
    updateLastSaved();
  }

  // Open an existing note
  function openNote(id) {
    const note = notes.find((note) => note.id === id);
    if (!note) return;

    currentNoteId = id;

    // Animate transition
    editorContainer.classList.add("fade-out");
    setTimeout(() => {
      editorContainer.classList.remove("fade-out");

      // Populate form
      noteTitle.value = note.title;
      easyMDE.value(note.content || "");
      noteCategory.value = note.category || "personal";
      noteTags.value = note.tags ? note.tags.join(",") : "";
      noteColor.value = note.color || "#ffffff";

      // Show editor
      emptyState.classList.add("hidden");
      editorContainer.classList.remove("hidden");
      editorContainer.classList.add("fade-in");

      // Update last saved
      updateLastSaved(note.updatedAt);

      // Update active state in list
      document.querySelectorAll(".note-item").forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("data-id") === id) {
          item.classList.add("active");
        }
      });
    }, 300);
  }

  // Save note
  function saveNote() {
    if (!currentNoteId) return;

    const title = noteTitle.value.trim();
    const content = easyMDE.value();
    const category = noteCategory.value;
    const tags = noteTags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const color = noteColor.value;

    if (!title) {
      alert("Note title cannot be empty");
      return;
    }

    const now = new Date().toISOString();

    // Check if note exists
    const existingNoteIndex = notes.findIndex(
      (note) => note.id === currentNoteId
    );

    if (existingNoteIndex !== -1) {
      // Update existing note
      notes[existingNoteIndex] = {
        ...notes[existingNoteIndex],
        title,
        content,
        category,
        tags,
        color,
        updatedAt: now,
      };
    } else {
      // Create new note
      notes.push({
        id: currentNoteId,
        title,
        content,
        category,
        tags,
        color,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Save to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Update tags list
    allTags = getAllTags();
    populateTagFilter();

    // Update UI
    updateLastSaved();
    renderNotesList();

    // Show save confirmation
    showSaveConfirmation();
  }

  // Delete note
  function deleteNote() {
    if (!currentNoteId) return;

    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    notes = notes.filter((note) => note.id !== currentNoteId);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Reset UI
    currentNoteId = null;
    editorContainer.classList.add("fade-out");
    setTimeout(() => {
      editorContainer.classList.add("hidden");
      editorContainer.classList.remove("fade-out");
      emptyState.classList.remove("hidden");
      emptyState.classList.add("fade-in");
    }, 300);

    // Update list
    renderNotesList();
  }

  // Handle search
  function handleSearch() {
    searchQuery = searchInput.value.trim();
    renderNotesList();
  }

  // Handle filter change
  function handleFilterChange() {
    currentFilter = filterCategory.value;
    renderNotesList();
  }

  // Handle tag filter change
  function handleTagFilterChange() {
    currentTagFilter = filterTags.value;
    renderNotesList();
  }

  // Update last saved timestamp
  function updateLastSaved(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      lastSaved.textContent = `Last saved: ${date.toLocaleString()}`;
    } else {
      lastSaved.textContent = "Not saved yet";
    }
  }

  // Get all unique tags from notes
  function getAllTags() {
    const tags = new Set();
    notes.forEach((note) => {
      if (note.tags) {
        note.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }

  // Populate tag filter dropdown
  function populateTagFilter() {
    filterTags.innerHTML = '<option value="all">All Tags</option>';
    allTags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      filterTags.appendChild(option);
    });
  }

  // Handle tag input
  function handleTagInput() {
    showTagSuggestions();
  }

  // Show tag suggestions
  function showTagSuggestions() {
    const input = noteTags.value.trim();
    tagsPreview.innerHTML = "";

    if (!input) {
      // Show all tags if input is empty
      allTags.forEach((tag) => {
        const option = document.createElement("div");
        option.className = "tag-option";
        option.textContent = tag;
        option.addEventListener("click", () => {
          addTagToInput(tag);
          tagsPreview.style.display = "none";
        });
        tagsPreview.appendChild(option);
      });
    } else {
      // Filter tags based on input
      const filteredTags = allTags.filter((tag) =>
        tag.toLowerCase().includes(input.toLowerCase())
      );

      if (filteredTags.length === 0) {
        const option = document.createElement("div");
        option.className = "tag-option";
        option.textContent = "No matching tags";
        tagsPreview.appendChild(option);
      } else {
        filteredTags.forEach((tag) => {
          const option = document.createElement("div");
          option.className = "tag-option";
          option.textContent = tag;
          option.addEventListener("click", () => {
            addTagToInput(tag);
            tagsPreview.style.display = "none";
          });
          tagsPreview.appendChild(option);
        });
      }
    }

    tagsPreview.style.display = "block";
  }

  // Add tag to input
  function addTagToInput(tag) {
    const currentTags = noteTags.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    if (!currentTags.includes(tag)) {
      currentTags.push(tag);
      noteTags.value = currentTags.join(", ");
    }
    noteTags.focus();
  }

  // Toggle auto-save
  function toggleAutoSave() {
    autoSaveEnabled = autoSaveToggle.checked;
    if (autoSaveEnabled) {
      saveNoteBtn.textContent = "Auto-saving...";
    } else {
      saveNoteBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    }
  }

  // Trigger auto-save if enabled
  function triggerAutoSave() {
    if (!autoSaveEnabled || !currentNoteId) return;

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveNote();
    }, 1000);
  }

  // Show save confirmation
  function showSaveConfirmation() {
    saveNoteBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    setTimeout(() => {
      if (autoSaveEnabled) {
        saveNoteBtn.textContent = "Auto-saving...";
      } else {
        saveNoteBtn.innerHTML = '<i class="fas fa-save"></i> Save';
      }
    }, 2000);
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Load theme preference
  function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Initialize the app
  init();
});
