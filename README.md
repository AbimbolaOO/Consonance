# Consonance test

This repo contains my attempt at the Consonace backend development test

## Prerequiste

- A running docker instance (Check docker.com on how to get started)

## How to run

- pull the repo to the local machine
- cd to the root folder
- Open the project in your terminal
- Use the code below to install the project dependencies

    ```{bash}
        npm i
    ```

- Run the code below builds and start running the project

    ```{bash}
        sudo docker-compose up --build
    ```

- Once the project runs, go to this URL in your browser to get the project swagger documentation.

    ```{bash}
        http://localhost:3000/api/v1/consonance/docs/#/
    ```

- To stop the entire project type the following code in your browser

    ```{bash}
        sudo docker-compose down
    ```
