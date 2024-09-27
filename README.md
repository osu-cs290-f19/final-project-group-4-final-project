# Final Project - Group 4

## API Routes
- **GET** */gifs* (Returns all gifs in database)

example output:
```
[
    {
        "id": "1575859724",
        "url": "https://www.youtube.com/watch?v=UvCh5vG73Po",
        "filename": "/gif/1575859724.gif",
        "date": "Sun Dec 08 2019 18:48:48 GMT-0800 (Pacific Standard Time)"
    },
    {
	...
    },
    .
    .
    .
]
```
- **GET** */gifs/:id* (Returns the information of the gif with if :id)

example output:
```
{
	"id": "1575859724",
	"url": "https://www.youtube.com/watch?v=UvCh5vG73Po",
	"filename": "/gif/1575859724.gif",
	"date": "Sun Dec 08 2019 18:48:48 GMT-0800 (Pacific Standard Time)"
}
```

- **POST** */newgif* (adds a new gif to the database)

body example
```
{
    "url": "youtube video url",
    "start": "starting time in format 00:00:00",
    "time": 30 //number of seconds (max is 60s)
}
```
