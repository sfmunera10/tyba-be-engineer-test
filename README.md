# tyba-be-engineer-test
Tyba Backend Engineer Test

## How to run using Docker 

**NOTE ON DOTENV FILES**: Create .env file at root folder with the exact same info as .env.example (I know... secrets are exposed but this is only for development purposes)

To deploy the full application (at root folder):

    docker-compose -f "docker-compose.yml" up -d --build

If you want to run the rest api locally without docker, be sure to run docker-compose for mongodb instance only.

You can run it with:

    npm install
    
    npm run dev

**ADDITIONAL NOTES**
- Due to time constraints, there are no present unit and integration tests unfortunately... but they can be easily implemented using jest. For unit tests: Controller tests must be implemented with mock data. For integration tests, http requests must be implemented for all endpoints.

- It was pretty difficult to find a public restaurant API (Without the pricing, and without a cumbersome API key generation), so instead I used a local json (see restaurant controller for important notice).

## Author 🖌️

- Santiago Múnera

Made with ❤️ by Santiago Múnera.