from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status



from EmployeeApp.models import Departments,Employees,CSVFile
from EmployeeApp.serializers import DepartmentSerializer,EmployeeSerializer,CSVSerializer

from django.core.files.storage import default_storage



# Create your views here.
 
@csrf_exempt
def departmentApi(request,id=0):
   if request.method=='GET':
       departments=Departments.objects.all()
       departments_serializer = DepartmentSerializer(departments,many=True) 
       return JsonResponse(departments_serializer.data,safe=False)
   elif request.method == 'POST':
       department_data=JSONParser().parse(request)
       department_serializer = DepartmentSerializer(data=department_data)
       if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse ("Added Succesfully!!",safe=False)
       return JsonResponse ("Failed to Add.",safe=False)
   
   elif request.method=='PUT':
       department_data = JSONParser().parse(request)
       department=Departments.objects.get(DepartmentId=department_data['DepartmentId'])
       department_serializer=DepartmentSerializer(departments,data=department_data)
       if department_serializer.is_valid():
           department_serializer.save()
           return JsonResponse("Uptdated Succesfully",safe=False)
       return JsonResponse("Failed to Update",safe=False)

   elif request.method=='DELETE':
       department=Departments.objects.get(DepartmentId=id)
       department.delete()
       return JsonResponse("DELETED SUCCESFULLY",safe=False)


@csrf_exempt
def employeeApi(request,id=0):
   if request.method=='GET':
       employees=Employees.objects.all()
       employees_serializer = EmployeeSerializer(employees,many=True) 
       return JsonResponse(employees_serializer.data,safe=False)
   elif request.method == 'POST':
       employee_data=JSONParser().parse(request)
       employee_serializer = EmployeeSerializer(data=employee_data)
       if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse ("Added Succesfully!!",safe=False)
       return JsonResponse ("Failed to Add.",safe=False)


       
   elif request.method=='PUT':
       employee_data = JSONParser().parse(request)
       employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
       employee_serializer=EmployeeSerializer(employees,data=employee_data)
       if employee_serializer.is_valid():
           employee_serializer.save()
           return JsonResponse("Uptdated Succesfully",safe=False)
       return JsonResponse("Failed to Update",safe=False)

   elif request.method=='DELETE':
       employee=Employees.objects.get(EmployeeId=id)
       employee.delete()
       return JsonResponse("DELETED SUCCESFULLY",safe=False)

"""@csrf_exempt
def CSVApi(request):
      
      parser_class = (FileUploadParser)
      file_serializer = CSVSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return JsonResponse ("Uptdated Succesfully",safe=False)
      return JsonResponse("Failed to Update",safe=False)"""




@csrf_exempt
def SaveFile(request):
    file=request.FILES['myfile']
    file_name = default_storage.save(file.name,file)
    return JsonResponse("POSTED SUCCESFULLY THE FILE"+file_name+"!!",safe=False)

@csrf_exempt
def SaveFileCSV(request):
    file=request.FILES[' ']
    file_name = default_storage.save(file.name,file)

    return JsonResponse("POSTED SUCCESFULLY THE CSVFILE"+file_name+"!!",safe=False)








"""@csrf_exempt
def post(request):
    if request.method == 'POST':
     file_data=JSONParser().parse(request)
     file_serializer = CSVSerializer(data=file_data)
    if file_serializer.is_valid():
          file_serializer.save()
          return JsonResponse("WIN")
    return JsonResponse("FAIL")"""



        








