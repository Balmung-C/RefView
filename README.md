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
