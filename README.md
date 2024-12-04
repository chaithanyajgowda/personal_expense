#personal_expense
Step 1: Add Expenses for Each Category
Endpoint: Add Expense (POST /expenses)
Add Food Expenses:
Request Body:


{
    "category": "Food",
    "amount": 120,
    "date": "2024-12-04"
}

{
    "category": "Food",
    "amount": 50,
    "date": "2024-12-03"
}
{
    "category": "Travel",
    "amount": 300,
    "date": "2024-12-03"
}

{
    "category": "Travel",
    "amount": 200,
    "date": "2024-12-04"
}

{
    "category": "Entertainment",
    "amount": 180,
    "date": "2024-12-04"
}

{
    "category": "Entertainment",
    "amount": 100,
    "date": "2024-12-04"
}

{
    "category": "Bills",
    "amount": 400,
    "date": "2024-12-03"
}



{
    "category": "Other",
    "amount": 50,
    "date": "2024-12-04"
}
response
{
    "status": "success",
    "data": {
        "id": 1,
        "category": "Food",
        "amount": 120,
        "date": "2024-12-01T00:00:00.000Z"
    }
}
Step 2: Retrieve All Expenses
Endpoint: Get Expenses (GET /expenses)
Retrieve All Expenses:
Request:

URL: http://localhost:3000/expenses
Method: GET
No filters applied.
Response:


{
    "status": "success",
    "data": [
        { "id": 1, "category": "Food", "amount": 120, "date": "2024-12-04" },
        { "id": 2, "category": "Food", "amount": 50, "date": "2024-12-03" },
        { "id": 3, "category": "Travel", "amount": 300, "date": "2024-12-03" },
        { "id": 4, "category": "Travel", "amount": 200, "date": "2024-12-04" },
        { "id": 5, "category": "Entertainment", "amount": 180, "date": "2024-12-04" },
        { "id": 6, "category": "Entertainment", "amount": 100, "date": "2024-12-03" },
        { "id": 7, "category": "Bills", "amount": 400, "date": "2024-12-04" },
        { "id": 8, "category": "Other", "amount": 50, "date": "2024-12-04" }
    ]
}
Step 3: Retrieve Food Category Expenses
Endpoint: Get Expenses (GET /expenses?category=Food)
Request:

URL: http://localhost:3000/expenses?category=Food
Method: GET
Response:

{
    "status": "success",
    "data": [
        { "id": 1, "category": "Food", "amount": 120, "date": "2024-12-01" },
        { "id": 2, "category": "Food", "amount": 50, "date": "2024-12-02" }
    ]
}
Step 4: Analyze Spending
Endpoint: Analyze Spending (GET /expenses/analysis)
Request:

URL: http://localhost:3000/expenses/analysis
Method: GET
Response:


{
    "status": "success",
    "data": {
        "totalByCategory": {
            "Food": 170,
            "Travel": 500,
            "Entertainment": 280,
            "Bills": 400,
            "Other": 50
        },
        "highestSpendingCategory": "Travel"
    }
}
totalByCategory: Total expenses for each category.
highestSpendingCategory: Category with the highest spending.
Step 5: Generate Summary
Using node-cron to Automate Reports



{
    "dailySummary": {
        "2024-12-01": {
            "Food": 120,
            "Travel": 300,
            "Entertainment": 180,
            "Bills": 400,
            "Other": 0
        },
        "2024-12-02": {
            "Food": 50,
            "Travel": 200,
            "Entertainment": 0,
            "Bills": 0,
            "Other": 50
        }
    }
}
