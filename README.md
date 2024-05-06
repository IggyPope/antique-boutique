# Antique Boutique E-commerce Project

Hi there !👋

Welcome to our final project app!!
We are a team of RSSchool students and we are making an e-commerce project for a vintage items shop.

This project is intended for non-commercial use. Our only benefit is the acquisition of new knowledge and honing of technological skills.🚸.

If you have any questions, please do not hesitate to contact us at
[![Static Badge](https://img.shields.io/badge/contact_us-blue?style=plastic)](julia.alconost@gmail.com).

The project is built using:

[![Static Badge](https://img.shields.io/badge/React-v.18.2.0-blue?style=plastic&logo=react&logoColor=white)](https://www.npmjs.com/package/react)
[![Static Badge](https://img.shields.io/badge/Vite-v.5.2.0-orange?style=plastic&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Static Badge](https://img.shields.io/badge/TypeScript-v.5.2.2-blue?style=plastic&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Static Badge](https://img.shields.io/badge/ESLint-v.8.57.0-orange?style=plastic&logo=eslint&logoColor=white)](https://www.npmjs.com/package/eslint)
[![Static Badge](https://img.shields.io/badge/Vitest-v.1.6.0-blue?style=plastic&logo=jest&logoColor=white)](https://www.npmjs.com/package/jest)
[![Static Badge](https://img.shields.io/badge/StyleLint-v.16.5.0-orange?style=plastic&logo=stylelint&logoColor=white)](https://www.npmjs.com/package/stylelint)
[![Static Badge](https://img.shields.io/badge/Husky-v.9.0.11-blue?style=plastic&logo=husky&logoColor=white)](https://www.npmjs.com/package/husky)
[![Static Badge](https://img.shields.io/badge/Sass-preprocessor-orange?style=plastic&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Static Badge](https://img.shields.io/badge/RTK-v.2.0.0-blue?style=plastic&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Static Badge](https://img.shields.io/badge/React_Router-v.6.23.0-orange?style=plastic&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Static Badge](https://img.shields.io/badge/commitlint- v. 19.3.0-blue?style=plastic&logo= commitlint&logoColor=white)](https://www.npmjs.com/package/commitizen)

## Table of Contents

1. 🖥️ [Installation](#installation)
2. 🤖 [Scripts](#scripts)
3. 🐶 [About Husky](#about-husky)
4. 📑 [About Commitizen](#about-commitizen)
5. ⚙️ [Testing](#testing)
6. ✍️ [Contributing](#contributing)

## Installation

Before you start, ensure you have [Node.js](https://nodejs.org/en/download/) installed.

1. **Clone** the repository [link](https://github.com/IggyPope/antique-boutique.git).

   To clone the repository you can use the following command

   ```shell
   git clone https://github.com/IggyPope/antique-boutique.git
   ```

   or the interface of your IDE.

2. **Install** dependencies

   Make sure you are in the develop branch

   ```shell
   git checkout develop
   npm run install
   ```

3. **Initialize ** husky

   ```shell
   npm run prepare
   ```

## Scripts

After cloning the repository and installing the dependencies you can run scripts.

1.  **Run development server**

    To launch the development server, open your terminal and write the following command

    ```shell
    npm run dev
    ```

    The application will start on the indicated address. Copy and paste it into the address bar of your browser.

2.  **To build project**

    To build the project you need to run the following command

    ```shell
    npm run build
    ```

    It will create a dist folder in your local repository and you will be able to deploy the bundled project

3.  **To preview builded project**

    To preview the builded project you need to run the following command

    ```shell
    npm run preview
    ```

    The bundle will start on the indicated address. Copy and paste it into the address bar of your browser.

4.  **Run EsLint to find and fix mistakes in code**

    If you want to check for errors in the executable file, you can run the following command

    ```shell
    npm run lint
    ```

    After executing this command you will see all the errors in the code of all the files with .ts and .tsx extensions

    If errors are detected, some of them can be fixed automatically by running the following command

    ```shell
    npm run lint:fix
    ```

5.  **Run Prettier to format code**

    If you want to format the code according to Prettier rules, you can run the following command

    ```shell
    npm run prettier
    ```

    It will format the code in all the files.

6.  **Run StyleLint to find and fix mistakes in style files with .scss extension**

    If you want to check for errors in the .scss files, you can run the following command

    ```shell
    npm run stylelint
    ```

    After executing this command you will see all the errors in the code of all the files with .scss extension

    If errors are detected, some of them can be fixed automatically by running the following command

    ```shell
    npm run stylelint:fix
    ```

## About Husky

In our project we use Husky and pre-commit hook. It means that when you try to commit changes the following scripts will be executed automatically:

```shell
npm run lint:fix
npm run prettier
npm run stylelint:fix
```

and if any mistakes are detected after executing these scripts, you'll have to fix them manually before you can commit.

## Testing

This project uses Vitest for testing

You can run existing tests or create custom tests and execute it by running the following command

```shell
npm run test
```

## Contributing

We welcome contributions from the community Your ideas, bug reports, feature requests, and pull requests are highly appreciated. Before you start contributing, please take a moment to review the following guidelines:

### Code Contributions

- **Fork the Repository**: Fork this repository to your own GitHub account.
- **Create a Branch**: Create a new branch for your contribution. It's a good practice to name your branch descriptively based on the issue you're addressing.
- **Commit Changes**: Make your changes in the branch. Ensure your commit messages are clear and descriptive.
- **Pull Request**: Submit a pull request to the original repository. Provide a detailed description of the changes made and why they were necessary.

### Reporting Issues

If you encounter a bug or have a feature request, please report it using the issue tracker. Include as much detail as possible to help us understand and resolve the issue efficiently.

### Testing

Please ensure that all tests pass after making changes. If you add new functionality, consider adding corresponding tests to cover the new code.

### Code Style

We follow a specific coding style and use tools like ESLint and Prettier to enforce it. Please make sure your code adheres to the existing style.

### Communication

Feel free to reach out if you have questions or need clarification on anything. We're here to help!

Thank you for your interest in contributing to Antique Boutique!
