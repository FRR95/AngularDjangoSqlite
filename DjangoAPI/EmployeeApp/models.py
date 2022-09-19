from distutils.command.upload import upload
from django.db import models

# Create your models here.

class Departments (models.Model):
 DepartmentId = models.AutoField(primary_key=True)
 DepartmentName = models.CharField(max_length=100)

class Employees (models.Model):
  EmployeeId = models.AutoField(primary_key=True)
  EmployeeName = models.CharField(max_length=100)
  Department = models.CharField(max_length=100)
  DateOfJoining = models.DateField()
  PhotoFileName = models.ImageField(null=True, blank=True)

class CSVFile (models.Model):
  CsvFileName = models.ImageField(max_length=100)
  def __str__(self):
        return self.file.name








