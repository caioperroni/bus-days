
## **Description**

bus-days is a tool to manage holidays within diferent calendars and provide a solution for business days dates most common operations.

Developed for a GFT's Tech Talk by Caio Perroni Gnecco - COGC

Techs: Node.js (Nest Framework), GraphQL and MongoDB (mongoose).


## **Installation**

### **Pre-reqs**

This application requires a standalone local MongoDB server running at mongodb://localhost/.

### **Install dependencies**

```bash
$ npm install
```

## **Running the app**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode # requires MongoDB server configuration
$ npm run start:prod
```

## **Playground**

As any GraphQL application there's no Swagger or endpoints, but Resolvers.

Resolvers are Queries and Mutations that can be used trough:

```
http://localhost:3000/graphql
```

This URL, when reched through a browser loads a Playground, app that allows you to test all Queries and Mutations. 

This API supports 'application/graphql' requests.

## **Resolver Examples**
### **Mutations**

1. **createOrUpdateHoliday**
      - Input:
        ```ts
        mutation {
          createOrUpdateHoliday(
            holiday: {
              date: "2019-01-01"
              desc: "Ano Novo"
              calendars: ["N"]
              active: true
            }
          ) {
            status
            message
          }
        }
        ```
      - Sucess Output:
        ```JSON
        {
          "data": {
            "createOrUpdateHoliday": {
              "status": 200,
              "message": "Holiday updated with sucess!"
            }
          }
        }
        ```

2. **createOrUpdateHolidays**
      - Input:
        ```ts
        mutation {
          createOrUpdateHolidays(
            input: {
              holidays: [
                { date: "2019-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2020-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2020-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2021-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2021-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2022-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2022-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2023-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2023-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2024-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2024-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2025-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2025-12-31", desc: "Ano Novo", calendars: ["N"], active: true }
                { date: "2026-01-01", desc: "Ano Novo", calendars: ["N"], active: true }
              ]
            }
          ) {
            status
            message
          }
        }
        ```
      - Sucess Output:
        ```JSON
        {
          "data": {
            "createOrUpdateHolidays": {
              "status": 200,
              "message": "Holidays updated with sucess!"
            }
          }
        }
        ```

3. **switchHoliday**
      - Input:
        ```ts
        mutation {
          switchHoliday(date: "2019-01-01") {
            status
            message
          }
        }
        ```
      - Sucess Output:
        ```JSON
        {
          "data": {
            "switchHoliday": {
              "status": 200,
              "message": "Holiday deactivated with sucess!" || "Holiday activated with sucess!" 
            }
          }
        }
        ```

### **Queries**

1. **findOne**
      - Input:
      ```ts
      query {
        findOne(date: "2019-01-01") {
          date
          desc
          calendars
          active
        }
      }
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "findOne": {
            "date": "2019-01-01T00:00:00.000Z",
            "desc": "Ano Novo",
            "calendars": [
              "N"
            ],
            "active": true
          }
        }
      }
      ```

2. **findAll**
      - Input:
      ```ts
      query {
        findAll {
          date
          desc
          calendars
          active
        }
      }
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "findAll": [
            {
              "date": "2019-01-01T00:00:00.000Z",
              "desc": "Ano Novo",
              "calendars": [
                "N"
              ],
              "active": false
            },
            {
              "date": "2019-12-31T00:00:00.000Z",
              "desc": "Ano Novo",
              "calendars": [
                "N"
              ],
              "active": true
            },
            {
              "date": "2020-01-01T00:00:00.000Z",
              "desc": "Ano Novo",
              "calendars": [
                "N"
              ],
              "active": true
            },
            {
              "date": "2020-12-31T00:00:00.000Z",
              "desc": "Ano Novo",
              "calendars": [
                "N"
              ],
              "active": true
            },
            ...
          ]
        }
      }
      ```

3. **todayDiffBusinessDays**
      - Input:
      ```ts
      query($ndays: Float!) {
        todayDiffBusinessDays(input: { nDays: $ndays })
      }
      ```
      - Query Variables:
      ```JSON
      {"ndays": 1}
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "todayDiffBusinessDays": "2019-10-11T00:00:00.000Z"
        }
      }
      ```
      > The "Query Variable" syntax can be used also on mutations

4. **dateDiffBusinessDays**
      - Input:
      ```ts
      query($ndays: Float!, $date: DateTime!) {
        dateDiffBusinessDays(input: { dateFrom: $date, nDays: $ndays })
      }
      ```
     - Query Variables:
      ```JSON
      {
        "ndays": 1,
        "date": "2019-10-10"
      }
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "dateDiffBusinessDays": "2019-10-11T00:00:00.000Z"
        }
      }
      ```

5. **businessDaysDiffToday**
      - Input:
      ```ts
      query($ndays: Float!) {
        businessDaysDiffToday(input: { nDays: $ndays, dateTo: "2019-10-15" })
      }
      ```
     - Query Variables:
      ```JSON
      {
        "ndays": 1
      }    
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "businessDaysDiffToday": 3
        }
      }
      ```

6. **businessDaysDiffDate**
      - Input:
      ```ts
      query($dateFrom: DateTime!, $dateTo: DateTime!) {
        businessDaysDiffDate(input: { dateFrom: $dateFrom, dateTo: $dateTo })
      }
      ```
     - Query Variables:
      ```JSON
      {
        "dateFrom": "2019-10-10",
        "dateTo": "2019-10-15" 
      }
      ```
      - Sucess Output:
      ```JSON
      {
        "data": {
          "businessDaysDiffDate": 3
        }
      }
      ```

## Serving over HTTP

You can use GraphQL with HTTP also. Read:

```
https://graphql.org/learn/serving-over-http/
```

## Stay in touch

- Author - [Caio Perroni Gnecco](https://www.linkedin.com/in/caiognecco/)

## License

  Nest is [MIT licensed](LICENSE).
