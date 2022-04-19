# :bomb: LAB FULLSTACK BACKEND starter

This is my way of seeing a perfect setup for a project.

### An application created with Express, TypeScript, sequelize

## Install packages

```bash
yarn
```

## Dev Run

```bash
yarn start
```

## Commentary

Every day more updates

#### FIX DATABASE

While we create the seeds to mount the database I leave you this insert to correct the error of lack of data in the roles table when creating users at the time of sign up

```bash
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
	(1, 'user', '2022-04-19 23:17:02', '2022-04-19 23:17:02'),
	(2, 'moderator', '2022-04-19 23:17:02', '2022-04-19 23:17:02'),
	(3, 'admin', '2022-04-19 23:17:02', '2022-04-19 23:17:02');

```
