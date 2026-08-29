exports.handler = async function(event, context) {
  const MONDAY_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY5NzE5MzAyNCwiYWFpIjoxMSwidWlkIjoxMTIxOTkyOTgsImlhZCI6IjIwMjYtMDgtMjZUMTM6Mjc6MjAuMDAwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM2Mjk5NzMyLCJyZ24iOiJ1c2UxIn0.3_nQYGCIHBoJ73l81zUfp_TXNRqSMKMuDyDo3EvqFKo"; // Replace with your token
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
