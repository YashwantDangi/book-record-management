# book-record-management

This is an application called book record management/API

## Endpoints

## /users (done)
POST : Create a new user
GET : Get all list of users

## /users/{id} 
GET : Get a user by their ID
PUT : Update a user by ID
DELETE : Delete a user by their ID (check if the user still has an issued book && is there any fine to be collected from the user)

## /users/subscription-details/{id}
GET : Get user subscription details
1. Date of subscription
2. Valid till ??
3. Fine if any ??

## /books
GET : Get all books
POST : Add a new book

## /books/{id}
GET : Get a book by ID
POST/PUT : Update a book by ID

## /books/issued
GET : Get all issued books here

## /books/issued/withFine
GET : Get all issued books with fine

## Subscription Type
Basic (3 Months)
Standard (6 Months)
Premium (12 Months)


If user has an issued book & the issued book is to be returned at 09-12-22.
If user missed the date to return, then user gets a fine of Rs. 50/-.

If user has an issued book & the issued book is to be returned at 09-12-22.
If user missed the date to return,and the users subscription also got expired, then user need to pay a fine of 150/- (100 + 50).