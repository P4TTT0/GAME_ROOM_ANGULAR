
# GAME ROOM

¡Hello! ✨ 

This is my web project that I have done with Angular and Typescript, you can take a look here: https://labo-project-iv.web.app/home

The idea it was to make a game room with some games, chat room and a leaderboard to see the points of the other players.

## TECHNICAL JUSTIFICATION

 - FORMS VALIDATION: I have used validations by implementing FormsModule and ReactiveFormsModule, a simple way to give feedback to the user.
 - GUARDS: To maintain the security of the pages, making them inaccessible until the user is logged in.
 - SERVICES: I have built a variety of services to facilitate persistent functionality across the web. Among those the most important are:
   - AUTHENTICATION: I have created a service with the functionalities that firebase gives you to perform user authentication.
    - FIRESTORE DATABASE: Using firebase cloud storage, I've created a service to facilitate various read and write functionalities.
    - LOADING: A service that allows you to show or hide the loading screen.
- INPUT OUTPUT: I have used INPUT and OUPUT from Angular to facilitate communication between components.
- DEPENDECY INJECTION: Most components have dependency injection to use the aforementioned services as well as to facilitate external functionalities:
    - TOASTR .
    - FORM BUILDER.
    - ROUTER. 


## API'S

 - On the cards game (Mayor ó Menor) i used a deck API: https://www.deckofcardsapi.com/

 - For the quiz game (Preguntados) i used an Open Trivia Database: https://opentdb.com/

- And the last one, for the About Me i used the GitHub API: https://api.github.com/users/p4ttt0


## Screenshots

![image](https://github.com/P4TTT0/TP1_LABO_IV/assets/98591487/26c5839d-8086-4422-bf3e-9b59f69b0c52)

![image](https://github.com/P4TTT0/TP1_LABO_IV/assets/98591487/481be087-c7a6-4d74-8ac8-92eecdca0721)

![image](https://github.com/P4TTT0/TP1_LABO_IV/assets/98591487/aef1443e-684e-4ee2-8870-9fbbcbfba7ea)

![image](https://github.com/P4TTT0/TP1_LABO_IV/assets/98591487/45c538a7-e365-47d3-abb5-419135dc0ea3)

