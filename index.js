// [1, max]
const RandomInt = max => Math.floor(Math.random() * max);

const DerpString = (length = 20) => {
  const RandomDerp = () => {
    let n = RandomInt(4);
    let result = "";
    if (n == 0)
      result = "blah";
    else if (n == 1)
      result = "durr";
    else if (n == 2)
      result = "herp";
    else if (n == 3)
      result = "derp";
    return result;
  };
  return Array.from({ length: (RandomInt(length) + 1) }, () => RandomDerp()).join(" ");
};

// Herp derps an element.
const DerpElement = element => {
  const c = element;
  c.derpOriginal = c.textContent; // Preserve the original contents.
  c.onclick = () => {
    c.clicked = !c.clicked;
    c.textContent = c.clicked ? c.derpOriginal : c.derp_str;
  };
  c.classList.add("derped");
  c.derp_str = DerpString();
  c.textContent = c.derp_str;
  c.clicked = false;
};

const ValidatePreviouslyDerpedComments = comment => {
  const c = comment;
  if (c.clicked && c.textContent === c.derpOriginal) return;
  if (!c.clicked && c.textContent === c.derp_str) return;

  // Fix the comment. The only case of malformed comments encountered so far
  // are these two cases:
  if (c.textContent.indexOf(c.derp_str) !== -1) {
    // In the case of the new comment being appended after the derp string,
    // just grab it and put it in the derpOriginal variable
    const idx = c.derp_str.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.textContent.substring(0, idx);
    c.clicked = false;
    return;
  }

  if (c.textContent.indexOf(c.derpOriginal) !== -1) {
    // Same issue, but the comment was appended after derpOriginal.
    const idx = c.derpOriginal.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.derp_str;
    c.clicked = false;
  }
};

const Init = commentsSection => {
  const commentContentSelector = ["#content-text"]; // Comment text content.

  const notDerpedSelector = commentContentSelector
    .map(sel => `${sel}:not(.derped)`)
    .join(", ");

  const derpedSelector = commentContentSelector.map(sel => `${sel}.derped`).join(", ");

  // Only watch for child list changes, as we're watching the comments
  // container.
  const mutationConfig = { attributes: false, childList: true, subtree: true };

  // Detect when comments are added to the DOM.
  const observer = new MutationObserver(() => {
    // Check that everything's fine with the already derped comments.
    // This is necessary because youtube does a lot of wizardry with comments
    // in-between videos.
    document.querySelectorAll(derpedSelector).forEach(ValidatePreviouslyDerpedComments);

    // Derp all un-derped comments.
    document.querySelectorAll(notDerpedSelector).forEach(DerpElement);
  });

  observer.observe(commentsSection, mutationConfig);
};

// Check every so often if comments are loaded or not. Once they are, the
// timeout stops until the user leaves youtube or reloads the page. This needs
// to be done since comments are added in the DOM through js at an undetermined
// point through Youtube's execution.
const CheckIfCommentsLoaded = () => {
  const commentSectionSelector = "html body ytd-app ytd-comments ytd-item-section-renderer #contents";

  setTimeout(() => {
    // This selector is awful, but Youtube re-uses a lot of the DOM (the
    // selector for the comments is re-used across a bunch of pages) so we need
    // the exact path to the comments to match
    const commentsSection = document.querySelector(commentSectionSelector);
    if (commentsSection !== null)
      Init(commentsSection);
    else
      CheckIfCommentsLoaded();
  }, 500);
};

CheckIfCommentsLoaded();
