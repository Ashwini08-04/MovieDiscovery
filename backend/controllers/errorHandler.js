// Handle TMDB/API errors
const handleTMDBError = (error, res, fallbackMessage) => {
  const status = error.response?.status;

  if (status === 401) {
    return res.status(502).json({
      success: false,
      message: "Movie service authentication failed."
    });
  }

  if (status === 404) {
    return res.status(404).json({
      success: false,
      message: "Movie not found."
    });
  }

  if (status === 429) {
    return res.status(429).json({
      success: false,
      message: "Movie service rate limit reached. Please try again later."
    });
  }

  if (status >= 500) {
    return res.status(503).json({
      success: false,
      message: "Movie service is temporarily unavailable."
    });
  }

  if (["ECONNRESET", "ETIMEDOUT", "ECONNABORTED"].includes(error.code)) {
    return res.status(504).json({
      success: false,
      message: "Movie service took too long to respond."
    });
  }

  return res.status(500).json({
    success: false,
    message: fallbackMessage
  });
};

module.exports = handleTMDBError;