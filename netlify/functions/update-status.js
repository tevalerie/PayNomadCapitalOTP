const {
  findUserByEmail,
  updateApplication,
} = require("./helpers/googleSheetClient");

exports.handler = async (event, context) => {
  // Set CORS headers for preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  try {
    const { email, status, verifiedAt } = JSON.parse(event.body);

    if (!email || !status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email and status are required." }),
      };
    }

    // Find the user in Google Sheets
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found." }),
      };
    }

    // Update user status
    const rowIndex = user._rowNumber - 2; // Adjust for 0-indexing and header row
    await updateApplication(rowIndex, {
      status: status,
      updatedAt: verifiedAt || new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User status updated successfully.",
        email: email,
        status: status,
        updatedAt: verifiedAt || new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("Error updating status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updating status.",
        error: error.message,
      }),
    };
  }
};
