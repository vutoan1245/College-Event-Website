# College Event Website

## Background

**Problem**

Most universities in the country hosts events around campus and off campus. These events are organized   by   college   students   in   most   of   the   cases.    Students   are   clustered   (RSO’s   or Registered Student Organizations)  by  different organizations,    clubs, fraternities around campus. These  events  are  of  different  types: social, fundraising,  tech  talks,  etc.    At the  moment,   each university has  a  website where they post  their  events for  the  upcoming weeks.     One needs  to check the website in order to add each event to his/her calendar.   These events are just official events and not  all events around the university are included.  Another limitation is that one has no way to track weekly events. 

**Project Description**

You are asked to implement a  web application  that solves the aforementioned problems.   Any student  may register with  this  application  to  obtain  a  user  ID  and  a  password.  There  are  three user  levels: super  adminwho  creates  a  profile  for  a  university  (name,  location,  description, number of students,    pictures,  etc.), adminwho owns an RSO and may host events, and student who uses the application to look up information about the various events.Admin  can  create  events  with  name,  event  category,  description,  time,  date,  location,  contact phone,  and  contact  email    address.   A  location  should  be  set  from  a  map  (Bing,  Google,   open street map) with name,  latitude, longitude, etc. In order to populate the database,  one  can use feeds  (e.g.,  RSS,  XML)  from  events.ucf.edu.    Each  admin  is  affiliated  with  one  university,  and one or more RSOs. A  student  user  can  request  to  create a  new  RSO  or to  join  an  existent one. A  new  RSO  can  be  created  with  at  least  5  other  students  with  the  same  email  domain,   e.g.@knights.ucf.edu; and one of them should be assigned as an administrator. Student can view events in their university by location, or by selecting the University they want to  see  the  events  from.  They  can  retrieve events  according to  their  level  of  access or  scope.  A student should be able to see all the events around its location or from RSOs they are following. There are different types of events (social, fundraising, tech talks, etc.).  Each event can be public, private, or an RSO event. Public events can be seen by everyone; private events can be seen by the students of the host university; and an RSO events can only be seen by members of the RSO. In addition, events can be created without an RSO.  Such events must be approved by the super admin.   After an  event has been published,  users can add,  remove,  and edit comments on the event, as  well  as  rating  the  event with  up  to  5  stars.  The  application  should  offer  some  social network integration,  e.g. posting from the application to Facebook or Google.

## User Interface
### Student Tabs

- Event Tab
  - Show a list of events depends on user permission
  - A form to create a new event
- RSO Tab
  - Show a list of available RSOs depends on university
  - Show all RSO that user is currently a member of
  - A form to create a new RSO

### Admin Tabs

- Event Tab
  - Show a list of events depends on user permission
  - Event Form to create a new event
- University Tab
  - A form to create a new university

## Requirements

- [Node](https://nodejs.org/) & [NPM](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com//) Database
- [Docker](https://www.docker.com/) (for development)

## Development Setup

1. Run `npm install` to install dependencies for server

2. Run `npm run client-install` to install dependencies for client

3. Run `npm run db:rebuild` to setup the database in a Docker container

4. Run `npm run dev` to run server and client concurrently

```
# Server: http://localhost:5000 
# Client: http://localhost:3000

http://localhost:3000/student/register: create a new student
http://localhost:3000/super-admin/register: create a new super admin

```


###  2️⃣ Endpoints

#### Student Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST   | `/api/student/login`    | Public         | Return JWT for that Student.                 |
| POST   | `/api/student/register` | Public         | Register a new Student.                      |
| GET    | `/api/student/current`  | Public         | Return a Student information.                |

#### Student Routes

| Method | Endpoint                      | Access Control         | Description                          |
| ------ | ------------------------------| -----------------------| ------------------------------------ |
| POST   | `/api/super-admin/login`      | Public                 | Return JWT for that Super Admin.     |
| POST   | `/api/super-admin/register`   | Public                 | Register a new Super Admin.          |
| GET    | `/api/student/current`        | Super Admin            | Return a Super Admin information.    |


#### Event Routes

| Method | Endpoint                  | Access Control        | Description                                        |
| ------ | -----------------------   | -------------------   | -------------------------------------------------- |
| GET    | `/api/event/all`          | Student, Super Admin  | Return all events available to that user.          |
| GET    | `/api/event/:eid`         | Student, Super Admin  | Return full detail of a event                      |
| POST   | `/api/event/create`       | Admin, Super Admin    | Create a new event.                                |

#### RSO Routes

| Method | Endpoint                  | Access Control        | Description                                        |
| ------ | -----------------------   | -------------------   | -------------------------------------------------- |
| POST   | `/api/student/rso/create` | Student               | Create a new RSO.                                  |
| POST   | `/api/student/rso/join`   | Student               | Join an existing RSO                               |
| DELETE | `/api/student/rso/leave`  | Student               | Leave a RSO.                                       |

#### University Routes

| Method | Endpoint                  | Access Control        | Description                                        |
| ------ | -----------------------   | -------------------   | -------------------------------------------------- |
| POST   | `/api/university/create`  | Super Admin           | Create a new university.                           |
| GET    | `/api/university/names`   | Public                | Return a list of available universities            |
| GET    | `api/university/:uid`     | Public                | Return information of a university                 |
