from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class Category(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=[('income', 'Income'), ('expense', 'Expense')])

    def __str__(self):
        return self.name


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=[('income', 'Income'), ('expense', 'Expense')]) 

    def __str__(self):
        return f"{self.description} - {self.amount}"


class BudgetCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budget_categories')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    planned = models.DecimalField(max_digits=10, decimal_places=2)
    actual = models.DecimalField(max_digits=10, decimal_places=2, default=0)  


    def __str__(self):
        return f"{self.category.name} Budget"
