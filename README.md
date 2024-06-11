# Full Stack Open Exercise Solutions

Welcome to the personal archive where I've stored my solutions for the assignments provided by the Full Stack Open course. This educational journey introduces the essentials of crafting web applications in today's environment, primarily using JavaScript. Its core emphasis lies on creating single-page applications through ReactJS, alongside leveraging REST APIs developed via Node.js. Additionally, the curriculum encompasses aspects such as testing, managing configurations and environments, plus incorporating MongoDB to handle the data storage needs of the applications.

## About Full Stack Open
The Full Stack Open course is offered by the University of Helsinki and teaches modern web development from the basics all the way to advanced topics.

More information about the course can be found on the [official website](https://fullstackopen.com/en/).

## Course Progress
Below is a table of the course parts along with their completion dates, showcasing my journey through the Full Stack Open course:

| Course part                                                      | Completion date |
| ---------------------------------------------------------------- | ---------------- |
| Part 0: Fundamentals of Web apps                                 | Sep 5, 2021      |
| Part 1: Introduction to React                                    | Sep 6, 2021      |
| Part 2: Communicating with server                                | Sep 9, 2021      |
| Part 3: Programming a server with NodeJS and Express             | Sep 17, 2021     |
| Part 4: Testing Express servers, user administration             | Jan 11, 2022     |
| Part 5: Testing React apps                                       | Jan 16, 2022     |
| Part 6: Advanced state management                                | Feb 1, 2022      |
| Part 7: React router, custom hooks, styling app with CSS and webpack | Feb 8, 2024   |
| Part 8: GraphQL | Jun 11, 2024 |
| Part 9: TypeScript | Not Completed |
| Part 10: React Native | Not Completed |
| Part 11: CI/CD | Not Completed |
| Part 12: Containers | Not Completed |
| Part 13: Using relational databases | Not Completed |

**Note:** The exercises completed before 2024 were developed using Create React App and have not been migrated to Vite, which has been the recommended approach for creating React apps in this course after August 11th, 2023.

## Exploring the Repository
The structure of this repository has been designed for straightforward browsing and examining the solutions for every segment of the Full Stack Open course. Solutions are arranged by course segments, with each segment focusing on a particular theme or group of technologies discussed in the course. Within each segment, you might come across directories for individual projects created during that course section. This setup lets you directly examine the completed version of each project within its specific directory.

For course segments that center around the creation of a single project, like Part 4, subdirectories are absent at the base of the segment's directory because the whole segment is devoted to that single project's development.

To understand the development journey and solutions for specific tasks, consulting the commit history is advised. Every exercise has been sequentially committed, offering a thorough documentation of the development process and the precise modifications made at every phase.

### Overview of Directory Structure
Below is a description of how the projects and exercises are systematically arranged within each course segment:

```
├── part0 
├── part1 
│   ├── anecdotes
│   ├── courseinfo
│   └── unicafe
├── part2
│   ├── countries
│   ├── courseinfo
│   └── phonebook
├── part3
│   ├── phonebook-backend
│   └── phonebook-frontend
├── part4
├── part5
├── part6
│   ├── redux-anecdotes
│   └── unicafe-redux
└── part7
    ├── bloglist
    ├── country-hook
    ├── routed-anecdotes
    └── ultimate-hooks
```

For segments encompassing multiple projects (for instance, part1 with anecdotes, courseinfo, and unicafe), the completed versions of these projects are situated in their own directories. The commit history meticulously records the step-by-step solutions for each app, presenting a detailed view of the development journey.

This configuration ensures an easy discovery of both the ultimate form of each project and the progressive stages achieved to reach that form, providing insightful perspectives into the project development and problem-solving methodologies.

## Commit History
For each exercise tackled, I've made individual commits, presenting a clear and meticulously detailed record of my journey through the course. This approach to logging my progress not only showcases my capability to resolve the exercises presented but also sheds light on the precise measures undertaken to conquer each challenge.

It's crucial to acknowledge that certain exercises within the course are crafted to intentionally trigger console errors, emulating real-life debugging situations. In instances where my approach successfully circumvents the expected error without undermining the functionality of the application, I might opt not to commit a "fix". As a result, some commits might cover the completion of more than one exercise, as denoted by commit messages that reference a sequence of exercises, for example, 'exercise 7.5 - 7.6'. This notation is indicative of the commit catering to both exercises' requirements, courtesy of my proactive resolution of the issue aimed at by the subsequent exercise.

### Sample Commit Messages:
- **exercise 7.1**
- **exercise 7.2**
- **exercise 7.3**
- **exercise 7.4**
- **exercise 7.5 - 7.6** (This commit signifies that the resolution for exercise 7.5 also meets the conditions for exercise 7.6, likely due to an advance resolution of errors.)

Employing this method for committing solutions fosters a seamless and effective chronicle of my educational journey, while simultaneously underscoring my analytical abilities and foresight in preempting and resolving potential dilemmas in software development.
