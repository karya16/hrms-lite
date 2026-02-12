from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True, error_messages={
        "unique": "Employee ID already exists."
    })
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True, error_messages={
        "unique": "Email already exists."
    })
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name
