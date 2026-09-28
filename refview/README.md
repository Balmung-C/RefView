RefView is a webapp developed using google gemini for code and setup guidance. The webapp is designed to provide a platform for artist to quickly/passively search, view, and save reference images. The web app uses 3rd party hosting and api management.

    ====================================================================
    REFVIEW PROJECT CHANGELOG HISTORY
    ====================================================================

    v1.0.0 — Initial Release
    ------------------------
    - Multi-pane workspace layout supporting responsive CSS Grid.
    - Basic search integration via Netlify serverless proxy.
    - Image viewing capabilities with basic navigation controls (next/prev).
    - Image timers for practice sessions.

    v1.1.0 — Image Manipulations & Controls
    --------------------------------------
    - Added grayscale mode toggle per pane.
    - Added horizontal flipping (mirroring) per pane.
    - Added 3x3 compositional rule-of-thirds grid overlay.
    - Implemented image zoom and pan features with mouse wheel and drag interactions.

    v1.2.0 — Predictive Text & Search Suggestions
    ---------------------------------------------
    - Built-in dictionary containing art reference categories (Poses, Animals, Anatomy, Sci-Fi, etc.).
    - Interactive dropdown suggestions supporting keyboard navigation (Up/Down/Enter/Escape).

    v1.3.0 — Saved References Board & Storage
    -----------------------------------------
    - Collapsible bottom drawer for pinning reference images.
    - LocalStorage persistence for saved board items.
    - Direct double-click thumbnail opening into new workspace panes.

    v1.4.0 — Board File Operations
    ------------------------------
    - Export active workspace layout and pinned references to `.json` board files.
    - Import saved board files with state restoration.

    v1.5.0 — UI/UX Refinements
    --------------------------
    - Auto-hiding header and footer toolbars on hover for active panes.
    - Smooth UI transitions and improved empty state feedback.

    v1.6.0 — Default Image Randomization
    ------------------------------------
    - Removed shuffle toggle button (`🔀`).
    - Enabled default Fisher-Yates array shuffling upon search result retrieval.
    - Non-repeating random selection when clicking next image.

    v1.6.1 — Codebase Documentation
    -------------------------------
    - Appended complete historical changelogs into embedded non-executable script tag.

    v1.7.0 — Automatic Error Handling & Auto-Skip
    ---------------------------------------------
    - Added `onerror` event listener to `<img>` tags (`handleImageError`).
    - Automatically purges broken or 403 HTTP forbidden URLs from active image array and advances to next valid image seamlessly.

    v1.8.0 — Global Fresh Board Search
    ----------------------------------
    - Added interactive top bar message: "Want to start fresh? Click to search all panes".
    - Toggles to a global search bar upon click.
    - Prompts confirmation regarding unsaved changes before execution.
    - Fetches 30 pages of results, clears existing workspace, opens 8 panes set to 30-second timers, and updates input placeholders to "Board Search - <Query>".

    v1.9.0 — Integrated Color Analysis Panel
    ---------------------------------------
    - Integrated right-side sliding Tools panel activated via edge hover or click-lock.
    - Real-time sampling of active reference images using canvas extraction.
    - 40-color swatch grid generation with 1-click clipboard copy and bulk hex export.
    - Categorized hue distribution percentage bars and top-3 color complementary gradient breakdowns.

    v2.1.0 — Architecture & Routing URL Alignment
    ---------------------------------------------
    - Updated "Return to Portal" navigation link to relative path (`../index.html`) for seamless workspace exit to launcher portal.
    - Standardized single-pane (`handlePaneSearch`) and global-board (`handleGlobalBoardSearch`) search fetch URLs to root endpoint `/api/search`.
    - Optimized network routing compatibility with `netlify.toml` proxy redirects.
  </script>
