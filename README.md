<h1 align="center">
  Retrospective - API
</h1>

<h4 align="center">
  A tool that helps to perform the Retrospective of Sprints, organizing and bringing better results.
</h4>

<p align="center">
    <a href="https://travis-ci.com/pheliperocha/retro-api"><img src="https://travis-ci.com/pheliperocha/retro-api.svg?branch=master"></a>
    <a href="https://app.codacy.com/app/pheliperocha/retro-api?utm_source=github.com&utm_medium=referral&utm_content=pheliperocha/retro-api&utm_campaign=Badge_Grade_Dashboard"><img src="https://api.codacy.com/project/badge/Grade/f488e093c4bd4ccba8521f35e5cfa1dc" alt="Codacy Badge"></a>
    <a href="https://www.codacy.com/app/pheliperocha/retro-api?utm_source=github.com&utm_medium=referral&utm_content=pheliperocha/retro-api&utm_campaign=Badge_Coverage"><img src="https://api.codacy.com/project/badge/Coverage/73bb0be2ca8d4fd489f54a10e2fa900c" alt="Codacy Badge"></a>    
    <a href="https://github.com/pheliperocha/retro-api/issues"><img src="https://img.shields.io/github/issues/pheliperocha/retro-api.svg"></a>
    <br>
    <a href="https://snyk.io/test/github/pheliperocha/retro-api?targetFile=package.json"><img src="https://snyk.io/test/github/pheliperocha/retro-api/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/pheliperocha/retro-api?targetFile=package.json" style="max-width:100%;"></a>
    <a href="https://david-dm.org/pheliperocha/retro-api" title="dependencies status"><img src="https://david-dm.org/pheliperocha/retro-api/status.svg"/></a>
    <a href="https://david-dm.org/pheliperocha/retro-api?type=dev" title="devDependencies status"><img src="https://david-dm.org/pheliperocha/retro-api/dev-status.svg"/></a>
    <br>
    <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg"></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/packagist/l/doctrine/orm.svg"></a>
</p>

---

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/pheliperocha/retro-api/releases).

We also use [Conventional Commits](http://conventionalcommits.org/) and [Standard Version](https://github.com/conventional-changelog/standard-version), to automatic versioning and [CHANGELOG](CHANGELOG.md) generation

## NPM Commands

|Command|Description|
|-------:|--------|
| npm start | Serve API with express DEBUG and Nodemon to live-reload on changes. |
| npm run start:test | Serve API with Test environment setted and with express DEBUG and Nodemon to live-reload on changes. |
| npm run start:nodebug | Serve API and Nodemon to live-reload on changes. |
| npm run start:prod | Serve API with Production environment setted and Nodemon to live-reload on changes. |
| npm run lint | Execute a lint using eslint. |
| npm run test | Execute unit tests via Mocha. |
| npm run test:coverage | Execute unit tests outputting a code coverage report on `/coverage` folder. |
| npm run release | Run Standard-Version CLI to make the changelog and bump version. |
| npm run sequelize -- ${args} | Run Sequelize CLI where ${args} are the sequelize arguments you wanna pass, to see all checks [Sequelize CLI Github repo](https://github.com/sequelize/cli#usage) |
| npm run sequelize -- model:generate --name ${modelName} --attributes ${attributeName}:string | Create a new model |
| npm run sequelize -- migration:generate --name ${migrationName} | Create a new migration |
| npm run sequelize -- seed:generate --name ${seedName} | Create a new seed |
| npm run sequelize -- db:migrate | Run all the pending migrations |
| npm run sequelize -- db:migrate:undo:all | Undo all the migrations |
| npm run sequelize -- db:migrate:undo:all --to XXXXXXXXXXXXXX-create-cards.js | Revert to a specific migration |
| npm run sequelize -- db:seed:all | Run all seeds |
| npm run sequelize -- db:seed:undo:all | Undo all the seeds |

## ERD

The ERD are built using [MySQL Workbench 8.0](https://dev.mysql.com/downloads/workbench/). The files can be found at `/docs` directory.

![Database ERD](docs/erd.png)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

---

<p align="center">
    Website <a href="https://pheliperocha.com">pheliperocha.com</a> &nbsp;&middot;&nbsp;
    GitHub <a href="https://github.com/pheliperocha">@pheliperocha</a> &nbsp;&middot;&nbsp;
    Linkedin <a href="https://www.linkedin.com/in/pheliperocha/">@pheliperocha</a>
</p>