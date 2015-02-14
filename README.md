[![Stories in Ready](https://badge.waffle.io/preferred-coyote/preferred-coyote.svg?label=ready&title=Ready)](http://waffle.io/preferred-coyote/preferred-coyote)

# converse.ly

> Chat roulette for voice

## Team

  - __Product Owner__: Jackson Hoose (marmalade)
  - __Scrum Master__: Yan Fan (yanarchy)
  - __Development Team Members__: Travis Chapman (teechap), Alex Tseung (alextsg)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

###Branch Details

- Deployment branch: master
- Development branch: develop


## Requirements

- Node 0.10.x

## Deployment

- [Heroku](http://preferredcoyote.herokuapp.com/)

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
bundle install
```

Bundler is a package manager for Ruby, similar to NPM. 
To check if you have Bundler:
```sh
$ bundle
```
If you don't have Bundler, please find installation instructions [here.](http://bundler.io/).
Remember to sudo for a global install.

```sh
$ sudo gem install bundler
```
Then go to the repo and do
```sh
bundle install
```
## Testing

* Circle CI
* Jest
* Karma

## Gulp

```gulp```

## Database

These are instructions for using migrations for this project.

Download and download Sequel Pro [here](http://www.sequelpro.com/).

Make sure you have a global install of sequelize-cli.

```
npm install -g sequelize-cli
```

Start up Sequel Pro--it is self explanatory.

In command line:

```sh
sequelize db:migrate
```

To migrate over.

To use:
```
sequelize migration:create --name="ENTERNAMEHERE"
```

See this [link](http://sequelize.readthedocs.org/en/latest/docs/migrations/) for more info.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
