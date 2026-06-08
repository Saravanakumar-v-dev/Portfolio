import PageView from "../models/PageView.js";

/**
 * POST /api/views/increment
 * Atomically increments the view count for the "home" page by 1.
 * Uses upsert so the document self-initializes on first hit.
 */
export const incrementViewCount = async (req, res) => {
  try {
    const result = await PageView.findOneAndUpdate(
      { page: "home" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, count: result.count });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/views
 * Returns the current view count without incrementing.
 */
export const getViewCount = async (req, res) => {
  try {
    const result = await PageView.findOne({ page: "home" });
    const count = result ? result.count : 0;

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching view count:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
