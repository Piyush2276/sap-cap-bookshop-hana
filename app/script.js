// let oauthUrl =
//   "https://478d7af6trial.authentication.us10.hana.ondemand.com";
// let oauthClient = "sb-MyHANAApp-478d7af6trial_478d7af6trial-dev!t496911";
// let oauthSecret = "941168c5-1766-44b4-a535-671d12951cb1$-tj3VIB2s3k1DULK2AZYuSaLj7kZh0CoVHf9Wo8twDc=";

let deployAttributes;

axios
  .get("https://478d7af6trial-478d7af6trial-dev-myhanaapp-srv.cfapps.us10-001.hana.ondemand.com/deploy-info")
  .then((response) => {
    console.log("App Content Digest:", response.data);
    deployAttributes = response.data.deployAttributes;
    fetchJwtToken(deployAttributes.authURL, deployAttributes.clientID, deployAttributes.clientSecret);
  })
  .catch((error) => {
    console.error("Error fetching deploy info:", error);
  });


let bearerToken; // Global variable to store the token
// Function to fetch the JWT token
async function fetchJwtToken(oauthUrl, oauthClient, oauthSecret) {
  const tokenUrl = `${oauthUrl}/oauth/token?grant_type=client_credentials&response_type=token`;
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${oauthClient}:${oauthSecret}`),
    },
  };

  try {
    const response = await axios.get(tokenUrl, config);
    console.log("JWT Token fetched successfully:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching JWT token:", error);
    throw error;
  }
}

//fetchJwtToken(oauthUrl, oauthClient, oauthSecret);

