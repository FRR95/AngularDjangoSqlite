from rest_framework import serializers
from EmployeeApp.models import Departments,Employees,CSVFile

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('DepartmentId',
                'DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeeId',
                'EmployeeName',
                'Department',
                'DateOfJoining',
                'PhotoFileName',)

class CSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = ('CsvFileName')


        
