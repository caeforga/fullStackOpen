How you can use the API:

```markdown
// .md to show api https://phonebook-back-qzhe.onrender.com/

To retrieve all contacts from the phonebook, you can send a GET request to the following endpoint:

```
GET /api/persons
```

To add a new contact, you can send a POST request to the same endpoint with the contact details in the request body.

To update an existing contact, you can send a PUT request to the following endpoint:

```
PUT /api/persons/{id}
```

Replace `{id}` with the ID of the contact you want to update.

To delete a person, you can send a DELETE request to the following endpoint:

```
DELETE /api/persons/{id}
```

Replace `{id}` with the ID of the person you want to delete.

Make sure to include the necessary headers and handle the responses accordingly.

```

Let me know if you need any further assistance!