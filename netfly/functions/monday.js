exports.handler = async function(event, context) {
  const MONDAY_API_KEY = "YOUR_MONDAY_API_KEY_HERE"; // Replace with your token
  const BOARD_ID = "18424728273";

  const query = `{ boards(ids: [${BOARD_ID}]) { items_page { items { id name status } } } }`;

  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": MONDAY_API_KEY,
        "API-Version": "2023-10"
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
