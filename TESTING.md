# uwularpy - Testing Guide

This guide will help you test the uwularpy GitHub App to ensure it's working correctly.

## Prerequisites

Before testing, make sure you have:

1. Registered the GitHub App with the name "uwularpy"
2. Configured the app permissions and webhook URL (https://uwu.larp.dev/webhook)
3. Generated a private key for authentication
4. Deployed the webhook handler to a server accessible at uwu.larp.dev

## Local Testing

To test the webhook handler locally before deployment:

1. Clone a test repository with markdown files
2. Install dependencies:
   ```
   cd uwularpy-webhook
   npm install
   ```

3. Create a `.env` file with your GitHub App credentials:
   ```
   APP_ID=1214491
   PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
   Your private key content here
   -----END RSA PRIVATE KEY-----"
   WEBHOOK_SECRET=uwularp_webhook_secret
   PORT=3000
   ```

4. Start the server:
   ```
   node app.js
   ```

5. Use a tool like ngrok to expose your local server:
   ```
   ngrok http 3000
   ```

6. Update the webhook URL in your GitHub App settings to the ngrok URL

7. Create an issue in a test repository and mention "@uwularpy" in a comment

## Production Testing

After deploying to uwu.larp.dev:

1. Install the GitHub App on a test repository
2. Create an issue in the repository
3. Add a comment mentioning "@uwularpy"
4. Verify that:
   - A new branch is created named "uwuify-issue-{issue_number}"
   - All markdown files are uwuified
   - A pull request is created
   - The requester is mentioned in the pull request

## Troubleshooting

If the app doesn't respond to mentions:

1. Check the server logs for errors
2. Verify the webhook URL is correctly set to https://uwu.larp.dev/webhook
3. Ensure the app has the necessary permissions:
   - Contents: Read & write
   - Issues: Read & write
   - Pull requests: Read & write
4. Check that the webhook secret matches between the GitHub App settings and your .env file
5. Verify the private key is correctly formatted in your .env file

## Webhook Payload Testing

You can test the webhook handler with a sample payload:

```bash
curl -X POST https://uwu.larp.dev/webhook \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: issue_comment" \
  -H "X-Hub-Signature-256: sha256=..." \
  -d '{
    "action": "created",
    "issue": {"number": 1},
    "comment": {
      "body": "Let's try @uwularpy",
      "user": {"login": "testuser"}
    },
    "repository": {
      "name": "test-repo",
      "owner": {"login": "larp0"}
    },
    "installation": {"id": 12345678}
  }'
```

Note: You'll need to generate a valid signature for the payload using the webhook secret.
