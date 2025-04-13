# uwularpy - GitHub App for Uwuifying Markdown Files

This GitHub App automatically uwuifies markdown files in a repository when mentioned in an issue comment. When someone mentions "@uwularpy" in an issue, this app creates a new branch, adds the uwuify script, runs it to transform all markdown files, and creates a pull request.

## Features

- Listens for mentions of "@uwularpy" in issue comments
- Creates a new branch named "uwuify-issue-{issue_number}"
- Transforms all markdown files in the repository using the uwuify library
- Creates a pull request with the changes
- Mentions the requester in the pull request

## Installation

1. Install the uwularpy GitHub App from the GitHub Marketplace
2. Grant access to the repositories where you want to use it
3. That's it! The app is now ready to use

## Usage

1. Open an issue in a repository where the app is installed
2. Comment on the issue with a mention of "@uwularpy"
3. The app will automatically create a new branch, uwuify all markdown files, and create a pull request
4. Review and merge the pull request to apply the uwuified changes

## How It Works

When someone mentions "@uwularpy" in an issue comment, the app:

1. Creates a new branch from the main branch
2. Adds the uwuify script to the repository
3. Runs the script to transform all markdown files
4. Removes the script
5. Creates a pull request with the changes
6. Mentions the requester in the pull request

## Pricing

This GitHub App is free to use.

## Support

If you encounter any issues or have questions, please open an issue in the [uwularpy repository](https://github.com/larp0/uwularpy).

## Privacy

This app does not collect any personal information. It only accesses the repositories you grant it access to and only performs actions when explicitly mentioned in an issue comment.

## Security

This app uses secure webhook endpoints and follows GitHub's security best practices. All communication with GitHub is authenticated using a private key.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
