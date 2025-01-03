# Joke Generator
Enterprise Applications Development 1 - CA3

---

## Table of Contents

* [Overview](#overview)
* [Technologies Used](#technologies-used)
* [Local Development Setup](#local-development-setup)
* [Application Features](#application-features)
* [Developer](#developer)

---

## Overview
Joke Generator is a Blazor WebAssembly application designed to generate jokes based on user-selected categories, types, and languages. The application fetches jokes from an external API [`https://v2.jokeapi.dev/joke`](https://v2.jokeapi.dev/joke/) and displays them in a user-friendly interface.

---

## Technologies Used
- **Blazor WebAssembly**: For building the client-side application
- **Bootstrap**: For styling the application.
- **Playwright**: For end-to-end testing.

---

## Local Development Setup
1. Clone the repository:
```bash
https://github.com/kjatillo/joke-generator.git
```

2. Navigate to the project directory:
```bash
cd joke-generator\EAD_CA3_X00190944
```

3. Install the required dependencies:
```bash
dotnet restore
```

4. Run the application
```bash
dotnet run
```

5. Open browser and navigate to `https://localhost:7010` or `http://localhost:5027`

---

## Application Features
- **Joke Generation**: Generate jokes based on selected categories, types, and languages.
- **Pagination**: Display jokes with pagination support.
- **Error Handling**: Handle errors gracefully and display appropriate messages to the user.
- **Responsive Design**: The application is responsive and works well on different screen sizes.

---

## Developer
**Name**: Keneith June Atillo <br />
**Student ID**: X00190944 <br />
**Course/Year**: Computing with Software Development / Year 4 <br />
**Email**: X00190944@mytudublin.ie